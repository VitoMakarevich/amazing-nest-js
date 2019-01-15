import { Entity, PrimaryColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/models/user.entity';

@Entity()
export class Token {
  @PrimaryColumn()
  id: string;

  @ManyToOne(type => User, {
    onDelete: 'CASCADE',
  })
  user: number;
}
