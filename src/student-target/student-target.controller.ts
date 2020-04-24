import { Controller, Post, Body, Logger, Get, Param, ParseIntPipe, UseGuards, Patch } from '@nestjs/common';
import { StudentTargetService } from './student-target.service';
import { StudentTarget } from 'src/entity/student-target.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/entity/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { CreateStudentTargetDto } from './dto/create-student-target.dto';
import { Target } from 'src/entity/target.entity';

@Controller('student-target')
@UseGuards(AuthGuard('jwt'))
export class StudentTargetController {
    private logger = new Logger('StudentsController');
    constructor(private studentTargetService: StudentTargetService) {}

    @Get('/done/:studentId')
    async getStudentTargetsDoneByStudent(
        @Param('studentId', ParseIntPipe) studentId: number
    ): Promise<Target[]> {
        return this.studentTargetService.getStudentTargetsDoneByStudent(studentId);
    }
    
    @Get('/notdone/:studentId')
    async getStudentTargetsNotDoneByStudent(
        @Param('studentId', ParseIntPipe) studentId: number
    ): Promise<Target[]> {
        return this.studentTargetService.getStudentTargetsNotDoneByStudent(studentId);
    }

    @Get('/:studentId/:targetId')
    getStudentTargetById(
        @Param('studentId', ParseIntPipe) studentId: number,
        @Param('targetId', ParseIntPipe) targetId: number
    ): Promise<StudentTarget> {
        return this.studentTargetService.getStudentTargetById(studentId, targetId);
    }

    // Comprobar que el creador es instructor
    @Post()
    createStudentTarget(
        @Body() createStudentTargetDto: CreateStudentTargetDto,
        @GetUser() user: User,
    ): Promise<StudentTarget> {
        this.logger.verbose(`Creating a new student target. Data: ${JSON.stringify(createStudentTargetDto)}`);
        
        return this.studentTargetService.createStudentTarget(createStudentTargetDto, user);
    }
    
    // Comprobar que el creador es instructor
    @Post('/all')
    createStudentsTargets(
        @Body() payload: any,
        @GetUser() user: User,
    ): Promise<any> {
        this.logger.verbose(`Creating an array of students targets. Data: ${JSON.stringify(payload)}`);

        return this.studentTargetService.createStudentsTargets(payload, user);
    }
    
    // Comprobar que el instructor que hace el feedback es el creador
    @Patch('/:studentId/:targetId')
    setFeedback(
        @Param('studentId', ParseIntPipe) studentId: number,
        @Param('targetId', ParseIntPipe) targetId: number,
        @Body() body: any,
        @GetUser() user: User
    ): Promise<any> {
        this.logger.verbose(`Setting feedback. Data: ${JSON.stringify(body)}`);

        return this.studentTargetService.setFeedback(studentId, targetId, body.feedback, user);
    }

}
