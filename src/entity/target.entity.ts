import { Entity, Column, BaseEntity, OneToMany, PrimaryGeneratedColumn, JoinTable, ManyToMany } from 'typeorm';
import { StudentTargets } from 'src/entity/student-target.entity';
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

    constructor(params?: { name: string, level: string, description: string }) {
        super();
        if(params){
            this.name = params.name;
            this.level = params.level;
            this.description = params.description;
        }
    }
}