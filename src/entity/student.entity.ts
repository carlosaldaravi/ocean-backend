import { Entity, Column, ManyToMany, JoinTable, OneToOne, JoinColumn, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';
import { StudentSize } from '../student/student-size.enum';
import { User } from 'src/entity/user.entity';
import { Target } from './target.entity';

@Entity()
export class Student extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;
  
  @Column()
  lastName: string;
  
  @Column()
  phone: string;
  
  @Column({ nullable: true })
  availability: string;
  
  @Column({ nullable: true, default: null })
  dateBorn: Date;
  
  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  size: StudentSize;

  @Column({ nullable: true })
  knownWay: string;

  @OneToOne(type => User, { eager: true })
  @JoinColumn({ name: "userId" })
  user: User;

  @ManyToMany(type => Target, { eager: true, cascade: true })
  @JoinTable({ name: "student_target" })
  targets: Target[];


}