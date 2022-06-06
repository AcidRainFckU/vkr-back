import { Body, Controller, Post } from '@nestjs/common'
import { Role } from 'src/auth/roles-auth.decorator'
import { ChapterService } from './chapter.service'
import { CreateChapterDto } from './dto/create-chapter.dto'

@Controller('chapter')
export class ChapterController {
	constructor(private readonly chapterService: ChapterService) {}

	@Role('superuser')
	@Post('/create')
	create(@Body() dto: CreateChapterDto) {
		try {
			return this.chapterService.create(dto)
		} catch (e) {
			return e
		}
	}
}
