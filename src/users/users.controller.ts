import {UsersService} from "./users.service";
import {User} from "./users.model";
import {Body, Controller, Get, Param, Post} from "@nestjs/common";
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

        return this.usersService.createUser(userDto);
    }

    @Get('/:email')
    getByEmail(@Param('email') email: string) {
        return this.usersService.getByEmail(email);
    }

    @Get('/role/:role')
    getByRole(@Param('role') roleName: string) {
        return this.usersService.getByRole(roleName);
    }


}
