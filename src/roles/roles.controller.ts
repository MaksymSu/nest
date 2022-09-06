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
    @Roles('admin')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Post()
    createRole(@Body() roleDto: CreateRoleDto) {
        return this.rolesService.createRole(roleDto);
    }

    @Put()
    updateRole(@Body() roleDto: CreateRoleDto) {
        return this.rolesService.updateRole(roleDto);
    }

    //@ApiOperation({summary: 'Getting roles + permissions'})
    //@ApiResponse({status: 200, type: [Role]})
    @Get()
    getAll() {
        return this.rolesService.getAllRoles();
    }

    @Delete('/:name')
    deleteRole(@Param('name') name: string) {
        return this.rolesService.deleteRole(name);
    }

    @Get('/:name')
    getByName(@Param('name') name: string) {
        return this.rolesService.getRoleByName(name);
    }

    @Post('/permit')
    setRolePermission(@Body() permissionDto: SetPermissionDto) {
        //console.log('ok', permissionDto);
        return this.rolesService.setRolePermission(permissionDto);
    }

    @Post('/set')
    setPermissionsByIds(@Body() dto: SetPermissionsDtoByIds) {
        return this.rolesService.setRolePermissionsByIds(dto)
    }

}
