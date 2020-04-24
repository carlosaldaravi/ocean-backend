import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InstructorRepository } from './instructor.repository';
import { CreateInstructorDto } from './dto/create-instructor.dto';
import { Instructor } from '../entity/instructor.entity';
import { User } from 'src/entity/user.entity';

@Injectable()
export class InstructorService {
    constructor(
        @InjectRepository(InstructorRepository)
        private instructorRepository: InstructorRepository,
    ) {}

    async createInstructor(
        createInstructorDto: CreateInstructorDto,
        user: User
    ): Promise<Instructor> {
        return this.instructorRepository.createInstructor(createInstructorDto, user);
    }

}
