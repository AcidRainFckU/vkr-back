import { Module } from '@nestjs/common'
import { ChapterService } from './chapter.service'
import { ChapterController } from './chapter.controller'
import { Course } from 'src/course/course.model'
import { SequelizeModule } from '@nestjs/sequelize'
import { Chapter } from './chapter.model'
import { Lesson } from 'src/lesson/lesson.model'

@Module({
	controllers: [ChapterController],
	providers: [ChapterService],
	imports: [SequelizeModule.forFeature([Chapter, Lesson, Course])]
})
export class ChapterModule {}
