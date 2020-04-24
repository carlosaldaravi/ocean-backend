import { Controller, Post, Body, Logger, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { StudentTargetService } from './student-target.service';
import { StudentTarget } from 'src/entity/student-target.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/entity/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { CreateStudentTargetDto } from './dto/create-student-target.dto';

@Controller('student-target')
@UseGuards(AuthGuard('jwt'))
export class StudentTargetController {
    private logger = new Logger('StudentsController');
    constructor(private studentTargetService: StudentTargetService) {}

    @Get('/done/:studentId')
    async getStudentTargetsDoneByStudent(
        @Param('studentId', ParseIntPipe) studentId: number
    ): Promise<StudentTarget[]> {
        return this.studentTargetService.getStudentTargetsDoneByStudent(studentId);
    }

    @Get('/:studentId/:targetId')
    getStudentTargetById(
        @Param('studentId', ParseIntPipe) studentId: number,
        @Param('targetId', ParseIntPipe) targetId: number
    ): Promise<StudentTarget> {
        return this.studentTargetService.getStudentTargetById(studentId, targetId);
    }

    @Post()
    createStudentTarget(
        @Body() createStudentTargetDto: CreateStudentTargetDto,
        @GetUser() user: User,
    ): Promise<StudentTarget> {
        this.logger.verbose(`Creating a new student target. Data: ${JSON.stringify(createStudentTargetDto)}`);
        
        return this.studentTargetService.createStudentTarget(createStudentTargetDto, user);
    }

}
