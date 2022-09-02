import {forwardRef, Inject, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Role} from "./roles.model";
import {CreateRoleDto} from "./dto/create-role.dto";
import {SetPermissionDto} from "./dto/set-permission.dto";
import {SetPermissionsDtoByIds} from "./dto/set-permissions-by-ids.dto";
import {UsersService} from "../users/users.service";

@Injectable()
export class RolesService {

    constructor(@InjectModel(Role) private roleRepository: typeof Role, @Inject(forwardRef(() => UsersService)) private userService: UsersService) {}

    async createRole(dto: CreateRoleDto) {
        const role = await this.roleRepository.create(dto);
        const fullRole = await this.getRoleByName(role.name);
        return fullRole;
    }

    async updateRole(dto: CreateRoleDto) {

        const role = dto.id ? await this.getRoleById(dto.id) : await this.getRoleByName(dto.name);
        role.update(dto);

        return role;
    }

    async getAllRoles() {
        const roles = await this.roleRepository.findAll({
            attributes: ['id', 'name', 'description', 'type'],
            include: {
                model: Role,
                attributes: ['id', 'name', 'description', 'type'],
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
                attributes: ['id', 'name', 'description', 'type'],
                through: {
                    attributes: [],
                }
            },
        });

        return role;
    }


    async getRoleById(id: number) {
        const role = await this.roleRepository.findOne({
            where: {id},
            include: {
                model: Role,
                attributes: ['id', 'name', 'type', 'description'],
                include: [{
                    model: Role,
                    attributes: ['id', 'name', 'type', 'description'],
                    through: {
                        attributes: []
                    }
                }],
                through: {
                    attributes: [],
                }
            },
        });

        return role;
    }

    async deleteRole(name: string) {

        const users = await this.userService.getByRole(name);

        if(users.length === 0) {
            await this.roleRepository.destroy({where: {name}});

            return 'ok';
        }


        return 'err'
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

    async setRolePermissionsByIds(dto: SetPermissionsDtoByIds) {

        try {
            const role = await this.getRoleById(dto.parentId);
                //await this.roleRepository.findOne({
                //where: {'id': dto.parentId}
            //});

            if (!role) {
                throw "Role id not found"
            }

            await role.$set('children', dto.childrenIds);

            return await this.getRoleById(dto.parentId);
        } catch (e) {
            return e
        }
    }

}
