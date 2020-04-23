import { Module } from '@nestjs/common';
import { StudentTargetController } from './student-target.controller';
import { StudentTargetService } from './student-target.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentTargetRepository } from './student-target.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([StudentTargetRepository]),
  ],
  controllers: [StudentTargetController],
  providers: [StudentTargetService]
})
export class StudentTargetModule {}
