import {
  Controller,
  Get,
  Post,
  Body,
} from '@nestjs/common';

import { EnrollmentService } from './enrollment.service.js';

@Controller('enrollment')
export class EnrollmentController {
  constructor(
    private readonly enrollmentService: EnrollmentService,
  ) {}

  // GET /enrollment
  @Get()
  getEnrollments() {
    return this.enrollmentService.getEnrollments();
  }

  // POST /enrollment
  @Post()
  enrollStudent(
    @Body('studentName') studentName: string,
    @Body('courseId') courseId: string,
  ) {
    return this.enrollmentService.enrollStudent(
      studentName,
      courseId,
    );
  }
}