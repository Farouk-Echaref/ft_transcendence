import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ActiveUserData } from '@src/iam/interface/active-user-data.interface';
import { WebsocketService } from '@src/websocket/websocket.service';
import {
  GroupsInvitationsRepository,
  SearchableGroup,
} from '../repositories/_groups-invitations.repository';
import { GroupInvitationsPolicy } from '../group-invitations.policy';
import { CreateGroupInvitationDto } from '../dto/create-group-invitation.dto';
import {
  GROUP_INVITATION_EVENT,
  GroupInvitationData,
} from '@transcendence/common';

@Injectable()
export class CreateGroupInvitationAction {
  constructor(
    private readonly policy: GroupInvitationsPolicy,
    private readonly repository: GroupsInvitationsRepository,
    private readonly websocket: WebsocketService,
  ) {}

  async execute(
    user: ActiveUserData,
    groupId: number,
    { userId }: CreateGroupInvitationDto,
  ) {
    const group = await this.requireGroup(groupId);
    if (!this.userCanBeInvited(group, userId)) {
      throw new ForbiddenException('User cannot be invited to this group');
    }

    this.policy.canCreate(user, group);

    const invitationWithGroup = await this.repository.createInvitation({
      userId,
      groupId,
      invitedById: user.sub,
    });

    this.websocket.addEvent([userId], GROUP_INVITATION_EVENT, {
      id: invitationWithGroup.id,
      group: invitationWithGroup.group,
      user: {
        name: invitationWithGroup.user.name,
        avatar: invitationWithGroup.user.avatar,
      },
    } satisfies GroupInvitationData);

    return { success: true };
  }

  private async requireGroup(groupId: number) {
    const group = await this.repository.findSearchableGroup(groupId);

    if (!group) {
      throw new NotFoundException('Group not found');
    }
    return group;
  }

  private userCanBeInvited(group: SearchableGroup, userId: number) {
    const isMember = Boolean(group.users.find((u) => u.userId === userId));
    const isBanned = Boolean(group.blockedUsers.find((u) => u.id === userId));
    return !(isMember || isBanned);
  }
}
