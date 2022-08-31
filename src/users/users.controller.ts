import {UsersService} from "./users.service";
import {User} from "./users.model";
import {Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UsePipes} from "@nestjs/common";
import {CreateUserDto} from "./dto/create-user.dto";
import {ApiOperation, ApiResponse} from "@nestjs/swagger";
import {SetRoleDto} from "./dto/set-role.dto";
import {JwtAuthGuard} from "../auth/jwt.auth.guard";
import {RolesGuard} from "../auth/roles.guard";
import {Roles} from "../auth/roles-auth.decorator";
import {ValidationPipe} from "../pipes/validation.pipe";


@Controller('api/users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @ApiOperation({summary: 'Getting all users + roles'})
    @ApiResponse({status: 200, type: User})
    @Roles("admin", "viewUsers")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    getAll(@Query() params ) {

        return this.usersService.getAllUsers(params);
    }

    @ApiOperation({summary: 'Users in total'})
    @ApiResponse({status: 200})
    @Roles("admin", "viewUsers")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('/count')
    getCount(@Query() params) {
        return this.usersService.getUsersN(params);
    }

    @UsePipes(ValidationPipe)
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

    @Get('/fill/:n')
    fillUsers(@Param('n') n: number) {
        return this.usersService.fill(n)
    }


}
