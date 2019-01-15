import { Injectable } from '@nestjs/common';
import { User } from '../models/user.entity';
import {InjectRepository} from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../schemas/create';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly tokenRepository: Repository<User>,
  ) {}

  create(createDto: CreateUserDto): Promise<User> {
    return this.tokenRepository.save(
      createDto,
    );
  }
}
