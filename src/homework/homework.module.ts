import { Module } from '@nestjs/common'
import { HomeworkService } from './homework.service'
import { HomeworkController } from './homework.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { User } from 'src/user/user.model'
import { Homework } from './homeworks.model'
import { Lesson } from 'src/lesson/lesson.model'

@Module({
	controllers: [HomeworkController],
	providers: [HomeworkService],
	imports: [SequelizeModule.forFeature([User, Lesson, Homework])]
})
export class HomeworkModule {}
