import {
  Controller,
  Get,
  Post,
  Param,
  Body,
} from '@nestjs/common';

import { CourseService } from './course.service.js';

@Controller('course')
export class CourseController {

  constructor(
    private readonly courseService: CourseService,
  ) {}

  // GET /course
  @Get()
  getAllCourses() {
    return this.courseService.getAllCourses();
  }

  // GET /course/:id
  @Get(':id')
  getCourseById(@Param('id') id: string) {
    return this.courseService.getCourseById(id);
  }

  // POST /course
  @Post()
  createCourse(
    @Body('name') name: string,
    @Body('code') code: string,
  ) {
    return this.courseService.createCourse(name, code);
  }
}