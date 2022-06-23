import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Role} from "./roles.model";
import {CreateRoleDto} from "./dto/create-role.dto";

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
        const roles = await this.roleRepository.findAll();
        return roles;
    }

    async getRoleByName(name: string) {
        const role = await this.roleRepository.findOne({where: {name}});
        return role;
    }

    async deleteRole(name: string) {
        await this.roleRepository.destroy({where: {name}});
        return 'ok';
    }



}
