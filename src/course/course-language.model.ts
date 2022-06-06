import {
	BelongsToMany,
	Column,
	DataType,
	ForeignKey,
	Model,
	Table
} from 'sequelize-typescript'
import { Course } from 'src/course/course.model'
import { Language } from 'src/language/language.model'

@Table({ tableName: 'language-courses' })
export class CourseLanguage extends Model<CourseLanguage> {
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true
	})
	id: number

	@ForeignKey(() => Course)
	@Column({
		type: DataType.INTEGER,
		allowNull: false
	})
	courseId: number

	@ForeignKey(() => Language)
	@Column({
		type: DataType.INTEGER,
		allowNull: false
	})
	languageId: number
}
