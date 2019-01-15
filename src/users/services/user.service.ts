import { Injectable } from '@nestjs/common';
import { User } from '../models/user.entity';
import {InjectRepository} from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Token} from '../../auth/models/token.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
  ) {}

  findByToken(token: string) {
    return this.tokenRepository.findOne({
      id: token,
    });
  }
}
