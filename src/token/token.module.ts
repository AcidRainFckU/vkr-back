import { Module } from '@nestjs/common'
import { TokenService } from './token.service'
import { TokenController } from './token.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { User } from 'src/user/user.model'
import { Token } from './token.model'

@Module({
	controllers: [TokenController],
	providers: [TokenService],
	imports: [SequelizeModule.forFeature([User, Token])],
	exports: [TokenService]
})
export class TokenModule {}
