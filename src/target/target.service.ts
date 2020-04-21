import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Target } from './target.entity';
import { TargetRepository } from './target.repository';
import { Student } from 'src/student/student.entity';

@Injectable()
export class TargetService {
    constructor(
        @InjectRepository(TargetRepository)
        private targetRepository: TargetRepository,
    ) {}

    async getTargets(): Promise<Target[]> {
        return this.targetRepository.getTargets();
    }
    
    async getTargetById(id): Promise<Target> {
        return this.targetRepository.getTargetById(id);
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
