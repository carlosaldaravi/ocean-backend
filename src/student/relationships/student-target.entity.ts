import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Student } from "../student.entity";
import { Target } from "../../target/target.entity";

@Entity()
export class StudentTarget {
    @PrimaryGeneratedColumn()
    public postToCategoryId!: number;

    @Column()
    public postId!: number;

    @Column()
    public categoryId!: number;

    @Column()
    public order!: number;

    @ManyToOne(type => Student, student => student.studentTarget)
    public student!: Student;

    @ManyToOne(type => Target, target => target.studentTarget)
    public target!: Target;
}