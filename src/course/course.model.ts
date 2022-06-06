import {
	BelongsToMany,
	Column,
	DataType,
	HasMany,
	Model,
	Table
} from 'sequelize-typescript'
import { Chapter } from 'src/chapter/chapter.model'
import { Language } from 'src/language/language.model'
import { Lesson } from 'src/lesson/lesson.model'
import { User } from 'src/user/user.model'
import { CourseLanguage } from './course-language.model'
import { UserCourse } from '../course-user/course-user.model'

interface CoursesCreationAttrs {
	title: string
}

@Table({ tableName: 'courses' })
export class Course extends Model<Course, CoursesCreationAttrs> {
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true
	})
	id: number

	@Column({
		type: DataType.STRING,
		allowNull: false
	})
	title: string

	@HasMany(() => Chapter)
	chapters: Chapter[]

	@HasMany(() => Lesson)
	lesson: Lesson[]

	@BelongsToMany(() => User, () => UserCourse)
	users: User[]

	@BelongsToMany(() => Language, () => CourseLanguage)
	languages: Language[]
}
