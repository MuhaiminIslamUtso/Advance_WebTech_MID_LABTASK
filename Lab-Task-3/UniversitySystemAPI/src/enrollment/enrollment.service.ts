import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { CourseService } from '../course/course.service.js';

import { NotificationService as NotificationServiceToken } from '../notification/notification.service.js';
import type { NotificationService } from '../notification/notification.service.js';

@Injectable()
export class EnrollmentService {
  constructor(
  private readonly courseService: CourseService,

  @Inject(forwardRef(() => NotificationServiceToken))
  private readonly notificationService: NotificationService,
) {}

  // GET /enrollment
  getEnrollments() {
    return {
      message: 'All enrollments fetched',
      data: [],
    };
  }

  // POST /enrollment
  enrollStudent(studentName: string, courseId: string) {
    const course = this.courseService.getCourseById(courseId);

    const notification = this.notificationService.sendNotification(
      studentName,
      `You have successfully enrolled in course ${courseId}`,
    );

    return {
      message: 'Student enrolled successfully',
      student: studentName,
      course,
      notification,
    };
  }
}