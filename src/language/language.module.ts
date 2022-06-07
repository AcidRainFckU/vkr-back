import { Module } from '@nestjs/common'
import { LanguageService } from './language.service'
import { LanguageController } from './language.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { Language } from './language.model'
import { Course } from 'src/course/course.model'
import { AuthModule } from 'src/auth/auth.module'

@Module({
	controllers: [LanguageController],
	providers: [LanguageService],
	imports: [AuthModule, SequelizeModule.forFeature([Language, Course])],
	exports: [LanguageService]
})
export class LanguageModule {}
