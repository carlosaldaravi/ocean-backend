import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentRepository } from './student.repository';
import { CreateStudentDto } from './dto/create-student.dto';
import { Student } from '../entity/student.entity';
import { StudentTargets } from 'src/entity/student-target.entity';

@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(StudentRepository)
        private studentRepository: StudentRepository,
    ) {}

    async createStudent(
        createStudentDto: CreateStudentDto,
    ): Promise<Student> {
        return this.studentRepository.createStudent(createStudentDto);
    }

}
