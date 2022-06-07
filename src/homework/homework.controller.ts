import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { Role } from 'src/auth/roles-auth.decorator'
import { RoleGuard } from 'src/auth/roles.guard'
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
	@UseGuards(RoleGuard)
	@Post('/check')
	checkHomework(@Body() dto: HomeworkDto) {
		return this.homeworkService.checkHomework(dto)
	}

	@Role('superuser', 'mentor')
	@UseGuards(RoleGuard)
	@Get()
	getAll() {
		return this.homeworkService.getHomework()
	}
}
