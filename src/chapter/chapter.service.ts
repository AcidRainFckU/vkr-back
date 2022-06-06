import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Chapter } from './chapter.model'
import { ChapterDto } from './dto/chapter.dto'
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

	async delete(dto: ChapterDto) {
		const chapter = this.chapterRepository.destroy({
			where: { id: dto.chapterId }
		})

		return chapter
	}
}
