import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, BaseEntity, JoinColumn, PrimaryColumn, OneToOne } from "typeorm";
import { Student } from "./student.entity";
import { Target } from "./target.entity";
import { Instructor } from "./instructor.entity";

@Entity()
export class StudentTargets extends BaseEntity {
    @PrimaryColumn()
    studentId!: number;

    @PrimaryColumn()
    targetId!: number;

    @Column('timestamp with time zone', { nullable: false, default: () => 'CURRENT_TIMESTAMP' })
    date!: Date;

    @Column({ nullable: true, default: '' })
    feedback: string;
    
    @Column({ nullable: true })
    validatedBy!: Instructor;

    @ManyToOne(type => Student, { primary: true })
    @JoinColumn({ name: 'studentId' })
    student!: Student;
    
    @ManyToOne(type => Target, { primary: true })
    @JoinColumn({ name: 'targetId' })
    target!: Target;
    
    @ManyToOne(type => Instructor, { eager: true })
    @JoinColumn({ name: 'validatedBy' })
    instructor!: Instructor;
}