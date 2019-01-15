import { IsString } from 'class-validator';
import { Exclude } from 'class-transformer';

export class CreateUserDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly password: string;
}
