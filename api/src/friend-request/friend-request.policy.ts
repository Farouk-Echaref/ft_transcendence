import { Injectable } from '@nestjs/common';
import { FriendRequest } from '@transcendence/common';
import { PolicyBase } from 'src/common/dto/base.policy';
import { ActiveUserData } from 'src/iam/interface/active-user-data.interface';

@Injectable()
export class FriendRequestPolicy extends PolicyBase {
  canView(user: ActiveUserData, friendRequest: FriendRequest): boolean {
    return this.throwUnlessCan(
      friendRequest.recipientId === user.sub ||
        friendRequest.requesterId === user.sub,
    );
  }
  canCreate(user: ActiveUserData, targetUserId): boolean {
    return this.throwUnlessCan(user.sub !== targetUserId);
  }

  canUpdate(
    user: ActiveUserData,
    { friendRequest }: { action: 'accept'; friendRequest: FriendRequest },
  ): boolean {
    return this.throwUnlessCan(user.sub === friendRequest.recipientId);
  }

  canDelete(user: ActiveUserData, friendRequest: FriendRequest): boolean {
    return this.throwUnlessCan(
      friendRequest.recipientId === user.sub ||
        friendRequest.requesterId === user.sub,
    );
  }
}
