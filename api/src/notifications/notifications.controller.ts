import { Controller, Delete, Get, Patch } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { ActiveUser } from 'src/iam/decorators/active-user.decorator';
import { ActiveUserData } from 'src/iam/interface/active-user-data.interface';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get('/')
  findAll(@ActiveUser() user: ActiveUserData) {
    return this.notificationsService.findNotifications(user);
  }

  @Delete('/')
  async clearAll(@ActiveUser() user: ActiveUserData) {
    return this.notificationsService.clearAll(user);
  }

  @Patch('/read-all')
  async readAll(@ActiveUser() user: ActiveUserData) {
    return this.notificationsService.readAll(user);
  }
}
