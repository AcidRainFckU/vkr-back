import { Module } from '@nestjs/common'
import { LanguageService } from './language.service'
import { LanguageController } from './language.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { Language } from './language.model'
import { Course } from 'src/course/course.model'

@Module({
	controllers: [LanguageController],
	providers: [LanguageService],
	imports: [SequelizeModule.forFeature([Language, Course])],
	exports: [LanguageService]
})
export class LanguageModule {}
