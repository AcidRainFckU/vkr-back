import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { TokenService } from 'src/token/token.service'
import { User } from 'src/user/user.model'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly tokenService: TokenService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: process.env.PRIVATE_ACCESS_KEY || 'SECRET',
			passReqToCallback: true
		})
	}

	async validate(req, user: User) {
		const token = req.headers.authorization.slice(7)
		const tokenExists = await this.tokenService.exists(token)
		// if (tokenExists) {
		// 	return user
		// } else {
		// 	throw new UnauthorizedException()
		// }
	}
}
