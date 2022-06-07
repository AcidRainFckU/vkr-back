import {
	CanActivate,
	ExecutionContext,
	HttpException,
	HttpStatus,
	Injectable,
	UnauthorizedException
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { Observable } from 'rxjs'
import { ROLE_KEY } from './roles-auth.decorator'

@Injectable()
export class RoleGuard implements CanActivate {
	constructor(private jwtService: JwtService, private reflector: Reflector) {}

	canActivate(
		context: ExecutionContext
	): boolean | Promise<boolean> | Observable<boolean> {
		try {
			const requiredRole = this.reflector.getAllAndOverride<string[]>(
				ROLE_KEY,
				[context.getHandler(), context.getClass()]
			)

			if (!requiredRole) {
				return true
			}

			const req = context.switchToHttp().getRequest()

			const authHeader = req.headers.authorization

			const bearer = authHeader.split(' ')[0]
			const token = authHeader.split(' ')[1]

			if (bearer !== 'Bearer' || !token) {
				throw new UnauthorizedException({
					message: 'Пользователь не авторизован'
				})
			}

			const user = this.jwtService.verify(token)

			req.user = user
			return requiredRole.some((role) => role === user.role)
		} catch (e) {
			console.log(e)
			throw new HttpException('Нет доступа', HttpStatus.FORBIDDEN)
		}
	}
}
