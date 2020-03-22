import { Entity, Column } from 'typeorm';
import { StudentSize } from './student-size.enum';
import { User } from 'src/auth/user.entity';

@Entity()
export class Student extends User {

  @Column({ nullable: true })
  size: StudentSize;

  @Column({ nullable: true })
  knownWay: string;

}