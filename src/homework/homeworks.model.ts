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

import { User } from 'src/user/user.model'
import { Lesson } from '../lesson/lesson.model'

interface CreateHomeworkAttrs {
	lessonId: number
	userId: number
	link: string
}

@Table({ tableName: 'homeworks' })
export class Homework extends Model<Homework, CreateHomeworkAttrs> {
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true
	})
	id: number

	@ForeignKey(() => Lesson)
	@Column({
		type: DataType.INTEGER,
		allowNull: false
	})
	lessonId: number

	@BelongsTo(() => Lesson)
	lesson: Lesson

	@ForeignKey(() => User)
	@Column({
		type: DataType.INTEGER,
		allowNull: false
	})
	userId: number

	@BelongsTo(() => User)
	user: User

	@Column({
		type: DataType.BOOLEAN,
		defaultValue: false
	})
	complete: boolean

	@Column({
		type: DataType.STRING,
		defaultValue: false
	})
	link: string
}
