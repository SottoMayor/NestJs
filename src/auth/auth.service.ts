import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { authCredentialsDto } from './DTO/auth-credentials.dto';
import { UserRepository } from './user.repository';
import { compare } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Payload } from './auth-payload.interface';


@Injectable()
export class AuthService {
    
    constructor( 
        @InjectRepository(UserRepository) private userRepository: UserRepository,
        private jwtService: JwtService ){}

    public async SignUp(authCredentialsDto: authCredentialsDto): Promise<void>{
        return this.userRepository.createUser(authCredentialsDto);
    }

    public async SignIn( authCredentialsDto: authCredentialsDto ): Promise<{ token: string }>{
        const { username, password } = authCredentialsDto;

        const foundUser = await this.userRepository.findOne({ username: username });

        if(!foundUser){
            throw new UnauthorizedException('This username was not found, check your credentials!')
        }

        const doMatch = await compare(password, foundUser.password);

        if(!doMatch){
            throw new UnauthorizedException('The password is wrong! Try again.')
        }

        const payload: Payload = { username: username, id: foundUser.id }
        const token: string = this.jwtService.sign(payload);

        return { token: token }
    }

}
