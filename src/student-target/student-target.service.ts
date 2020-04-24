import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { StudentTargetRepository } from './student-target.repository';
import { StudentTarget } from 'src/entity/student-target.entity';
import { CreateStudentTargetDto } from './dto/create-student-target.dto';
import { Target } from 'src/entity/target.entity';

@Injectable()
export class StudentTargetService {
    constructor(
        @InjectRepository(StudentTargetRepository)
        private studentTargetRepository: StudentTargetRepository,
    ) {}

    async getStudentTargets(): Promise<StudentTarget[]> {
        return this.studentTargetRepository.getStudentTargets();
    }

    async getStudentTargetById(
        studentId: number,
        targetId: number,
    ): Promise<StudentTarget> {
        return await this.studentTargetRepository.getStudentTargetById(studentId, targetId);
    }

    async createStudentTarget(
        createStudentTargetDto: CreateStudentTargetDto,
        user: User
    ): Promise<any> {
        return this.studentTargetRepository.createStudentTarget(createStudentTargetDto, user);
    }
    
    async createStudentsTargets(
        payload: any,
        user: User
    ): Promise<any> {
        return this.studentTargetRepository.createStudentsTargets(payload, user);
    }
    
    // async getStudentTargetsByLevel(level): Promise<StudentTarget[]> {
    //     return this.studentTargetRepository.getStudentTargetsByLevel(level);
    // }
    
    async getStudentTargetsDoneByStudent(studentId: number): Promise<Target[]> {
        return this.studentTargetRepository.getStudentTargetsDoneByStudent(studentId);
    }
    
    async getStudentTargetsNotDoneByStudent(studentId: number): Promise<Target[]> {
        return this.studentTargetRepository.getStudentTargetsNotDoneByStudent(studentId);
    }
    
    async setFeedback(
        studentId: number,
        targetId: number,
        feedback: string,
        user: User
    ): Promise<StudentTarget> {
        return this.studentTargetRepository.setFeedback(studentId, targetId, feedback, user);
    }
}
