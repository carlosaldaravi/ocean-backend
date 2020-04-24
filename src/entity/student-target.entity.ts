import { Entity, Column, ManyToOne, BaseEntity, JoinColumn } from "typeorm";
import { Student } from "./student.entity";
import { Target } from "./target.entity";
import { Instructor } from "./instructor.entity";

@Entity()
export class StudentTarget extends BaseEntity {

    @Column('timestamp with time zone', { nullable: false, default: () => 'CURRENT_TIMESTAMP' })
    date!: Date;

    @Column()
    feedback: string;

    @ManyToOne(type => Student, { eager: true, primary: true })
    @JoinColumn({ name: 'studentId' })
    student!: Student;
    
    @ManyToOne(type => Target, { primary: true, eager: true })
    @JoinColumn({ name: 'targetId' })
    target!: Target;
    
    @ManyToOne(type => Instructor)
    @JoinColumn({ name: 'validatedBy' })
    instructor!: Instructor;
}