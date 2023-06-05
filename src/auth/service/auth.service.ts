import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '@user/repository/user.repository';
import { LoginDto } from '../dto/login.dto';
import { jwtHelper } from '@utils/helper';
import { BaseResponse } from '@utils/base.response';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(UserRepository)
        private readonly userRepository: UserRepository
    ) {}

    async login(dto: LoginDto): Promise<BaseResponse<string>> {

        const user = await this.userRepository.getUserByName(dto.name);

        if (!user) {

            return {
                status: HttpStatus.NOT_FOUND,
                data: null,
                message: 'User is not found'
            };
        
        }

        const TOKEN = jwtHelper.sign({
            name: user.name,
            isAdmin: user.isAdmin
        });

        return { status: HttpStatus.OK, data: TOKEN, message: 'Successfully logged in' };
    
    }

}