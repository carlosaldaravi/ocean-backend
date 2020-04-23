import { EntityRepository, Repository } from "typeorm";
import { Target } from "../entity/target.entity";
import { Logger, NotFoundException } from "@nestjs/common";
import { Student } from "src/entity/student.entity";
import { User } from "src/entity/user.entity";
import { StudentTarget } from "src/entity/student-target.entity";
import { CreateStudentTargetDto } from "./dto/create-student-target.dto";
import { Instructor } from "src/entity/instructor.entity";

@EntityRepository(Target)
export class StudentTargetRepository extends Repository<StudentTarget> {
    private logger = new Logger('StudentTargetRepository');
    
    async getStudentTargets(): Promise<StudentTarget[]> {
        return await StudentTarget.find();
    }

    async getStudentTargetById(
        studentId: number,
        targetId: number,
    ): Promise<StudentTarget> {
        let student = await Student.findOne({ id: studentId })
        let target = await Target.findOne({ id: targetId })
        return await StudentTarget.findOne({ student, target });
    }

    async createStudentTarget(
        createStudentTargetDto: CreateStudentTargetDto,
        user: User
    ): Promise<StudentTarget> {

        const { studentId, targetId, feedback } = createStudentTargetDto;
        const studentTarget = new StudentTarget();

        try {
                
            let student = await Student.findOne({ id: studentId })
            let target = await Target.findOne({ id: targetId })
            let instructor = await Instructor.findOne({ where: { userId: user.id }})
            
            if(!student || !target) {
                throw new NotFoundException(`Not found`);
            }
            
            studentTarget.student = student;
            studentTarget.target = target;
            studentTarget.instructor = instructor;
            studentTarget.feedback = feedback;

            await studentTarget.save();
        } catch(error) {
            console.log(error);
        }

       return studentTarget;
    }

}