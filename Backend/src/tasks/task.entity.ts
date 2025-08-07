import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ default: 'todo' })
  status: string;

  @ManyToOne(() => User, (user) => user.tasks)
  assignee: User;

  @ManyToOne(() => User)
  createdBy: User;
}