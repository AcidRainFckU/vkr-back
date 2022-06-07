import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { Role } from 'src/auth/roles-auth.decorator'
import { RoleGuard } from 'src/auth/roles.guard'
import { CourseService } from './course.service'
import { AddUserDto } from './dto/add-user.dto'
import { CreateCourseDto } from './dto/create-course.dto'

@Controller('course')
export class CourseController {
	constructor(private courseService: CourseService) {}

	@Role('superuser')
	@UseGuards(RoleGuard)
	@Post('/create')
	create(@Body() dto: CreateCourseDto) {
		try {
			return this.courseService.create(dto)
		} catch (e) {
			return e
		}
	}

	@Role('superuser', 'mentor', 'student')
	@UseGuards(RoleGuard)
	@Get()
	getAllCourses() {
		try {
			return this.courseService.getAllCourses()
		} catch (e) {
			return e
		}
	}

	@Role('superuser')
	@UseGuards(RoleGuard)
	@Post('/add-user')
	addUser(@Body() dto: AddUserDto) {
		try {
			return this.courseService.addUser(dto)
		} catch (e) {
			return e
		}
	}
	@Role('superuser')
	@UseGuards(RoleGuard)
	@Post('/remove-user')
	removeUser(@Body() dto: AddUserDto) {
		try {
			return this.courseService.removeUser(dto)
		} catch (e) {
			return e
		}
	}

	@Role('superuser')
	@UseGuards(RoleGuard)
	@Post('/delete')
	dropCourse(@Body() dto: AddUserDto) {
		try {
			return this.courseService.dropCourse(dto)
		} catch (e) {
			return e
		}
	}
}
