import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Target } from '../entity/target.entity';
import { TargetRepository } from './target.repository';

@Injectable()
export class TargetService {
    constructor(
        @InjectRepository(TargetRepository)
        private targetRepository: TargetRepository,
    ) {}

    async getTargets(): Promise<Target[]> {
        return this.targetRepository.getTargets();
    }

    async getTargetById(
        id: number,
    ): Promise<Target> {
    const found = await this.targetRepository.findOne({ id });

    if (!found) {
        throw new NotFoundException(`Target with ID "${id}" not found`);
    }

    return found;
    }

}
