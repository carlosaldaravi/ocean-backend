import { Entity, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { StudentSize } from '../student/student-size.enum';
import { User } from 'src/entity/user.entity';
import { StudentTargets } from './student-target.entity';
import { Target } from './target.entity';

@Entity()
export class Student extends User {

  @Column({ nullable: true })
  size: StudentSize;

  @Column({ nullable: true })
  knownWay: string;

  @ManyToMany(type => Target, { cascade: true })
  @JoinTable({ name: "student_targets" })
  targets: Target[];


}