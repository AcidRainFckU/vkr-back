import {
	BelongsTo,
	BelongsToMany,
	Column,
	DataType,
	ForeignKey,
	HasMany,
	Model,
	Table
} from 'sequelize-typescript'
import { Chapter } from 'src/chapter/chapter.model'
import { Course } from 'src/course/course.model'
import { Homework } from '../homework/homeworks.model'

interface LessonCreationAttrs {
	title: string
	text: Text
	courseId: number
	chaptereId: number
	homework: boolean
}

@Table({ tableName: 'lessons' })
export class Lesson extends Model<Lesson, LessonCreationAttrs> {
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

	@Column({
		type: DataType.TEXT,
		allowNull: false
	})
	text: string

	@ForeignKey(() => Course)
	@Column({
		type: DataType.INTEGER,
		allowNull: false
	})
	courseId: number

	@BelongsTo(() => Course)
	course: Course

	@ForeignKey(() => Chapter)
	@Column({
		type: DataType.INTEGER,
		allowNull: false
	})
	chaptereId: number

	@BelongsTo(() => Chapter)
	chapter: Chapter

	@Column({
		type: DataType.BOOLEAN,
		defaultValue: false
	})
	homework: boolean

	@HasMany(() => Homework)
	homeworks: Homework[]
}
