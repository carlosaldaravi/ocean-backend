import { getConnection } from 'typeorm';
import { CreateStudentDto } from '../../student/dto/create-student.dto';
import { students_DB_DATA } from './students';
import { targets_DB_DATA } from './targets';


// insert data base examples

export async function createDataTesting() {
    try {
        // Students
        await getConnection()
        .createQueryBuilder()
        .insert()
        .into("student")
        .values(students_DB_DATA)
        .execute(); 

        // Targets
        await getConnection()
        .createQueryBuilder()
        .insert()
        .into("target")
        .values(targets_DB_DATA)
        .execute(); 
    } catch (error) {
        // console.log(error);
    }      
}