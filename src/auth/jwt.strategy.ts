import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Payload } from "./auth-payload.interface";
import { User } from "./user.entity";
import { UserRepository } from "./user.repository";

Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    constructor( 
        @InjectRepository(UserRepository) 
        private userRepository: UserRepository){
        super({
            secretOrKey: 'supersupersecretsecret',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    public async validate(payload: Payload): Promise<User>{
        const { id } = payload;

        const foundUser = await this.userRepository.findOne(id);

        if(!foundUser){
            throw new UnauthorizedException('You are not authenticated!');
        }

        return foundUser;

    }

}