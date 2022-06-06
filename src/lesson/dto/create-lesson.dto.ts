export class CreateLessonDto {
	readonly title: string
	readonly text: Text
	readonly chaptereId: number
	readonly courseId: number
	readonly homework: boolean
}
