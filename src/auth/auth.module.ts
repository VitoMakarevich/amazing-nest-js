import { Module } from '@nestjs/common';
import { HttpStrategy } from './strategy/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './services/auth.service';
import { Token } from './models/token.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Token])],
  providers: [AuthService, HttpStrategy],
  exports: [AuthService],
})
export class AuthModule {}
