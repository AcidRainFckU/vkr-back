import { IsNumber, IsString } from 'class-validator'

export class CreateCourseDto {
	@IsString()
	readonly title: string
	@IsNumber()
	readonly language: number
}
