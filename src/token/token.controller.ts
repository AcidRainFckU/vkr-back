import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { TokenService } from './token.service'

@Controller('token')
export class TokenController {
	constructor(private readonly tokenService: TokenService) {}
}
