import { Module, ValidationPipe } from '@nestjs/common';
import { UserService } from './services/user.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import { User } from './models/user.entity';
import { UsersController } from './users.controller';

@Module({

  imports: [
    TypeOrmModule.forFeature([User]),
    ValidationPipe,
  ],
  providers: [UserService],
  exports: [UserService],
  controllers: [UsersController],
})
export class UsersModule {}
