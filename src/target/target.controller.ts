import { Controller, Logger, Get, Param, ParseIntPipe, Patch, Body, UseGuards } from '@nestjs/common';
import { TargetService } from './target.service';
import { Target } from '../entity/target.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { Student } from 'src/entity/student.entity';
import { StudentTargets } from 'src/entity/student-target.entity';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/entity/user.entity';

@Controller('target')
@UseGuards(AuthGuard('jwt'))
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
        @Param('id', ParseIntPipe) targetId: number,
        @Body() body:any,
        @GetUser() user: User,
    ): Promise<StudentTargets> {
        console.log('userId: ', body.userId);
        console.log('feedback: ', body.feedback);
        
        return this.targetService.setStudentTargetFeedback(targetId, body.userId, body.feedback);
    }
}