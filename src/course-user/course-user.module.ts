import { Module } from '@nestjs/common'
import { CourseUserService } from './course-user.service'
import { CourseUserController } from './course-user.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { UserCourse } from './course-user.model'

@Module({
	controllers: [CourseUserController],
	providers: [CourseUserService],
	imports: [SequelizeModule.forFeature([UserCourse])]
})
export class CourseUserModule {}
