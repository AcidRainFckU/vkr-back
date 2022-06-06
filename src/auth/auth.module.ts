import { forwardRef, Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { UserModule } from 'src/user/user.module'
import { JwtModule } from '@nestjs/jwt'
import { TokenModule } from 'src/token/token.module'

@Module({
	controllers: [AuthController],
	providers: [AuthService],
	imports: [
		forwardRef(() => UserModule),

		JwtModule.register({
			secret: process.env.PRIVATE_ACCESS_KEY || 'SECRET',
			signOptions: {
				expiresIn: '30d'
			}
		}),
		TokenModule
	],
	exports: [AuthService, JwtModule]
})
export class AuthModule {}
