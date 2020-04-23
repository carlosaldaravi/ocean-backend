import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, BaseEntity, JoinColumn, PrimaryColumn, OneToOne } from "typeorm";
import { Student } from "./student.entity";
import { Target } from "./target.entity";

@Entity()
export class StudentTargets extends BaseEntity {
    @PrimaryColumn()
    studentId!: number;

    @PrimaryColumn()
    targetId!: number;

    @Column('timestamp with time zone', { nullable: false, default: () => 'CURRENT_TIMESTAMP' })  
    date: Date;

    @Column({ nullable: true, default: '' })
    feedback!: string;

    @ManyToOne(type => Student)
    @JoinColumn({ name: 'studentId' })
    student!: Student;
    
    @ManyToOne(type => Target)
    @JoinColumn({ name: 'targetId' })
    target!: Target;
}