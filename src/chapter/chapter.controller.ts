import { Body, Controller, Post } from '@nestjs/common'
import { Role } from 'src/auth/roles-auth.decorator'
import { ChapterService } from './chapter.service'
import { ChapterDto } from './dto/chapter.dto'
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

	@Role('superuser')
	@Post('/delete')
	delet(@Body() dto: ChapterDto) {
		try {
			return this.chapterService.delete(dto)
		} catch (e) {
			return e
		}
	}
}
