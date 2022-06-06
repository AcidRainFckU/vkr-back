import {
	BelongsToMany,
	Column,
	DataType,
	ForeignKey,
	Model,
	Table
} from 'sequelize-typescript'
import { Course } from 'src/course/course.model'
import { User } from 'src/user/user.model'

@Table({ tableName: 'users-courses' })
export class UserCourse extends Model<UserCourse> {
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

	@ForeignKey(() => User)
	@Column({
		type: DataType.INTEGER,
		allowNull: false
	})
	userId: number

	@Column({
		type: DataType.INTEGER,
		allowNull: false,
		defaultValue: 0
	})
	progress: number
}
