import { Injectable } from '@nestjs/common';
import { Token } from '../models/token.entity';
import { Repository } from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepository: Repository<Token>,
  ) {}

  findByToken(token: string) {
    return this.tokenRepository.findOne({
      id: token,
    });
  }

  async validateUser(token: string): Promise<any> {
    // Validate if token passed along with HTTP request
    // is associated with any registered account in the database
    return await this.findByToken(token);
  }
}
