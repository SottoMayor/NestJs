import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { authCredentialsDto } from "./DTO/auth-credentials.dto";
import { User } from "./user.entity";
import { hash } from 'bcryptjs';

@EntityRepository(User)
export class UserRepository extends Repository<User>{
    async createUser(authCredentialsDto: authCredentialsDto): Promise<void>{
        const { username, password } = authCredentialsDto;
        
        try {
            // Hashing the password!
            const hashedPassword = await hash(password, 12);
    
            const newUser = {
                username: username,
                password: hashedPassword
            }
            
            await this.save(newUser);
        } catch(err) {
            if(err.code === '23505'){
                throw new ConflictException('This username already exists, please pickup another.')
            }else{
                throw new InternalServerErrorException();
            }
        }

    }
}