import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InstructorRepository } from './instructor.repository';
import { CreateInstructorDto } from './dto/create-instructor.dto';
import { Instructor } from '../entity/instructor.entity';

@Injectable()
export class InstructorService {
    constructor(
        @InjectRepository(InstructorRepository)
        private instructorRepository: InstructorRepository,
    ) {}

    async createInstructor(
        createInstructorDto: CreateInstructorDto,
    ): Promise<Instructor> {
        return this.instructorRepository.createInstructor(createInstructorDto);
    }

}
