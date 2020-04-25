import { EntityRepository, Repository } from "typeorm";
import { Instructor } from "../entity/instructor.entity";
import { Logger, ConflictException, UnauthorizedException, NotFoundException } from "@nestjs/common";
import { CreateInstructorDto } from "./dto/create-instructor.dto";
import * as bcrypt from 'bcryptjs';
import { User } from "src/entity/user.entity";

@EntityRepository(Instructor)
export class InstructorRepository extends Repository<Instructor> {
    private logger = new Logger('InstructorRepository');

    async createInstructor(
        createInstructorDto: CreateInstructorDto,
        user: User,
    ): Promise<Instructor> {
        if(!user.admin) {
            throw new UnauthorizedException('Oops! Only admin can create instructors')
        }
        const { email, firstName, lastName, phone, dateBorn } = createInstructorDto;

        const instructor = new Instructor();
        
        
        instructor.firstName = firstName;
        instructor.lastName = lastName;
        instructor.phone = phone;
        instructor.dateBorn = dateBorn;

        try {
            let user = await User.findOne({ email });
            
            if(!user) {
                throw new NotFoundException('User not found');
            }
            
            instructor.user = user;
            await instructor.save();
            
            delete instructor.user.password;
            delete instructor.user.salt;
            delete instructor.user.admin;
            delete instructor.user.id;
            
            return instructor;
        } catch (error) {
            if (error.code === '23505') { // duplicate email
                throw new ConflictException('instructor already exists');
            } else {
                this.logger.error(`Failed to create a instructor. Data: ${createInstructorDto}`, error.stack);
                throw error;
            }
        }

    }

}