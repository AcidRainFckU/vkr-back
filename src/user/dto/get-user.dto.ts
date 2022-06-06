import { IsNumber, IsString } from 'class-validator'

export class GetUserDto {
	@IsString()
	readonly userName: string
	@IsNumber()
	readonly status: number
	@IsString()
	readonly role: string
	@IsString()
	readonly email: string
}
