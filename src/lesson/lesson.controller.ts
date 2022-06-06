import { Body, Controller, Post } from '@nestjs/common'
import { Role } from 'src/auth/roles-auth.decorator'
import { CreateLessonDto } from './dto/create-lesson.dto'
import { LessonDto } from './dto/lesson.dto'
import { LessonService } from './lesson.service'

@Controller('lesson')
export class LessonController {
	constructor(private readonly lessonService: LessonService) {}

	@Role('superuser')
	@Post('/create')
	create(@Body() dto: CreateLessonDto) {
		return this.lessonService.create(dto)
	}

	@Role('superuser')
	@Post('/delete')
	destroy(@Body() dto: LessonDto) {
		return this.lessonService.destroy(dto)
	}
}
