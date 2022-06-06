import { IsNumber, IsString } from 'class-validator'

export class CreateChapterDto {
	@IsString()
	readonly title: string
	@IsNumber()
	readonly courseId: number
}
