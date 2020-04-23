import { Controller, Post, Body, Logger, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { Student } from '../entity/student.entity';
import { StudentTargets } from 'src/entity/student-target.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/entity/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('student')
@UseGuards(AuthGuard('jwt'))
export class StudentController {
    private logger = new Logger('StudentController');
    constructor(private studentService: StudentService) {}

    @Get('/:id')
    getStudentById(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<Student> {
        return this.studentService.getStudentById(id);
    }

    @Post()
    createStudent(
        @Body() createStudentDto: CreateStudentDto,
        @GetUser() user: User,
    ): Promise<Student> {
        this.logger.verbose(`Creating a new student. Data: ${JSON.stringify(createStudentDto)}`);
        
        return this.studentService.createStudent(createStudentDto, user);
    }


}
