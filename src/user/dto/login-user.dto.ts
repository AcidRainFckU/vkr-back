import { IsEmail, IsString, Length } from 'class-validator'

export class LoginUserDto {
	@IsEmail()
	@IsString()
	readonly email: string

	@IsString()
	@Length(4)
	readonly password: string
}
