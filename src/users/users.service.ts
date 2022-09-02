import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {User} from "./users.model";
import {InjectModel} from "@nestjs/sequelize";
import {CreateUserDto} from "./dto/create-user.dto";
import {RolesService} from "../roles/roles.service";
import {Role} from "../roles/roles.model";
import * as bcrypt from 'bcryptjs';
import {Sequelize} from "sequelize-typescript";
import * as sequelize from "sequelize";

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User,
                private roleService: RolesService, private sequelize: Sequelize) {}

    async createUser(dto: CreateUserDto, registration: boolean = false) {
        try {
            const password = await bcrypt.hash(dto.password, 5);
            const user = await this.userRepository.create({...dto, password});
            await this.setRole(user, 'user');
            return this.getById(user.id, registration);
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
                sequelize.col('User.email'), ' ',
                sequelize.col('User.name'), ' ',
                sequelize.col('roles.name')
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
                attributes: ['id', 'name', 'description'],
                include: [{
                    model: Role,
                    attributes: ['id', 'name', 'description'],
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

    async getById(id: number, permissions: boolean = false) {

        const query = {
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

        };

        if (permissions) {
            query.include['include'] = [{
                model: Role,
                attributes: ['id', 'name', 'description'],
                through: {
                    attributes: []
                }
            }]
        }

        const user = await this.userRepository.findOne(query);

        return user;
    }

    async getByRole(roleName: string) {
        const users = await this.userRepository.findAll({
            include: {
                model: Role,
                where: {name: roleName},
                attributes: ['id', 'name', 'description', 'type'],
                through: {
                    attributes: [],
                }
            },
            attributes: ['id', 'name', 'email'],
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

    async replaceRolesByName(from: string, to: string) {

        const roleTo = await this.roleService.getRoleByName(to);

        if (!await this.roleService.getRoleByName(from) || !roleTo) {
            throw new HttpException('Role not found', HttpStatus.BAD_REQUEST)
        }

        const users = await this.getByRole(from);

        await this.sequelize.transaction(async t => users.forEach(user => user.$set('roles', [roleTo.id])));

        return await this.getByRole(to)
    }


    async fill(n) {

        function getRandomInt(max) {
            return Math.floor(Math.random() * max);
        }


        function getRandomArbitrary(min, max) {
            return Math.random() * (max - min) + min;
        }

        const makeStr = (min, max) => {
            const alfa = 'qwertyuiopasdfghjklzxcvbnm1234567890';
            let str = '';
            for (let j = 0; j < getRandomArbitrary(min, max); j++) {
                str += alfa[getRandomInt(alfa.length)]
            }

            return str;
        };

        for (let i = 0; i < n; i++) {
            let email = '';
            let name = '';
            let password= '';

            email = makeStr(3, 12);
            email += '@';
            email = makeStr(3, 10);
            email += '.';
            email = makeStr(2, 4);

            password = makeStr(6, 12);

            name = makeStr(4, 10);

            this.createUser({email, name, password, id:undefined})

        }

        return n;

    }

}
