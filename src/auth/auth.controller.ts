import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { ValidTokenTokenDto } from 'src/token/dto/verifyToken.dto'
import { CreateUserDto } from 'src/user/dto/create-user.dto'
import { LoginUserDto } from 'src/user/dto/login-user.dto'
import { AuthService } from './auth.service'
import { Role } from './roles-auth.decorator'
import { RoleGuard } from './roles.guard'

@Controller()
export class AuthController {
	constructor(private authService: AuthService) {}

	@Post('/login')
	async login(@Body() dto: LoginUserDto) {
		try {
			return this.authService.login(dto)
		} catch (e) {
			console.log(e)
		}
	}

	@Post('/registration')
	async registration(@Body() dto: CreateUserDto) {
		try {
			return this.authService.registration(dto)
		} catch (e) {
			console.log(e)
		}
	}

	@Role('superuser', 'mentor', 'student')
	@UseGuards(RoleGuard)
	@Post('/verify')
	async verify(@Body() dto: ValidTokenTokenDto) {
		try {
			return this.authService.verifyToken(dto)
		} catch (e) {
			console.log(e)
		}
	}
}
