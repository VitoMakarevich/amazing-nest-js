import { Body, ClassSerializerInterceptor, Controller, Post, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { ValidationPipe } from '../validation/validation-pipe.pipe';
import {AuthGuard} from '@nestjs/passport';
import { CreateUserDto } from './schemas/in/create';
import { UserService } from './services/user.service';
import { UserEntity } from './schemas/out/user';

@Controller('user')
export class UsersController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Post()
  @UseGuards(AuthGuard('bearer'))
  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(ValidationPipe)
  async create(@Body() createDto: CreateUserDto) {
    const entity = await this.userService.create(createDto);
    return new UserEntity(entity);
  }
}
