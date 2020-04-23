import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Target } from '../entity/target.entity';
import { TargetRepository } from './target.repository';
import { Student } from 'src/entity/student.entity';
import { StudentTargets } from 'src/entity/student-target.entity';

@Injectable()
export class TargetService {
    constructor(
        @InjectRepository(TargetRepository)
        private targetRepository: TargetRepository,
    ) {}

    async getTargets(): Promise<Target[]> {
        return this.targetRepository.getTargets();
    }

    async getTargetById(
        id: number,
    ): Promise<Target> {
    const found = await this.targetRepository.findOne({ id });

    if (!found) {
        throw new NotFoundException(`Target with ID "${id}" not found`);
    }

    return found;
    }

    async getStudentTargetById(
        id: number,
        student: Student,
      ): Promise<StudentTargets> {
        const found = await StudentTargets.findOne({ where: { targetId: id, studentId: student.id } });
    
        if (!found) {
          throw new NotFoundException(`Student target with ID "${id}" not found`);
        }
    
        return found;
      }

    async setStudentTargetFeedback(
        id: number,
        feedback: string,
        student: Student,
    ): Promise<StudentTargets> {
        const studentTarget = await this.getStudentTargetById(id, student);
        studentTarget.feedback = feedback;
        await studentTarget.save();
        return studentTarget;
    }
    
    // async getTargetsByLevel(level): Promise<Target[]> {
    //     return this.targetRepository.getTargetsByLevel(level);
    // }
    
    // async getTargetsDoneByStudent(student: Student): Promise<Target[]> {
    //     return this.targetRepository.getTargetsDoneByStudent(student);
    // }
    
    // async getTargetsNotDoneByStudent(student: Student): Promise<Target[]> {
    //     return this.targetRepository.getTargetsNotDoneByStudent(student);
    // }
}
