import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common'
import { Role } from 'src/auth/roles-auth.decorator'
import { RoleGuard } from 'src/auth/roles.guard'

import { CreateLanguageDto } from './dto/create-language.dto'
import { LanguageService } from './language.service'

@Controller('language')
export class LanguageController {
	constructor(private readonly languageService: LanguageService) {}

	@Role('superuser')
	@UseGuards(RoleGuard)
	@Post('create')
	create(@Body() dto: CreateLanguageDto) {
		return this.languageService.createLanguage(dto)
	}

	@Get('/:id')
	getByValue(@Param('id') id: number) {
		return this.languageService.getLanguageByValue(id)
	}

	@Get()
	getAllLanguages() {
		return this.languageService.getAllLanguages()
	}
}
