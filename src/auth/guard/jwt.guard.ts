import { AuthGuard } from '@nestjs/passport';

export class JwtGuard extends AuthGuard('jwt') {

    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor() {

        super();
    
    }

}