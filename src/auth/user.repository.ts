import { EntityRepository, Repository } from "typeorm";
import { authCredentialsDto } from "./DTO/auth-credentials.dto";
import { User } from "./user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User>{
    async createUser(authCredentialsDto: authCredentialsDto): Promise<void>{
        const { username, password } = authCredentialsDto;

        const newUser = {
            username: username,
            password: password
        }

        await this.save(newUser);

    }
}