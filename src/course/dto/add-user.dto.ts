import { IsNumber, IsString } from 'class-validator'

export class AddUserDto {
	readonly userId: number
	readonly courseId: number
}
