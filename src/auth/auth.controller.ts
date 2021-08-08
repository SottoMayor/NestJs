import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { authCredentialsDto } from './DTO/auth-credentials.dto';

@Controller('auth')
export class AuthController {
    constructor( private authService: AuthService ){}

    @Post('/signup')
    public SignUp( @Body() authCredentialsDto: authCredentialsDto): Promise<void>{
        return this.authService.SignUp(authCredentialsDto)
    }

    @Post('/signin')
    public SignIn( @Body() authCredentialsDto: authCredentialsDto): Promise<{ token: string }>{
        return this.authService.SignIn(authCredentialsDto)
    }
}
