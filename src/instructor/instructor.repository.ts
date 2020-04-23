import { EntityRepository, Repository } from "typeorm";
import { Instructor } from "../entity/instructor.entity";
import { Logger, InternalServerErrorException, ConflictException } from "@nestjs/common";
import { CreateInstructorDto } from "./dto/create-instructor.dto";
import { AuthCredentialsDto } from "src/auth/dto/auth-credentials.dto";
import * as bcrypt from 'bcryptjs';
import { User } from "src/entity/user.entity";

@EntityRepository(Instructor)
export class InstructorRepository extends Repository<Instructor> {
    private logger = new Logger('InstructorRepository');

    async createInstructor(
        createInstructorDto: CreateInstructorDto,
    ): Promise<Instructor> {
        const { firstName, lastName, phone, dateBorn } = createInstructorDto;

        const instructor = new Instructor();
        instructor.firstName = firstName;
        instructor.lastName = lastName;
        instructor.phone = phone;
        instructor.dateBorn = dateBorn;

        try {
            await instructor.save();
        } catch (error) {
            if (error.code === '23505') { // duplicate email
                throw new ConflictException('email already exists');
            } else {
                this.logger.error(`Failed to create a instructor. Data: ${createInstructorDto}`, error.stack);
                throw new InternalServerErrorException();
            }
        }

        return instructor;
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }
}