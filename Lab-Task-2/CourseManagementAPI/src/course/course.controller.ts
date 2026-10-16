import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Param,
  Body,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  ParseFilePipeBuilder,
  HttpStatus,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { randomUUID } from 'crypto';

import { CourseService } from './course.service.js';
import { CreateCourseDto } from './dto/create-course.dto.js';
import { UpdateCourseDto } from './dto/update-course.dto.js';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

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
  createCourse(@Body() dto: CreateCourseDto) {
    return this.courseService.createCourse(dto);
  }

  // PUT /course/:id
  @Put(':id')
  updateCourse(
    @Param('id') id: string,
    @Body() dto: UpdateCourseDto,
  ) {
    return this.courseService.updateCourse(id, dto);
  }

  // PATCH /course/:id
  @Patch(':id')
  patchCourse(
    @Param('id') id: string,
    @Body() dto: UpdateCourseDto,
  ) {
    return this.courseService.patchCourse(id, dto);
  }

  // DELETE /course/:id
  @Delete(':id')
  deleteCourse(@Param('id') id: string) {
    return this.courseService.deleteCourse(id);
  }

  // POST /course/:id/upload
  @Post(':id/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: join(process.cwd(), 'src', 'uploads'),

        filename: (req, file, callback) => {
          const uniqueName = `${Date.now()}-${randomUUID()}${extname(file.originalname).toLowerCase()}`;

          callback(null, uniqueName);
        },
      }),

      fileFilter: (req, file, callback) => {
        const allowedExtensions = /\.(jpg|jpeg|png|pdf)$/i;

        if (!allowedExtensions.test(file.originalname)) {
          return callback(
            new BadRequestException(
              'Invalid file type. Only JPG, JPEG, PNG and PDF files are allowed.',
            ),
            false,
          );
        }

        callback(null, true);
      },

      limits: {
        fileSize: 2 * 1024 * 1024,
      },
    }),
  )
  uploadCourseMaterial(
    @Param('id') id: string,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addMaxSizeValidator({
          maxSize: 2 * 1024 * 1024,
        })
        .build({
          fileIsRequired: true,
          errorHttpStatusCode: HttpStatus.BAD_REQUEST,
        }),
    )
    file: Express.Multer.File,
  ) {
    return this.courseService.uploadCourseMaterial(id, file);
  }
}