import { Module } from '@nestjs/common';
import { HttpStrategy } from '../strategy/passport';
import { User } from '../models/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  providers: [AuthService, HttpStrategy],
})
export class AuthModule {}
