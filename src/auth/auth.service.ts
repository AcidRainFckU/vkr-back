import {
	HttpException,
	HttpStatus,
	Injectable,
	UnauthorizedException
} from '@nestjs/common'
import { CreateUserDto } from 'src/user/dto/create-user.dto'
import { UserService } from 'src/user/user.service'
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt'
import { LoginUserDto } from 'src/user/dto/login-user.dto'
import { TokenService } from 'src/token/token.service'
import { CreateUserTokenDto } from 'src/token/dto/create-user-token.dtp'
import { ValidTokenTokenDto } from 'src/token/dto/verifyToken.dto'

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService,
		private jwtService: JwtService,
		private tokenService: TokenService
	) {}

	// ЛОГИН
	async login(userDto: LoginUserDto) {
		const user = await this.validateUser(userDto)
		const payload = {
			email: user.email,
			id: user.id,
			userName: user.userName,
			role: user.role,
			banned: user.banned
		}
		const accessToken = this.jwtService.sign(payload)
		const createTokenDto = { token: accessToken, userId: user.id }
		await this.saveToken(createTokenDto)
		return { user: payload, accessToken }
	}

	// Проверка активации токена

	// РЕГИСТРАЦИЯ
	async registration(userDto: CreateUserDto) {
		const candidate = await this.userService.getUserByEmail(userDto.email)
		if (candidate) {
			throw new HttpException(
				'Такой пользователь уже существует',
				HttpStatus.BAD_REQUEST
			)
		}
		const hashPassword = await bcrypt.hash(userDto.password, 5)
		const user = await this.userService.createUser({
			...userDto,
			password: hashPassword
		})
		return user
	}

	// ВАЛИДАЦИЯ
	private async validateUser(userDto: LoginUserDto) {
		const user = await this.userService.getUserByEmail(userDto.email)
		const passwordEquals = await bcrypt.compare(userDto.password, user.password)
		if (user && passwordEquals) {
			return user
		}
		throw new UnauthorizedException({
			message: 'Неккоректный email или пароль'
		})
	}

	// Проверка токена

	async verifyToken(dto: ValidTokenTokenDto) {
		try {
			const tokenExists = await this.tokenService.exists(dto)

			if (tokenExists) {
				const user = await this.userService.getUserByID(tokenExists.userId)
				return {
					email: user.email,
					id: user.id,
					userName: user.userName,
					role: user.role,
					banned: user.banned
				}
			}
		} catch (e) {
			console.log(e)
		}
	}

	// Добавление токена

	private async saveToken(dto: CreateUserTokenDto) {
		try {
			const userToken = await this.tokenService.create(dto)
			return userToken
		} catch (e) {
			console.log(e)
		}
	}
}
