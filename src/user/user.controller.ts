import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { Role } from 'src/auth/roles-auth.decorator'
import { RoleGuard } from 'src/auth/roles.guard'
import { BanUserDto } from './dto/ban-user.dto'
import { ChangeUserSettingsDto } from './dto/change-user-settings.dto'
import { GetUserDto } from './dto/get-user.dto'
import { SetRoleDto } from './dto/set-role-dto.dto'

import { UserService } from './user.service'

@Controller('users')
export class UserController {
	constructor(private userService: UserService) {}

	@Role('superuser')
	@UseGuards(RoleGuard)
	@Post()
	getAll(@Body() dto: GetUserDto) {
		try {
			return this.userService.getAllUsers(dto)
		} catch (e) {
			return e
		}
	}

	@Role('superuser', 'mentor', 'student')
	@UseGuards(RoleGuard)
	@Post('/settings')
	changeSettings(@Body() dto: ChangeUserSettingsDto) {
		try {
			return this.userService.changeSettings(dto)
		} catch (e) {
			return e
		}
	}

	@Role('superuser')
	@UseGuards(RoleGuard)
	@Post('/ban')
	banUser(@Body() dto: BanUserDto) {
		try {
			return this.userService.banUser(dto)
		} catch (e) {
			return e
		}
	}

	@Role('superuser')
	@UseGuards(RoleGuard)
	@Post('/role')
	setRole(@Body() dto: SetRoleDto) {
		try {
			return this.userService.setRole(dto)
		} catch (e) {
			return e
		}
	}
}
