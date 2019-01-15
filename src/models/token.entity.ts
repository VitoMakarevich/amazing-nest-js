import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Token {
  @PrimaryColumn()
  id: string;

  @ManyToOne(type => User, {
    cascade: true,
  })
  user: number;
}
