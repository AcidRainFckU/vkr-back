import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { CreateHomeworkDto } from './dto/create-homework.dto'
import { HomeworkDto } from './dto/homework.dto'
import { Homework } from './homeworks.model'

@Injectable()
export class HomeworkService {
	constructor(
		@InjectModel(Homework) private homeworkRepository: typeof Homework
	) {}

	async create(dto: CreateHomeworkDto) {
		const homework = this.homeworkRepository.create(dto)
		return homework
	}

	async checkHomework(dto: HomeworkDto) {
		const compliteHomework = this.homeworkRepository.update(
			{
				complete: dto.complite
			},
			{
				where: {
					id: dto.homeworkId
				}
			}
		)
		return compliteHomework
	}
}
