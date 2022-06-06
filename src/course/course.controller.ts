import { Body, Controller, Get, Post } from '@nestjs/common'
import { Role } from 'src/auth/roles-auth.decorator'
import { CourseService } from './course.service'
import { AddUserDto } from './dto/add-user.dto'
import { CreateCourseDto } from './dto/create-course.dto'

@Controller('course')
export class CourseController {
	constructor(private courseService: CourseService) {}

	@Role('superuser')
	@Post('/create')
	create(@Body() dto: CreateCourseDto) {
		try {
			return this.courseService.create(dto)
		} catch (e) {
			return e
		}
	}

	@Role()
	@Get()
	getAllCourses() {
		try {
			return this.courseService.getAllCourses()
		} catch (e) {
			return e
		}
	}

	@Role('superuser')
	@Post('/add-user')
	addUser(@Body() dto: AddUserDto) {
		try {
			return this.courseService.addUser(dto)
		} catch (e) {
			return e
		}
	}

	@Role('superuser')
	@Post('/delete')
	dropCourse(@Body() dto: AddUserDto) {
		try {
			return this.courseService.dropCourse(dto)
		} catch (e) {
			return e
		}
	}
}
