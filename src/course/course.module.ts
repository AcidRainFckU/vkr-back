import { Module } from '@nestjs/common'
import { CourseService } from './course.service'
import { CourseController } from './course.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { User } from 'src/user/user.model'
import { UserCourse } from '../course-user/course-user.model'
import { Course } from './course.model'
import { Chapter } from 'src/chapter/chapter.model'
import { Lesson } from 'src/lesson/lesson.model'
import { Language } from 'src/language/language.model'
import { LanguageModule } from 'src/language/language.module'
import { UserService } from 'src/user/user.service'
import { UserModule } from 'src/user/user.module'
import { AuthModule } from 'src/auth/auth.module'

@Module({
	controllers: [CourseController],
	providers: [CourseService],
	imports: [
		LanguageModule,
		UserModule,
		AuthModule,
		SequelizeModule.forFeature([
			User,
			Chapter,
			Lesson,
			Language,
			UserCourse,
			Course
		])
	]
})
export class CourseModule {}
