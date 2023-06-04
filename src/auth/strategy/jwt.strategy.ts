import { Injectable, RequestTimeoutException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from '@user/repository/user.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        config: ConfigService,
        @InjectRepository(UserRepository) private userRepository: UserRepository
    ) {

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.get('JWT_KEY')
        });
    
    }

    async validate(payload: { name: string; isAdmin: boolean }) {

        try {

            return await this.userRepository.getUserByName(payload.name);
        
        } catch (err) {

            throw new RequestTimeoutException({
                status: 408,
                message: 'Timed out fetching a new connection from the connection pool!',
                error: true
            });
        
        }
    
    }

}