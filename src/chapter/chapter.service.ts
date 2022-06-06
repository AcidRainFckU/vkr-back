import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Chapter } from './chapter.model'
import { CreateChapterDto } from './dto/create-chapter.dto'

@Injectable()
export class ChapterService {
	constructor(
		@InjectModel(Chapter) private chapterRepository: typeof Chapter
	) {}

	async create(dto: CreateChapterDto) {
		const chapter = this.chapterRepository.create(dto)
		return chapter
	}
}
