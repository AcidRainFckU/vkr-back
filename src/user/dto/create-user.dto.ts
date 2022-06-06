import { IsEmail, IsString, Length } from 'class-validator'

export class CreateUserDto {
	@IsEmail()
	@IsString()
	readonly email: string

	@IsString()
	@Length(4)
	readonly password: string

	@IsString()
	@Length(4)
	readonly userName: string
}
