import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {RolesService} from "./roles.service";
import {CreateRoleDto} from "./dto/create-role.dto";
import {SetPermissionDto} from "./dto/set-permission.dto";

@Controller('api/roles')
export class RolesController {
    constructor(private rolesService: RolesService){}

    @Post()
    createRole(@Body() roleDto: CreateRoleDto) {
        return this.rolesService.createRole(roleDto);
    }

    @Put()
    updateRole(@Body() roleDto: CreateRoleDto) {
        return this.rolesService.updateRole(roleDto);
    }

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

}
