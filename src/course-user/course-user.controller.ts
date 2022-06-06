import { Body, Controller, Post } from '@nestjs/common'
import { Role } from 'src/auth/roles-auth.decorator'
import { CourseUserService } from './course-user.service'
import { CreateCourseUserDto } from './dto/course-user.dto'

@Controller('courseuser')
export class CourseUserController {
	constructor(private courseUserService: CourseUserService) {}

	@Role('superuser', 'mentor')
	@Post()
	changeProgress(@Body() dto: CreateCourseUserDto) {
		try {
			return this.courseUserService.changeProgress(dto)
		} catch (e) {
			return e
		}
	}
}
