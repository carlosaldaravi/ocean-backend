import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentRepository } from './student.repository';
import { CreateStudentDto } from './dto/create-student.dto';
import { Student } from '../entity/student.entity';
import { User } from 'src/entity/user.entity';

@Injectable()
export class StudentService {
    constructor(
        @InjectRepository(StudentRepository)
        private studentRepository: StudentRepository,
    ) {}

    async getStudentById(
        id: number,
    ): Promise<Student> {
    const found = await this.studentRepository.findOne({id});

    if (!found) {
        throw new NotFoundException(`Student with ID "${id}" not found`);
    }
    delete found.user.password;
    delete found.user.salt;

    return found;
    }

    async createStudent(
        createStudentDto: CreateStudentDto,
        user: User
    ): Promise<Student> {
        return this.studentRepository.createStudent(createStudentDto, user);
    }

}
