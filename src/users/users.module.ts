import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {User} from "./users.model";

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [User]
})
export class UsersModule {}
