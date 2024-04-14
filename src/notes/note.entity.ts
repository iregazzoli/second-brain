import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('simple-array')
  tags: string[];

  @Column('text')
  content: string;

  @ManyToOne(() => User, user => user.notes)
  user: User;
}