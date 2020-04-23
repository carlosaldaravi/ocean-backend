import { EntityRepository, Repository } from "typeorm";
import { Student } from "../entity/student.entity";
import { Logger, InternalServerErrorException, ConflictException } from "@nestjs/common";
import { CreateStudentDto } from "./dto/create-student.dto";
import { AuthCredentialsDto } from "src/auth/dto/auth-credentials.dto";
import * as bcrypt from 'bcryptjs';
import { User } from "src/entity/user.entity";

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
            await student.save();
        } catch (error) {
            if (error.code === '23505') { // duplicate email
                throw new ConflictException('student already exists');
            } else {
                this.logger.error(`Failed to create a student. Data: ${createStudentDto}`, error.stack);
                throw new InternalServerErrorException();
            }
        }

        return student;
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }
}