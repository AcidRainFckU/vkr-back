import { forwardRef, Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { User } from './user.model'

import { AuthModule } from 'src/auth/auth.module'
import { Course } from 'src/course/course.model'
import { UserCourse } from 'src/course-user/course-user.model'
import { Homework } from 'src/homework/homeworks.model'

@Module({
	controllers: [UserController],
	providers: [UserService],

	imports: [
		forwardRef(() => AuthModule),

		SequelizeModule.forFeature([User, Course, UserCourse, Homework])
	],
	exports: [UserService]
})
export class UserModule {}
