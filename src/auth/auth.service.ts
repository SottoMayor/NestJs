import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { authCredentialsDto } from './DTO/auth-credentials.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
    
    constructor( @InjectRepository(UserRepository) private userRepository: UserRepository ){}

    public async SignUp(authCredentialsDto: authCredentialsDto): Promise<void>{
        return this.userRepository.createUser(authCredentialsDto);
    }
}
