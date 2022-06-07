import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectModel } from '@nestjs/sequelize'
import { CreateUserTokenDto } from './dto/create-user-token.dtp'
import { ValidTokenTokenDto } from './dto/verifyToken.dto'
import { Token } from './token.model'

@Injectable()
export class TokenService {
	constructor(@InjectModel(Token) private tokenRepasitory: typeof Token) {}

	async create(dto: CreateUserTokenDto) {
		console.log('флюовырфдловфыдвлофдлв орвофыолвфыов ф ыловфырвлдфоврдф ыв о')
		const userToken = await this.tokenRepasitory.create(dto)
		return userToken
	}

	async delete(token: string) {
		return await this.tokenRepasitory.destroy({ where: { token } })
	}

	async exists(dto: ValidTokenTokenDto) {
		const token = await this.tokenRepasitory.findOne({
			where: { token: dto.token },
			include: { all: true }
		})

		return token
	}
}
