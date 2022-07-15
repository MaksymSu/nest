import { Injectable } from '@nestjs/common';
import {User} from "./users.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateUserDto} from "./dto/create-user.dto";
import {RolesService} from "../roles/roles.service";
import {Role} from "../roles/roles.model";
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User,
                private roleService: RolesService) {}

    async createUser(dto: CreateUserDto) {
        try {
            const password = await bcrypt.hash(dto.password, 5);
            const user = await this.userRepository.create({...dto, password});
            await this.setRole(user, 'user');
            return this.getById(user.id);
        } catch (e) {
            return e
        }
    }

    async updateUser(dto: CreateUserDto) {
        console.log('>>>', dto)
        const user = dto.id ? await this.getById(dto.id) : await this.getByEmail(dto.email);
        user.name = dto.name;

        if(dto.password) {
            user.password = await bcrypt.hash(dto.password, 5);
        }

        user.email = dto.email;
        return user.save();
    }

    async deleteUser(email: string) {
        await this.userRepository.destroy({
            where: {
                email: email
            }
        })
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll({
            include: {
                model: Role,
                attributes: ['id', 'name'],
                include: [{
                    model: Role,
                    attributes: ['id', 'name'],
                    through: {
                        attributes: []
                    }
                }],
                through: {
                    attributes: [],
                }
            },
            attributes: ['id', 'name', 'email'],

        });
        return users;
    }

    async getByEmail(email: string) {
        const user = await this.userRepository.findOne({
            where: {email},
            include: {
                model: Role,
                attributes: ['id', 'name'],
                include: [{
                    model: Role,
                    attributes: ['id', 'name'],
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

    async getById(id: number) {
        const user = await this.userRepository.findOne({
            where: {id},
            include: {
                model: Role,
                attributes: ['id', 'name'],
                include: [{
                    model: Role,
                    attributes: ['id', 'name'],
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
