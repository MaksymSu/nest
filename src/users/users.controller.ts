import {UsersService} from "./users.service";
import {User} from "./users.model";
import {Body, Controller, Delete, Get, Param, Post, Put, Query} from "@nestjs/common";
import {CreateUserDto} from "./dto/create-user.dto";
import {ApiOperation, ApiResponse} from "@nestjs/swagger";
import {SetRoleDto} from "./dto/set-role.dto";


@Controller('api/users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @ApiOperation({summary: 'Getting all users'})
    @ApiResponse({status: 200, type: User})
    @Get()
    getAll(@Query() params ) {

        return this.usersService.getAllUsers(params);
    }

    @Get('/count')
    getCount() {
        return this.usersService.getUsersN();
    }

    @Post()
    createUser(@Body() userDto: CreateUserDto) {
        return this.usersService.createUser(userDto);
    }

    @Put()
    updateUser(@Body() userDto: CreateUserDto) {
        return this.usersService.updateUser(userDto)
    }

    @Delete('/:email')
    delete(@Param('email') email: string) {
        return this.usersService.deleteUser(email);
    }

    @Get('/:email')
    getByEmail(@Param('email') email: string) {
        return this.usersService.getByEmail(email);
    }

    @Get('/role/:role')
    getByRole(@Param('role') roleName: string) {
        return this.usersService.getByRole(roleName);
    }

    @Post('/role')
    setRole(@Body() setDto: SetRoleDto) {
        return this.usersService.setRoleById(setDto)
    }


}
