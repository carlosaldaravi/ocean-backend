import { EntityRepository, Repository } from "typeorm";
import { Target } from "../entity/target.entity";
import { Logger, NotFoundException, InternalServerErrorException } from "@nestjs/common";
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
        try {
            let student = await Student.findOne({ id: studentId })
            let target = await Target.findOne({ id: targetId })
            let studentTarget = await StudentTarget.findOne({ student, target })

            if(!studentTarget) {
                throw new NotFoundException(`Not found`);
            }

            return studentTarget;
        } catch (error) {
            this.logger.error(`Not found`, error.stack);
            return new StudentTarget();
        }
    }

    async createStudentsTargets(
        students: any,
        user: User
    ): Promise<any> {
        try {
            let instructor = await Instructor.findOne({ where: { userId: user.id }})
            
            students.forEach( async (s) => {
                let student = await Student.findOne({ id: s.studentId });
                let targets = s.targetId;
                targets.forEach( async (t) => {
                    let studentTarget = new StudentTarget();
                    studentTarget.studentId = student.id;
                    studentTarget.targetId = t;
                    studentTarget.validatedBy = instructor.id;
                    studentTarget.feedback = '';
                    await studentTarget.save();
                });
            });
            return { status: 200 };
        } catch (error) {
            console.log(error);
        }
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
            throw new InternalServerErrorException('Create failed');
        }

       return studentTarget;
    }

    async getStudentTargetsDoneByStudent(studentId: number): Promise<Target[]> {
        try {
            // const studentTargets = await StudentTarget.find({ where: { studentId }});
            const targets = await Target
                .createQueryBuilder("target")
                .where((qb) => {
                    const subQuery = qb.subQuery()
                                        .select()
                                        .from(StudentTarget, "student_target")
                                        .where(`student_target.targetId = target.id`)
                                        .andWhere(`student_target.studentId = ${studentId}`)
                                        .getQuery();
                    return "EXISTS " + subQuery;
                })
                .getMany();
            
            if(!targets) {
                throw new NotFoundException(`Not found`);
            }

            return targets;
        } catch (error) {
            console.log(error);
        }
    }
    
    async getStudentTargetsNotDoneByStudent(studentId: number): Promise<Target[]> {
        try {
            const targets = await Target
                .createQueryBuilder("target")
                .where((qb) => {
                    const subQuery = qb.subQuery()
                                        .select()
                                        .from(StudentTarget, "student_target")
                                        .where(`student_target.targetId = target.id`)
                                        .andWhere(`student_target.studentId = ${studentId}`)
                                        .getQuery();
                    return "NOT EXISTS " + subQuery;
                })
                .getMany();
            
            if(!targets) {
                throw new NotFoundException(`Not found`);
            }

            return targets;
        } catch (error) {
            console.log(error);
        }
    }

}