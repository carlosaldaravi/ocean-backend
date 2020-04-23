import { Module } from '@nestjs/common';
import { InstructorController } from './instructor.controller';
import { InstructorService } from './instructor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstructorRepository } from './instructor.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([InstructorRepository]),
  ],
  controllers: [InstructorController],
  providers: [InstructorService]
})
export class InstructorModule {}
