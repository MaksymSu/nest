import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, Length} from "class-validator";

export class CreateUserDto {

    readonly id: number;

    @ApiProperty({example: 'user@mail.com', description: 'email address'})
    @IsEmail({}, {message: 'Incorrect email'})
    readonly email: string;

    @ApiProperty({example: '123456', description: 'password'})
    @Length(4, 20, {message: 'password length: 4 - 20 symbols'})
    readonly password: string;

    @ApiProperty({example: 'John Lennon', description: 'name'})
    @Length(0, 30, {message: 'name is too long'})
    readonly name: string;
}