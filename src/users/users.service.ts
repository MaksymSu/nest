import { Injectable } from '@nestjs/common';
import {User} from "./users.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateUserDto} from "./dto/create-user.dto";
import {RolesService} from "../roles/roles.service";
import {Role} from "../roles/roles.model";

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User,
                private roleService: RolesService) {}

    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto);
        return this.setRole(user, 'admin');
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll({
            include: {
                model: Role,
                through: {
                    attributes: []
                },
                attributes: ['name']
            },
            attributes: ['name', 'email'],

        });
        return users;
    }

    async getByEmail(email: string) {
        const user = await this.userRepository.findOne({
            where: {email},
            include: {
                model: Role,
                attributes: ['name'],
                include: [{
                    model: Role,
                    attributes: ['name'],
                    through: {
                        attributes: []
                    }
                }],
                through: {
                    attributes: [],
                }
            },

        });
        return user;
    }

    async getByRole(roleName: string) {
        const users = await this.userRepository.findAll({
            include: {
                model: Role,
                where: {name: roleName},
                attributes: [],
            },
            //attributes: ['email']
        });
        return users;
    }

    async setRole(user: User, roleName: string) {
        const role = await this.roleService.getRoleByName(roleName);
        await user.$set('roles', [role.id]);
        //user.roles = user[roleName];
        return user;
    }

}
