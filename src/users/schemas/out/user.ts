import { Exclude } from 'class-transformer';

export class UserEntity {
  id: number;
  name: string;

  @Exclude()
  password: string;

  @Exclude()
  salt: string;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
