import { EntityRepository, Repository } from "typeorm";
import { Student } from "../entity/student.entity";
import { Logger, ConflictException } from "@nestjs/common";
import { CreateStudentDto } from "./dto/create-student.dto";
import * as bcrypt from 'bcryptjs';
import { User } from "src/entity/user.entity";
import { Instructor } from "src/entity/instructor.entity";

@EntityRepository(Student)
export class StudentRepository extends Repository<Student> {
    private logger = new Logger('StudentRepository');

    async createStudent(
        createStudentDto: CreateStudentDto,
        user: User,
    ): Promise<Student> {
        const { firstName, lastName, phone, size, dateBorn } = createStudentDto;

        const student = new Student();
        
        student.user = user;
        student.firstName = firstName;
        student.lastName = lastName;
        student.phone = phone;
        student.size = size;
        student.dateBorn = dateBorn;

        try {
            let instructor = await Instructor.findOne({ userId: user.id })

            if(instructor) {
                throw new ConflictException('Are you crazy? You are instructor, you cant be student');
            }
            
            await student.save();
            
            delete student.user.password;
            delete student.user.salt;
            delete student.user.admin;
            delete student.user.id;

            return student;
        } catch (error) {
            if (error.code === '23505') { // duplicate email
                throw new ConflictException('student already exists');
            } else {
                this.logger.error(`Failed to create a student. Data: ${createStudentDto}`, error.stack);
                throw error;
            }
        }

    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }
}