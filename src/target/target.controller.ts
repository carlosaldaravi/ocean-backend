import { Controller, Logger, Get, Param, ParseIntPipe, Patch, Body } from '@nestjs/common';
import { TargetService } from './target.service';
import { Target } from '../entity/target.entity';
import { GetStudent } from 'src/decorators/get-student.decorator';
import { Student } from 'src/entity/student.entity';
import { StudentTargets } from 'src/entity/student-target.entity';

@Controller('target')
export class TargetController {

    private logger = new Logger('TargetController');
    constructor(private targetService: TargetService) {}

    @Get()
    getTargets() {
        return this.targetService.getTargets();
    }
    
    @Get('/:id')
    getTargetById(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<Target> {
        return this.targetService.getTargetById(id);
    }

    @Patch('/:id/feedback')
    setStudentTargetFeedback(
        @Param('id', ParseIntPipe) id: number,
        @Body('feedback') feedback: string,
        @GetStudent() student: Student,
      ): Promise<StudentTargets> {
        return this.targetService.setStudentTargetFeedback(id, feedback, student);
    }
}