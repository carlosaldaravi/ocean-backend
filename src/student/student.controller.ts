import { Controller, Post, UsePipes, ValidationPipe, Body, Logger, Get, Patch, Param, ParseIntPipe } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { Student } from '../entity/student.entity';
import { StudentTargets } from 'src/entity/student-target.entity';
import { GetStudent } from '../decorators/get-student.decorator';

@Controller('student')
export class StudentController {
    private logger = new Logger('StudentController');
    constructor(private studentService: StudentService) {}

    @Get()
    getStudent() {
        return "This is the student";
    }

    @Post()
    @UsePipes(ValidationPipe)
    createStudent(
        @Body() createStudentDto: CreateStudentDto,
    ): Promise<Student> {
        this.logger.verbose(`Creating a new student. Data: ${JSON.stringify(createStudentDto)}`);
        return this.studentService.createStudent(createStudentDto);
    }


}
