import { Module } from '@nestjs/common'
import { LessonService } from './lesson.service'
import { LessonController } from './lesson.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { Lesson } from './lesson.model'
import { Course } from 'src/course/course.model'
import { Chapter } from 'src/chapter/chapter.model'
import { Homework } from '../homework/homeworks.model'

@Module({
	controllers: [LessonController],
	providers: [LessonService],
	imports: [SequelizeModule.forFeature([Chapter, Lesson, Course, Homework])]
})
export class LessonModule {}
