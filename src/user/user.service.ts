import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { Op } from 'sequelize'
import { BanUserDto } from './dto/ban-user.dto'
import { ChangeUserSettingsDto } from './dto/change-user-settings.dto'
import { CreateUserDto } from './dto/create-user.dto'
import { GetUserDto } from './dto/get-user.dto'
import { SetRoleDto } from './dto/set-role-dto.dto'
import { User } from './user.model'

interface GetUsers {
	id: number
	userName: string
	role: string
	banned: boolean
	email: string
}

@Injectable()
export class UserService {
	constructor(@InjectModel(User) private userRepository: typeof User) {}

	// СОЗДАТЬ ПОЛЬЗОВАТЕЛЯ
	async createUser(dto: CreateUserDto) {
		const user = await this.userRepository.create(dto)
		return user
	}

	// ПОИСК ПОЛЬЗОВАТЕЛЕЙ
	async getAllUsers(dto: GetUserDto) {
		const users = await this.userRepository.findAll({
			where: {
				email: {
					[Op.startsWith]: dto.email
				},
				role: {
					[Op.startsWith]: dto.role
				},
				userName: {
					[Op.startsWith]: dto.userName
				},
				banned:
					dto.status === 0
						? { [Op.or]: [false, true] }
						: dto.status === 1
						? false
						: true
			},
			include: {
				all: true
			}
		})
		return users
	}

	// ИЗМЕНИТЬ НАСТРОЙКИ ПОЛЬЗОВАТЕЛЯ
	async changeSettings(dto: ChangeUserSettingsDto) {
		const checkEmail = await this.getUserByEmail(dto.email)
		if (checkEmail && checkEmail.id.toString() != dto.id) {
			throw new HttpException(
				'Такой email уже существует',
				HttpStatus.BAD_REQUEST
			)
		}
		const user = await this.userRepository.update(
			{
				userName: dto.userName,
				email: dto.email
			},
			{
				where: {
					id: dto.id
				}
			}
		)
		return user
	}
	// ЗАБАНИТЬ ПОЛЬЗОВАТЕЛЯ
	async banUser(dto: BanUserDto) {
		const user = await this.userRepository.update(
			{
				banned: dto.status
			},
			{
				where: {
					id: dto.id
				}
			}
		)
		return user
	}

	// ДОБАВИТЬ РОЛЬ
	async setRole(dto: SetRoleDto) {
		const user = await this.userRepository.update(
			{
				role: dto.role
			},
			{
				where: {
					id: dto.id
				}
			}
		)
		return user
	}

	// НАЙТИ ПОЛЬЗОВАТЕЛЯ ПО EMAIL
	async getUserByEmail(email: string) {
		const user = await this.userRepository.findOne({
			where: { email },
			include: { all: true }
		})
		return user
	}
	// НАЙТИ ПОЛЬЗОВАТЕЛЯ ПО ID
	async getUserByID(userId: number) {
		const user = await this.userRepository.findOne({
			where: { id: userId },
			include: { all: true }
		})
		return user
	}
}
