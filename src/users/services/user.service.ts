import { Inject, Injectable } from '@nestjs/common';
import { User } from '../models/user.entity';
import {InjectRepository} from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../schemas/in/create';
import * as bcrypt from 'bcrypt';
import { Client } from 'elasticsearch';
import { ELASTIC_CONNECTION } from '../../app.providers';
import { Synchronizer } from '../../elastic/syncronizer';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly sad: Synchronizer,
  ) {}

  async create(createDto: CreateUserDto): Promise<User> {
    const salt = await bcrypt.genSalt(2)
    const hashedPassword = await bcrypt.hash(
      createDto.password,
      salt,
    );

    const user = new User()
    user.name = createDto.name
    user.description = createDto.description
    user.password = hashedPassword
    user.salt = salt

    const createdUser = this.userRepository.save(user);

    return createdUser;
  }

  async getAll(): Promise<User[]> {
    return this.userRepository.find();
  }
}
