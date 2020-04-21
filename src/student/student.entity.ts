import { Entity, Column, OneToMany } from 'typeorm';
import { StudentSize } from './student-size.enum';
import { User } from 'src/auth/user.entity';
import { StudentTarget } from './relationships/student-target.entity';

@Entity()
export class Student extends User {

  @Column({ nullable: true })
  size: StudentSize;

  @Column({ nullable: true })
  knownWay: string;

  @OneToMany(type => StudentTarget, studentTarget => studentTarget.student)
  public studentTarget!: StudentTarget[];


}