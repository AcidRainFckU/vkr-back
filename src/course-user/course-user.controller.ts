import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { Role } from 'src/auth/roles-auth.decorator'
import { RoleGuard } from 'src/auth/roles.guard'
import { CourseUserService } from './course-user.service'
import { CreateCourseUserDto } from './dto/course-user.dto'

@Controller('courseuser')
export class CourseUserController {
	constructor(private courseUserService: CourseUserService) {}

	@Role('superuser', 'mentor', 'student')
	@UseGuards(RoleGuard)
	@Post()
	changeProgress(@Body() dto: CreateCourseUserDto) {
		try {
			return this.courseUserService.changeProgress(dto)
		} catch (e) {
			return e
		}
	}
}
