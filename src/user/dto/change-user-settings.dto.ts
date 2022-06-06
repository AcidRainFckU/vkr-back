import { IsEmail, IsString, Length } from 'class-validator'

export class ChangeUserSettingsDto {
	readonly id: string
	@IsString()
	@Length(4)
	@IsEmail()
	readonly email: string
	@IsString()
	@Length(4)
	readonly userName: string
}
