import { Entity, Column, BaseEntity, OneToMany, PrimaryGeneratedColumn, JoinTable, ManyToMany } from 'typeorm';
import { StudentTarget } from 'src/entity/student-target.entity';
import { Student } from './student.entity';

@Entity()
export class Target extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    name: string;
    
    @Column()
    level: string;

    @Column()
    description: string;

    @ManyToMany(type => Student, { cascade: true })
    @JoinTable({ name: "student_target" })
    students: Student[];

    constructor(params?: { name: string, level: string, description: string }) {
        super();
        if(params){
            this.name = params.name;
            this.level = params.level;
            this.description = params.description;
        }
    }
}