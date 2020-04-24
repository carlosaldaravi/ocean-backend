import { Controller, Post, Body, Logger, UseGuards } from '@nestjs/common';
import { InstructorService } from './instructor.service';
import { CreateInstructorDto } from './dto/create-instructor.dto';
import { Instructor } from '../entity/instructor.entity';
import { User } from 'src/entity/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('instructor')
@UseGuards(AuthGuard('jwt'))
export class InstructorController {
    private logger = new Logger('InstructorController');
    constructor(private instructorService: InstructorService) {}

    @Post()
    createInstructor(
        @Body() createInstructorDto: CreateInstructorDto,
        @GetUser() user: User,
    ): Promise<Instructor> {
        this.logger.verbose(`Creating a new instructor. Data: ${JSON.stringify(createInstructorDto)}`);
        return this.instructorService.createInstructor(createInstructorDto, user);
    }

}
