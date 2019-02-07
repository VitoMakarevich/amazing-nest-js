import { Body, ClassSerializerInterceptor, Controller, Get, Post, SerializeOptions, UseGuards, UseInterceptors, UsePipes } from '@nestjs/common';
import { ValidationPipe } from '../validation/validation-pipe.pipe';
import {AuthGuard} from '@nestjs/passport';
import { CreateUserDto } from './schemas/in/create';
import { UserService } from './services/user.service';
import { UserEntity } from './schemas/out/user';
import { OutType, TransformerInterceptor } from '../transformer.interceptor';

@Controller('user')
export class UsersController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @Post('sign-up')
  @UseInterceptors(TransformerInterceptor)
  @OutType(UserEntity)
  @UsePipes(new ValidationPipe())
  signUp(@Body() createDto: CreateUserDto) {
      return this.userService.create(createDto);
  }

  @Get('/')
  @UseInterceptors(TransformerInterceptor)
  @OutType(UserEntity)
  getAllUsers() {
    return this.userService.getAll();
  }
}
