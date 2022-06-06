import { IsNumber, IsString } from 'class-validator'

export class CreateHomeworkDto {
	@IsString()
	readonly link: string
	@IsNumber()
	readonly lessonId: number
	@IsNumber()
	readonly userId: number
}
