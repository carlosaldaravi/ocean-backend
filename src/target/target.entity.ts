import { Entity, Column, BaseEntity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { StudentTarget } from 'src/student/relationships/student-target.entity';

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

    @OneToMany(type => StudentTarget, studentTarget => studentTarget.target)
    public studentTarget!: StudentTarget

}