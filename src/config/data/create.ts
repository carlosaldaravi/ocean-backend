import { getConnection } from 'typeorm';
import { CreateStudentDto } from '../../student/dto/create-student.dto';
import { students_DB_DATA } from './students';
import { targets_DB_DATA } from './targets';
import { Student } from 'src/entity/student.entity';
import { Target } from 'src/entity/target.entity';
import { StudentSize } from 'src/student/student-size.enum';
import { StudentTargets } from 'src/entity/student-target.entity';
import * as bcrypt from 'bcryptjs'


// insert data base examples

export const setDefaultValues = async () => {
    let student: Student = new Student();
    let target: Target = new Target();
    console.log('setDefaultValues');
    
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

        // Students
        if(await Student.count() == 0) {
            console.log('Adding students...');
            
            student.email = "prueba1@gmail.com";
            student.salt = await bcrypt.genSalt();
            student.password = await bcrypt.hash('1234', student.salt);
            student.firstName = "Carlos";
            student.lastName = "Aldaravi";
            student.phone = "653642915";
            student.size = StudentSize.M;
            student.dateBorn = new Date("02-06-1995");
            student.disponibilidad = null;
            student.city = 'Santa Pola';
            student.knownWay = null;
            
            // targets_DB_DATA.forEach( target => targets.push(new Target(target)));
            let target = await Target.findOne({ id: 1});
            let target2 = await Target.findOne({ id: 2});
            student.targets = [ target, target2 ];

            console.log(student);

            await student.save();

            await getConnection()
            .createQueryBuilder()
            .insert()
            .into("student")
            .values(students_DB_DATA)
            .execute(); 
        }

    } catch (error) {
        console.log('Error setting default values', error);
    }      
};