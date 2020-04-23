import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { StudentModule } from './student/student.module';
import { TargetModule } from './target/target.module';
import { InstructorModule } from './instructor/instructor.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    StudentModule,
    TargetModule,
    InstructorModule,
  ],
})
export class AppModule {}
