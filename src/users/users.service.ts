import { Injectable } from '@nestjs/common';
import {User} from "./users.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateUserDto} from "./dto/create-user.dto";
import {RolesService} from "../roles/roles.service";
import {Role} from "../roles/roles.model";
import * as bcrypt from 'bcryptjs';
import {Sequelize} from "sequelize-typescript";
import * as sequelize from "sequelize";
import {query} from "express";

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User,
                private roleService: RolesService, private sequelize: Sequelize) {}

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
        //console.log('>>>', dto)
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

    async getAllUsers(params) {

        const query = {

            include: {
                model: Role,
                attributes: ['id', 'name', 'description', 'type'],
                through: {
                    attributes: [],
                }
            },
            attributes: ['id', 'name', 'email'],
        };


        if(params.filter) {
            query['where'] = sequelize.where(sequelize.fn(
                'concat',
                sequelize.col('roles.name'), ' ',
                sequelize.col('User.name'), ' ',
                sequelize.col('User.email')
            ), {
                [sequelize.Op.like]: '%' + params.filter + '%'
            });
        }


        if(params.order) {
            query['order'] = [sequelize.literal('name ' + params.order)]
        }

        if(params.offset) {
            query['offset'] = Number(params.offset);
        }

        if(params.n) {
            query['limit'] = Number(params.n);
            query['subQuery'] = false
        }


/*
        const where = fields => {
            return {
                [sequelize.Op.or]: fields.map(field => {
                    return {
                        [field]: {
                            [sequelize.Op.like]: '%' + params.filter + '%'
                        }
                    }
                })
            }
        };

        if(params.filter) {
            query['where'] = where(['name', 'email']);
            query.include['where'] = where(['name']);
        }

*/
        const users = await this.userRepository.findAll(query);

        return users;
    }

    async getUsersN(params) {
        if (!params.filter || !params || params.filter  == '') {
            return await this.userRepository.count();
        }

        const query = {

            include: {
                model: Role,
                attributes: [],
                through: {
                    attributes: [],
                }
            },
            attributes: [],
            where: sequelize.where(sequelize.fn(
                'concat',
                sequelize.col('roles.name'), ' ',
                sequelize.col('User.name'), ' ',
                sequelize.col('User.email')
            ), {
                [sequelize.Op.like]: '%' + params.filter + '%'
            })
        };

        return await this.userRepository.findAll(query).then(response => response.length);
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
                attributes: ['id', 'name', 'description', 'type'],
                /*
                include: [{
                    model: Role,
                    attributes: ['id', 'name', 'description'],
                    through: {
                        attributes: []
                    }
                }],*/
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
        try {
            const role = await this.roleService.getRoleByName(roleName);
            await user.$set('roles', [role.id]);
            //user.roles = user[roleName];
            return user;
        } catch (e) {
            return e
        }
    }

    async setRoleById(dto) {
        try {
                const user = await this.getById(dto.userId);

                const role = await this.roleService.getRoleByName(dto.roleName);

                await this.sequelize.transaction(async t => await user.$set('roles', [role.id]));

                return await this.getById(dto.userId);

        } catch (e) {
            return e;
        }
    }

}
