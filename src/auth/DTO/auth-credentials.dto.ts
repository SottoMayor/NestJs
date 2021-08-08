import { IsString, Length, Matches } from "class-validator";

export class authCredentialsDto{
    @IsString()
    @Length(4, 50, { message: 'The username must be length beetwen 4 and 50 characters.' })
    username: string;

    @IsString()
    @Length(8, 255, { message: 'The password must be at least 8 characters.' })
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { 
        message: 'The password must contain at least 1 upper case letter, 1 lower case letter, 1 number or special character.' 
    })
    password: string;
}