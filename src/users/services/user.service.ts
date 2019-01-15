import { Injectable } from '@nestjs/common';
import { User } from '../models/user.entity';
import {InjectRepository} from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../schemas/in/create';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createDto: CreateUserDto): Promise<User> {
    const salt = await bcrypt.genSalt(2)
    const hashedPassword = await bcrypt.hash(
      createDto.password,
      salt,
    )

    return this.userRepository.save({
      ...createDto,
      salt,
      password: hashedPassword,
    });
  }
}
