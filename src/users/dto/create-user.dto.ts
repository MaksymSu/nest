import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {

    readonly id: number;

    @ApiProperty({example: 'user@mail.com', description: 'email address'})
    readonly email: string;

    @ApiProperty({example: '123456', description: 'password'})
    readonly password: string;

    @ApiProperty({example: 'John Lennon', description: 'name'})
    readonly name: string;
}