import { Entity, Column, PrimaryGeneratedColumn, AfterInsert, InsertEvent, BeforeInsert } from 'typeorm';
import { Inject, Optional } from '@nestjs/common';
import { ELASTIC_CONNECTION } from '../../app.providers';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name: string;

  @Column({
    select: false,
  })
  password: string;

  @Column({
    nullable: true,
  })
  description?: string

  @Column()
  salt: string;
}
