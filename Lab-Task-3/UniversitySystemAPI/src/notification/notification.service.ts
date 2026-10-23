import { Injectable, Inject, forwardRef } from '@nestjs/common';

import { EnrollmentService as EnrollmentServiceToken } from '../enrollment/enrollment.service.js';
import type { EnrollmentService } from '../enrollment/enrollment.service.js';

@Injectable()
export class NotificationService {
  constructor(
  @Inject(forwardRef(() => EnrollmentServiceToken))
  private readonly enrollmentService: EnrollmentService,
) {}

  // POST /notification/send
  sendNotification(studentName: string, message: string) {
    return {
      message: 'Notification sent successfully',
      student: studentName,
      notification: message,
    };
  }

  // POST /notification/check
  checkEnrollmentAndNotify(studentName: string, courseId: string) {
    const enrollments = this.enrollmentService.getEnrollments();

    return {
      message: 'Enrollment checked successfully',
      student: studentName,
      courseId,
      enrollments,
    };
  }
}