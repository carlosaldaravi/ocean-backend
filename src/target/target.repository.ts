import { EntityRepository, Repository } from "typeorm";
import { Target } from "../entity/target.entity";
import { Logger } from "@nestjs/common";

@EntityRepository(Target)
export class TargetRepository extends Repository<Target> {
    private logger = new Logger('TargetRepository');
    
    async getTargets(): Promise<Target[]> {
        return await Target.find();
    }

    async getTargetById(id: number): Promise<Target> {
        return await Target.findOne({ id });
    }

}