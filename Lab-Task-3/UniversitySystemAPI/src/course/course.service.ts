import { Injectable } from '@nestjs/common';

@Injectable()
export class CourseService {

  // GET /course
  getAllCourses() {
    return {
      message: 'All courses fetched',
      data: [],
    };
  }

  // GET /course/:id
  getCourseById(id: string) {
    return {
      message: 'Course fetched',
      id,
    };
  }

  // POST /course
  createCourse(name: string, code: string) {
    return {
      message: 'Course created',
      data: {
        name,
        code,
      },
    };
  }
}