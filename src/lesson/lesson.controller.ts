import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { Role } from 'src/auth/roles-auth.decorator'
import { RoleGuard } from 'src/auth/roles.guard'
import { CreateLessonDto } from './dto/create-lesson.dto'
import { LessonDto } from './dto/lesson.dto'
import { LessonService } from './lesson.service'

@Controller('lesson')
export class LessonController {
	constructor(private readonly lessonService: LessonService) {}

	@Role('superuser')
	@UseGuards(RoleGuard)
	@Post('/create')
	create(@Body() dto: CreateLessonDto) {
		return this.lessonService.create(dto)
	}

	@Role('superuser')
	@UseGuards(RoleGuard)
	@Post('/delete')
	destroy(@Body() dto: LessonDto) {
		return this.lessonService.destroy(dto)
	}
}
