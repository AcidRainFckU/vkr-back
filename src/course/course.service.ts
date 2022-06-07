import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { LanguageService } from 'src/language/language.service'
import { UserService } from 'src/user/user.service'
import { Course } from './course.model'
import { AddUserDto } from './dto/add-user.dto'
import { CreateCourseDto } from './dto/create-course.dto'

@Injectable()
export class CourseService {
	constructor(
		@InjectModel(Course) private courseRepository: typeof Course,
		private languageService: LanguageService,
		private userService: UserService
	) {}

	async create(dto: CreateCourseDto) {
		const course = await this.courseRepository.create(dto)
		const language = await this.languageService.getLanguageByValue(dto.language)
		await course.$set('languages', [language.id])
		course.languages = [language]
		return course
	}

	async addUser(dto: AddUserDto) {
		const course = await this.courseRepository.findByPk(dto.courseId, {
			include: { all: true }
		})
		const user = await this.userService.getUserByID(dto.userId)

		if (course && user) {
			await course.$add('users', user.id)
			const newCourse = await this.courseRepository.findByPk(dto.courseId, {
				include: { all: true }
			})
			return newCourse
		}
	}
	async removeUser(dto: AddUserDto) {
		const course = await this.courseRepository.findByPk(dto.courseId, {})
		const user = await this.userService.getUserByID(dto.userId)

		if (course && user) {
			await course.$remove('users', user.id)
			const newCourse = await this.courseRepository.findByPk(dto.courseId, {
				include: { all: true }
			})
			return newCourse
		}
	}

	async dropCourse(dto: AddUserDto) {
		const course = await this.courseRepository.destroy({
			where: { id: dto.courseId }
		})

		return course
	}

	async getAllCourses() {
		const course = await this.courseRepository.findAll({
			include: { all: true }
		})
		return course
	}

	async getCourseById(id: number) {
		const course = await this.courseRepository.findOne({
			where: { id },
			include: { all: true }
		})
		return course
	}
}
