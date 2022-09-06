import {UsersService} from "./users.service";
import {User} from "./users.model";
import {Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UsePipes} from "@nestjs/common";
import {CreateUserDto} from "./dto/create-user.dto";
import {ApiBearerAuth, ApiHeader, ApiOperation, ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";
import {SetRoleDto} from "./dto/set-role.dto";
import {JwtAuthGuard} from "../auth/jwt.auth.guard";
import {RolesGuard} from "../auth/roles.guard";
import {Roles} from "../auth/roles-auth.decorator";
import {ValidationPipe} from "../pipes/validation.pipe";
import {GetUsersDto} from "./dto/get-users.dto";
import {ReplaceRolesDto} from "./dto/replace-roles.dto";

@ApiTags('Users')
@ApiBearerAuth('defaultBearerAuth')
@Controller('api/users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @ApiOperation({summary: 'Getting filtered, ordered, paginated users + roles'})
    @ApiResponse({status: 200, type: [User]})
    @Roles('viewUsers')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    getAll(@Query() params: GetUsersDto ) {

        return this.usersService.getAllUsers(params);
    }

    @ApiOperation({summary: 'Cet users total count'})
    @ApiResponse({status: 200})
    @Roles('viewUsers')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('/count')
    getCount(@Query() params) {
        return this.usersService.getUsersN(params);
    }

    @ApiOperation({summary: 'Add new user and assign default role for him'})
    @ApiResponse({status: 201, type: [User]})
    @Roles("addUsers")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UsePipes(ValidationPipe)
    @Post()
    createUser(@Body() userDto: CreateUserDto) {
        return this.usersService.createUser(userDto);
    }

    @ApiOperation({summary: 'Update user data'})
    @ApiResponse({status: 200, type: [User]})
    @Roles("updateUsers")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @UsePipes(ValidationPipe)
    @Put()
    updateUser(@Body() userDto: CreateUserDto) {
        return this.usersService.updateUser(userDto)
    }

    @ApiOperation({summary: 'Delete user'})
    @ApiResponse({status: 200, type: [User]})
    @Roles("deleteUsers")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete('/:email')
    delete(@Param('email') email: string) {
        return this.usersService.deleteUser(email);
    }

    @ApiOperation({summary: 'Get user by email with his role and permissions'})
    @ApiResponse({status: 200, type: [User]})
    @Roles("viewUsers")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('/:email')
    getByEmail(@Param('email') email: string) {
        return this.usersService.getByEmail(email);
    }

    @ApiOperation({summary: 'Get users by role'})
    @ApiResponse({status: 200, type: [User]})
    @Roles("admin")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('/role/:role')
    getByRole(@Param('role') roleName: string) {
        return this.usersService.getByRole(roleName);
    }

    @ApiOperation({summary: 'Assign role to user'})
    @ApiResponse({status: 200, type: [User]})
    @Roles("assignRole")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('/role')
    setRole(@Body() setDto: SetRoleDto) {
        return this.usersService.setRoleById(setDto)
    }


    @ApiOperation({summary: 'Fill users table randomly for tasting'})
    @ApiResponse({status: 200})
    @Roles("admin")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('/fill/:n')
    fillUsers(@Param('n') n: number) {
        return this.usersService.fill(n)
    }

    @ApiOperation({summary: 'Replace role for all users'})
    @ApiResponse({status: 200, type: [User]})
    @Roles('admin')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('/role/replace')
    replaceRoles(@Body() params: ReplaceRolesDto) {
        return this.usersService.replaceRolesByName(params.from, params.to)
    }

}
