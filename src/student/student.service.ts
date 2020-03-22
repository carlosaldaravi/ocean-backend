import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentRepository } from './student.repository';
import { CreateStudentDto } from './dto/create-student.dto';
import { Student } from './student.entity';

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
