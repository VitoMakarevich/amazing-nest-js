import { IsString } from 'class-validator';
import { Exclude } from 'class-transformer';
import {ApiModelProperty} from '@nestjs/swagger'

export class CreateUserDto {
  @IsString()
  @ApiModelProperty({
    required: true,
  })
  readonly name: string;

  @IsString()
  @ApiModelProperty({
    required: true,
  })
  readonly password: string;
}
