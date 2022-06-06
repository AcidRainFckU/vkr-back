import { Body, Controller, Post } from '@nestjs/common'
import { Role } from 'src/auth/roles-auth.decorator'
import { CreateHomeworkDto } from './dto/create-homework.dto'
import { HomeworkDto } from './dto/homework.dto'
import { HomeworkService } from './homework.service'

@Controller('homework')
export class HomeworkController {
	constructor(private readonly homeworkService: HomeworkService) {}

	@Post()
	create(@Body() dto: CreateHomeworkDto) {
		return this.homeworkService.create(dto)
	}

	@Role('superuser', 'mentor')
	@Post('/check')
	checkHomework(@Body() dto: HomeworkDto) {
		return this.homeworkService.checkHomework(dto)
	}
}
