import { IsString } from 'class-validator'

export class ValidTokenTokenDto {
	@IsString()
	readonly token: string
}
