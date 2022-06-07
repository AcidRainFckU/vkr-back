import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { UserCourse } from './course-user.model'
import { CreateCourseUserDto } from './dto/course-user.dto'

@Injectable()
export class CourseUserService {
	constructor(
		@InjectModel(UserCourse) private userCourseRepository: typeof UserCourse
	) {}

	async changeProgress(dto: CreateCourseUserDto) {
		const progress = await this.userCourseRepository.findByPk(dto.progressId)

		const newProgress = await this.userCourseRepository.update(
			{ progress: progress.progress + 1 },
			{ where: { id: dto.progressId } }
		)
		return newProgress
	}
}
