import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, Length} from "class-validator";

export class CreateUserDto {

    readonly id: number;

    @ApiProperty({example: 'admin8@gmail.com', description: 'email address', required: true})
    @IsEmail({}, {message: 'Incorrect email'})
    readonly email: string;

    @ApiProperty({example: '222111qqq', description: 'password', required: true})
    @Length(6, 20, {message: 'password length: 6 - 20 symbols'})
    readonly password: string;

    @ApiProperty({example: 'John Lennon', description: 'name'})
    readonly name: string;
}