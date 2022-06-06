import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { CreateLanguageDto } from './dto/create-language.dto'
import { Language } from './language.model'

@Injectable()
export class LanguageService {
	constructor(
		@InjectModel(Language) private languageRepository: typeof Language
	) {}

	async createLanguage(dto: CreateLanguageDto) {
		const language = await this.languageRepository.create(dto)
		return language
	}

	async getLanguageByValue(id: number) {
		const language = await this.languageRepository.findOne({
			where: { id },
			include: { all: true }
		})
		return language
	}

	async getAllLanguages() {
		const language = await this.languageRepository.findAll({
			include: { all: true }
		})
		return language
	}
}
