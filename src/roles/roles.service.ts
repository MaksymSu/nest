import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Role} from "./roles.model";
import {CreateRoleDto} from "./dto/create-role.dto";
import {type} from "os";
import {SetPermissionDto} from "./dto/set-permission.dto";
import {RolePermission} from "./roles-permissions.model";

@Injectable()
export class RolesService {

    constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

    async createRole(dto: CreateRoleDto) {
        const role = await this.roleRepository.create(dto);
        return role;
    }

    async updateRole(dto: CreateRoleDto) {
        let role = await  this.roleRepository.findOne({where: {'name': dto.name}});
        if(role) {
            await role.update(dto);
        }
        return role;
    }

    async getAllRoles() {
        const roles = await this.roleRepository.findAll({
            attributes: ['name', 'description', 'type'],
            include: {
                model: Role,
                attributes: ['name', 'description', 'type'],
                through: {
                    attributes: []
                }
            }
        });
        return roles;
    }

    async getRoleByName(name: string) {
        const role = await this.roleRepository.findOne({
            where: {name},
            include: {
                model: Role,
                attributes: ['name', 'type'],
                include: [{
                    model: Role,
                    attributes: ['name', 'type'],
                    through: {
                        attributes: []
                    }
                }],
                through: {
                    attributes: [],
                }
            },
        });

        //const rolesArr1 = role['dataValues']['children'];
        //if(rolesArr1) {
         //   const rolesArr2 = role['dataValues']['children'];
        //}


        return role;
    }

    async deleteRole(name: string) {
        await this.roleRepository.destroy({where: {name}});
        return 'ok';
    }

    async setRolePermission(dto: SetPermissionDto) {

        //return dto;

        const parent = await this.roleRepository.findOne({
            where: {'name': dto.parentName}
        });

        const child = await this.roleRepository.findOne({
            where: {'name': dto.childName}
        });


        if(parent && child) {
            await parent.$add('children', [child.id]);
        }

        return {parent, child};

    }

}
