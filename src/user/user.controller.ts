import { Body, Controller, Post } from '@nestjs/common'
import { Role } from 'src/auth/roles-auth.decorator'
import { BanUserDto } from './dto/ban-user.dto'
import { ChangeUserSettingsDto } from './dto/change-user-settings.dto'
import { GetUserDto } from './dto/get-user.dto'
import { SetRoleDto } from './dto/set-role-dto.dto'

import { UserService } from './user.service'

@Controller('users')
export class UserController {
	constructor(private userService: UserService) {}

	@Role('superuser')
	@Post()
	getAll(@Body() dto: GetUserDto) {
		try {
			return this.userService.getAllUsers(dto)
		} catch (e) {
			return e
		}
	}

	@Role('superuser', 'user', 'mentor')
	@Post('/settings')
	changeSettings(@Body() dto: ChangeUserSettingsDto) {
		try {
			return this.userService.changeSettings(dto)
		} catch (e) {
			return e
		}
	}

	@Role('superuser')
	@Post('/ban')
	banUser(@Body() dto: BanUserDto) {
		try {
			return this.userService.banUser(dto)
		} catch (e) {
			return e
		}
	}

	@Role('superuser')
	@Post('/role')
	setRole(@Body() dto: SetRoleDto) {
		try {
			return this.userService.setRole(dto)
		} catch (e) {
			return e
		}
	}
}
