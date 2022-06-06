import { IsString } from 'class-validator'
import { User } from 'src/user/user.model'

export class CreateUserTokenDto {
	@IsString()
	readonly token: string

	readonly userId: number
}
