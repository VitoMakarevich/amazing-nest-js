import { Module } from '@nestjs/common';
import { UserService } from '../services/user.service';
import {TypeOrmModule} from '@nestjs/typeorm'
import { User } from '../models/user.entity';
import { Token } from '../models/token.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Token])],
  providers: [UserService],
  exports: [UserService]
})
export class UsersModule {}
