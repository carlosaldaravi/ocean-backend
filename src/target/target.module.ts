import { Module } from '@nestjs/common';
import { TargetController } from './target.controller';
import { TargetService } from './target.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { TargetRepository } from './target.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([TargetRepository]),
    AuthModule,
  ],
  controllers: [TargetController],
  providers: [TargetService]
})
export class TargetModule {}