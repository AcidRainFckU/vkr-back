import {
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	Length,
	Model,
	Table
} from 'sequelize-typescript'
import { User } from 'src/user/user.model'

interface TokenCreationAttrs {
	token: string
	userId: number
}

@Table({ tableName: 'tokens', updatedAt: false, createdAt: false })
export class Token extends Model<Token, TokenCreationAttrs> {
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true
	})
	id: number

	@Column({
		type: DataType.STRING(700),
		unique: true,
		allowNull: false
	})
	token: string

	@ForeignKey(() => User)
	@Column({
		type: DataType.INTEGER,
		allowNull: false
	})
	userId: number

	@BelongsTo(() => User)
	user: User
}
