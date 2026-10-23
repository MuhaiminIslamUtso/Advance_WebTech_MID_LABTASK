import {
  Controller,
  Post,
  Body,
} from '@nestjs/common';

import { NotificationService } from './notification.service.js';

@Controller('notification')
export class NotificationController {
  constructor(
    private readonly notificationService: NotificationService,
  ) {}

  // POST /notification/send
  @Post('send')
  sendNotification(
    @Body('studentName') studentName: string,
    @Body('message') message: string,
  ) {
    return this.notificationService.sendNotification(
      studentName,
      message,
    );
  }

  // POST /notification/check
  @Post('check')
  checkEnrollmentAndNotify(
    @Body('studentName') studentName: string,
    @Body('courseId') courseId: string,
  ) {
    return this.notificationService.checkEnrollmentAndNotify(
      studentName,
      courseId,
    );
  }
}