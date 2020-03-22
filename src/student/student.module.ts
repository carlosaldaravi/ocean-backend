import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentRepository } from './student.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([StudentRepository]),
  ],
  controllers: [StudentController],
  providers: [StudentService]
})
export class StudentModule {}
