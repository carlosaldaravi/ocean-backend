import { Controller, Post, UsePipes, ValidationPipe, Body, Logger, Get, Patch, Param, ParseIntPipe } from '@nestjs/common';
import { InstructorService } from './instructor.service';
import { CreateInstructorDto } from './dto/create-instructor.dto';
import { Instructor } from '../entity/instructor.entity';

@Controller('instructor')
export class InstructorController {
    private logger = new Logger('InstructorController');
    constructor(private instructorService: InstructorService) {}

    @Post()
    @UsePipes(ValidationPipe)
    createInstructor(
        @Body() createInstructorDto: CreateInstructorDto,
    ): Promise<Instructor> {
        this.logger.verbose(`Creating a new instructor. Data: ${JSON.stringify(createInstructorDto)}`);
        return this.instructorService.createInstructor(createInstructorDto);
    }


}
