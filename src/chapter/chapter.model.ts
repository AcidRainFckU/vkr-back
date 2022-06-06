import {
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	HasMany,
	Model,
	Table
} from 'sequelize-typescript'
import { Course } from 'src/course/course.model'
import { Lesson } from 'src/lesson/lesson.model'

interface ChapterCreationAttrs {
	title: string
	courseId: number
}

@Table({ tableName: 'chapters' })
export class Chapter extends Model<Chapter, ChapterCreationAttrs> {
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

	@ForeignKey(() => Course)
	@Column({
		type: DataType.INTEGER,
		allowNull: false
	})
	courseId: number

	@BelongsTo(() => Course)
	course: Course

	@HasMany(() => Lesson)
	lessons: Lesson[]
}
