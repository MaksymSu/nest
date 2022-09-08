import {Body, Controller, Delete, Get, Param, Post, Put, UseGuards} from '@nestjs/common';
import {RolesService} from "./roles.service";
import {CreateRoleDto} from "./dto/create-role.dto";
import {SetPermissionDto} from "./dto/set-permission.dto";
import {SetPermissionsDtoByIds} from "./dto/set-permissions-by-ids.dto";
import {ApiBearerAuth, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../auth/jwt.auth.guard";
import {User} from "../users/users.model";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";
import {Role} from "./roles.model";

@ApiTags('Roles and permissions')
@ApiBearerAuth('defaultBearerAuth')
@Controller('api/roles')
export class RolesController {
    constructor(private rolesService: RolesService){}

    @ApiOperation({summary: 'Add new role'})
    @ApiResponse({status: 201, type: [Role]})
    @Roles('addRoles')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    createRole(@Body() roleDto: CreateRoleDto) {
        return this.rolesService.createRole(roleDto);
    }

    @ApiOperation({summary: 'Update role'})
    @ApiResponse({status: 200, type: [Role]})
    @Roles('updateRoles')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Put()
    updateRole(@Body() roleDto: CreateRoleDto) {
        return this.rolesService.updateRole(roleDto);
    }

    @ApiOperation({summary: 'Get all roles with permissions'})
    @ApiResponse({status: 200, type: [Role]})
    @Roles('viewUsers')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get()
    getAll() {
        return this.rolesService.getAllRoles();
    }

    @ApiOperation({summary: 'Delete role. Role can\'t be deleted while assigned'})
    @ApiResponse({status: 200})
    @Roles('deleteRoles')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Delete('/:name')
    deleteRole(@Param('name') name: string) {
        return this.rolesService.deleteRole(name);
    }

    @ApiOperation({summary: 'Get role by name with permissions'})
    @ApiResponse({status: 200, type: Role})
    @Roles('admin')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get('/:name')
    getByName(@Param('name') name: string) {
        return this.rolesService.getRoleByName(name);
    }

    @ApiOperation({summary: 'Assign permission to role'})
    @ApiResponse({status: 200, type: Role})
    @Roles('assignRole')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('/permit')
    setRolePermission(@Body() permissionDto: SetPermissionDto) {
        //console.log('ok', permissionDto);
        return this.rolesService.setRolePermission(permissionDto);
    }

    @ApiOperation({summary: 'Assign permissions to role by ids'})
    @ApiResponse({status: 200, type: Role})
    @Roles('assignRole')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post('/set')
    setPermissionsByIds(@Body() dto: SetPermissionsDtoByIds) {
        return this.rolesService.setRolePermissionsByIds(dto)
    }

}
