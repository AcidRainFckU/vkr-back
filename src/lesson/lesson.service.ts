import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { CreateLessonDto } from './dto/create-lesson.dto'
import { LessonDto } from './dto/lesson.dto'
import { Lesson } from './lesson.model'

@Injectable()
export class LessonService {
	constructor(@InjectModel(Lesson) private lessonRepository: typeof Lesson) {}

	async create(dto: CreateLessonDto) {
		const lesson = await this.lessonRepository.create(dto)
		return lesson
	}
	async destroy(dto: LessonDto) {
		const lesson = await this.lessonRepository.destroy({
			where: { id: dto.lessonId }
		})
		return lesson
	}
}
