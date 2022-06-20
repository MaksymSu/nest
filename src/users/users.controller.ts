import {UsersService} from "./users.service";
import {User} from "./users.model";
import {Body, Controller, Get, Post} from "@nestjs/common";
import {CreateUserDto} from "./dto/create-user.dto";
import {ApiOperation, ApiResponse} from "@nestjs/swagger";


@Controller('api/users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @ApiOperation({summary: 'Getting all users'})
    @ApiResponse({status: 200, type: User})
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
