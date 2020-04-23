import { Controller, Logger, Get, Param, ParseIntPipe, Patch, Body, UseGuards } from '@nestjs/common';
import { TargetService } from './target.service';
import { Target } from '../entity/target.entity';
import { AuthGuard } from '@nestjs/passport';

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

}