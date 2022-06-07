import { Module } from '@nestjs/common'
import { CourseUserService } from './course-user.service'
import { CourseUserController } from './course-user.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { UserCourse } from './course-user.model'
import { AuthModule } from 'src/auth/auth.module'

@Module({
	controllers: [CourseUserController],
	providers: [CourseUserService],
	imports: [AuthModule, SequelizeModule.forFeature([UserCourse])]
})
export class CourseUserModule {}
