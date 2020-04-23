import { Entity, Column, BaseEntity, JoinColumn, OneToOne, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { User } from 'src/entity/user.entity';
import { StudentTargets } from './student-target.entity';

@Entity()
export class Instructor extends BaseEntity {

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
  
  @Column('timestamp with time zone', { nullable: true, default: null })
  dateBorn: Date;
  
  @Column({ nullable: true })
  city: string;

  @OneToOne(type => User)
  @JoinColumn()
  user: User;
  
  @OneToMany(type => StudentTargets, studentTargets => studentTargets.validatedBy, { eager: true })
  studentTargets: StudentTargets[];

}