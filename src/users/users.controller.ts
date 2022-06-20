import {UsersService} from "./users.service";
import {User} from "./users.model";
import {Body, Controller, Get, Post} from "@nestjs/common";
import {CreateUserDto} from "./dto/create-user.dto";


@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}


    @Get()
    getAll() {
        return this.usersService.getAllUsers();
    }

    @Post()
    createUser(@Body() userDto: CreateUserDto) {

        //console.log('BODY', Body());

        return this.usersService.createUser(userDto);
    }



}
