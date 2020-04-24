import { getConnection } from 'typeorm';
import { students_DB_DATA } from './students';
import { targets_DB_DATA } from './targets';
import { users_DB_DATA } from './users';
import { Student } from 'src/entity/student.entity';
import { Target } from 'src/entity/target.entity';
import { StudentSize } from 'src/student/student-size.enum';
import * as bcrypt from 'bcryptjs'
import { User } from 'src/entity/user.entity';
import { Instructor } from 'src/entity/instructor.entity';
import { StudentTarget } from 'src/entity/student-target.entity';


// insert data base examples

export const setDefaultValues = async () => {
    let instructor: Instructor = new Instructor();
    let student: Student = new Student();
    let target: Target = new Target();
    
    try {
        // Targets
        let targets:Target[] = [];

        if(await Target.count() == 0) {
            console.log('Adding targets...');
            
            await getConnection()
            .createQueryBuilder()
            .insert()
            .into("target")
            .values(targets_DB_DATA)
            .execute(); 
        }

        // Users {
        if(await User.count() == 0) {
            console.log('Adding users..');
            let user1: User = new User();
            let user2: User = new User();
            let user3: User = new User();

            user1.email = "carlos@gmail.com";
            user1.salt = await bcrypt.genSalt();
            user1.password = await bcrypt.hash('1234', user1.salt);
            user1.admin = true;
            user1.save();
            
            user2.email = "instructor@gmail.com";
            user2.salt = await bcrypt.genSalt();
            user2.password = await bcrypt.hash('1234', user2.salt);
            user2.save();

            user3.email = "alumno@gmail.com";
            user3.salt = await bcrypt.genSalt();
            user3.password = await bcrypt.hash('1234', user2.salt);
            user3.save();

            await getConnection()
            .createQueryBuilder()
            .insert()
            .into("user")
            .values(users_DB_DATA)
            .execute(); 
        }

        // Instructor
        if(await Instructor.count() == 0) {
            console.log('Adding instructors...');

            instructor.userId = 2;
            instructor.firstName = "Carlos";
            instructor.lastName = "Aldaravi";
            instructor.phone = "653642915";
            // instructor.dateBorn = new Date("17-06-1987");
            instructor.availability = null;
            instructor.city = 'Santa Pola';
            
            // targets_DB_DATA.forEach( target => targets.push(new Target(target)));
            await instructor.save();

        }

        // Students
        if(await Student.count() == 0) {
            console.log('Adding students...');

            student.userId = 3;
            student.firstName = "Carmen";
            student.lastName = "Rico";
            student.phone = "696969696";
            student.size = StudentSize.M;
            // student.dateBorn = new Date("21-10-1998");
            student.availability = null;
            student.city = 'Petrer';
            student.knownWay = null;
            
            // targets_DB_DATA.forEach( target => targets.push(new Target(target)));
            // let target = await Target.findOne({ id: 1});
            // let target2 = await Target.findOne({ id: 2});
            // student.targets = [ target, target2 ];
            await student.save();

            // await getConnection()
            // .createQueryBuilder()
            // .insert()
            // .into("student")
            // .values(students_DB_DATA)
            // .execute();
        }
        
        // Validate student targets by instructor
        // if(await StudentTarget.count() != 0) {
        //     console.log('Validating targets...');
            
        //     let StudentTarget = new StudentTarget();
        //     StudentTarget = await StudentTarget.findOne({ studentId: 1, targetId: 1 });
        //     let instructor = await Instructor.findOne({ id: 1 });

        //     if(StudentTarget) {
        //         StudentTarget.validatedBy = instructor;
        //         await StudentTarget.save();
        //     }

        //     // await getConnection()
        //     // .createQueryBuilder()
        //     // .insert()
        //     // .into("student")
        //     // .values(students_DB_DATA)
        //     // .execute();
        // }

    } catch (error) {
        console.log('Error setting default values', error);
    }      
};