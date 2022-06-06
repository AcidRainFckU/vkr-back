import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize'
import * as path from 'path'
import { ServeStaticModule } from '@nestjs/serve-static'
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'
import { User } from './user/user.model'

import { TokenModule } from './token/token.module'
import { Token } from './token/token.model'
import { CourseModule } from './course/course.module'
import { ChapterModule } from './chapter/chapter.module'
import { LessonModule } from './lesson/lesson.module'
import { HomeworkModule } from './homework/homework.module'
import { LanguageModule } from './language/language.module'
import { UserCourse } from './course-user/course-user.model'
import { Language } from './language/language.model'
import { CourseLanguage } from './course/course-language.model'
import { Course } from './course/course.model'
import { Homework } from './homework/homeworks.model'
import { Lesson } from './lesson/lesson.model'
import { Chapter } from './chapter/chapter.model'
import { CourseUserModule } from './course-user/course-user.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: '.env',
			isGlobal: true
		}),
		ServeStaticModule.forRoot({
			rootPath: path.resolve(__dirname, 'static')
		}),
		SequelizeModule.forRoot({
			dialect: 'mysql',
			host: process.env.DATABASE_URL,
			port: Number(process.env.DATABASE_PORT),
			username: process.env.DATABASE_USERNAME,
			password: process.env.DATABASE_PASSWORD,
			database: process.env.DATABASE,
			models: [
				User,
				Token,
				UserCourse,
				Language,
				CourseLanguage,
				Course,
				Homework,
				Lesson,
				Chapter
			],
			autoLoadModels: true
		}),
		UserModule,
		AuthModule,

		TokenModule,

		CourseModule,

		ChapterModule,

		LessonModule,

		HomeworkModule,

		LanguageModule,

		CourseUserModule
	],
	controllers: [],
	providers: []
})
export class AppModule {}
