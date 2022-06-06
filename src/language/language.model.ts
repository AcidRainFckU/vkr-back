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
import { CourseLanguage } from 'src/course/course-language.model'
import { Course } from 'src/course/course.model'

interface CreateLanguageAttrs {
	name: string
}

@Table({ tableName: 'languages' })
export class Language extends Model<Language, CreateLanguageAttrs> {
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true
	})
	id: number

	@Column({
		type: DataType.STRING,
		unique: true,
		allowNull: false
	})
	name: number

	@BelongsToMany(() => Course, () => CourseLanguage)
	courses: Course[]
}
