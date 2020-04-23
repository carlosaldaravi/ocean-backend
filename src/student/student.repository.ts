import { EntityRepository, Repository } from "typeorm";
import { Student } from "../entity/student.entity";
import { Logger, InternalServerErrorException, ConflictException } from "@nestjs/common";
import { CreateStudentDto } from "./dto/create-student.dto";
import { AuthCredentialsDto } from "src/auth/dto/auth-credentials.dto";
import * as bcrypt from 'bcryptjs';

@EntityRepository(Student)
export class StudentRepository extends Repository<Student> {
    private logger = new Logger('StudentRepository');

    async createStudent(
        createStudentDto: CreateStudentDto,
    ): Promise<Student> {
        const { email, password, firstName, lastName, phone, size, dateBorn } = createStudentDto;

        const student = new Student();
        student.email = email;
        student.salt = await bcrypt.genSalt();
        student.password = await this.hashPassword(password, student.salt);
        student.firstName = firstName;
        student.lastName = lastName;
        student.phone = phone;
        student.size = size;
        student.dateBorn = dateBorn;

        try {
            await student.save();
        } catch (error) {
            if (error.code === '23505') { // duplicate email
                throw new ConflictException('email already exists');
            } else {
                this.logger.error(`Failed to create a student. Data: ${createStudentDto}`, error.stack);
                throw new InternalServerErrorException();
            }
        }

        delete student.password;
        delete student.salt;

        return student;
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }
}