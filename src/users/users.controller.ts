import {UsersService} from "./users.service";
import {User} from "./users.model";
import {Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UsePipes} from "@nestjs/common";
import {CreateUserDto} from "./dto/create-user.dto";
import {ApiOperation, ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";
import {SetRoleDto} from "./dto/set-role.dto";
import {JwtAuthGuard} from "../auth/jwt.auth.guard";
import {RolesGuard} from "../auth/roles.guard";
import {Roles} from "../auth/roles-auth.decorator";
import {ValidationPipe} from "../pipes/validation.pipe";

@ApiTags('Users')
@Controller('api/users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @ApiOperation({summary: 'Getting filrered, ordered, paginated users + roles'})
    @ApiResponse({status: 200, type: [User]})
    @Roles('admin')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    @ApiParam({
        name: 'order',
        type: 'string',
        description: 'Sort order',
        required: false
    })
    @ApiParam({
        name: 'offset',
        type: 'string',
        description: 'Page start from this offset, for pagination',
        required: false
    })
    @ApiParam({
        name: 'n',
        type: 'string',
        description: 'Users per page, for pagination',
        required: false
    })
    @ApiParam({
        name: 'filter',
        type: 'string',
        description: 'Filter by name or/and email or/and role. For example: ".com Bob Marley admi"',
        required: false
    })
    getAll(@Query() params ) {

        return this.usersService.getAllUsers(params);
    }

    @ApiOperation({summary: 'Users in total'})
    @ApiResponse({status: 200})
    @Roles('admin')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('/count')
    getCount(@Query() params) {
        return this.usersService.getUsersN(params);
    }

    //@Roles("admin")
    //@UseGuards(JwtAuthGuard, RolesGuard)
    @UsePipes(ValidationPipe)
    @Post()
    createUser(@Body() userDto: CreateUserDto) {
        return this.usersService.createUser(userDto);
    }

    //@Roles("admin")
    //@UseGuards(JwtAuthGuard, RolesGuard)
    @UsePipes(ValidationPipe)
    @Put()
    updateUser(@Body() userDto: CreateUserDto) {
        return this.usersService.updateUser(userDto)
    }

    //@Roles("admin")
    //@UseGuards(JwtAuthGuard, RolesGuard)
    @Delete('/:email')
    delete(@Param('email') email: string) {
        return this.usersService.deleteUser(email);
    }

   // @Roles()
   // @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('/:email')
    getByEmail(@Param('email') email: string) {
        return this.usersService.getByEmail(email);
    }

    @Get('/role/:role')
    getByRole(@Param('role') roleName: string) {
        return this.usersService.getByRole(roleName);
    }

    //@Roles("admin", "hrManager")
    //@UseGuards(JwtAuthGuard, RolesGuard)
    @Post('/role')
    setRole(@Body() setDto: SetRoleDto) {
        return this.usersService.setRoleById(setDto)
    }


    //@Roles("admin")
    //@UseGuards(JwtAuthGuard, RolesGuard)
    @Get('/fill/:n')
    fillUsers(@Param('n') n: number) {
        return this.usersService.fill(n)
    }


}
