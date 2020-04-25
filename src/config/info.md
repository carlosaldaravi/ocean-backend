Tipo de usuario en el sistema:
- Administrador
- Student
- Intructor
- Normal

Funciones de cada usuario:
· Normal:
    - createStudent(createStudentDto, user)                             POST    /student

· Administrador
    - createInstructor(createInstructorDto, user)                       POST    /instructor
    - createCourse(student, instructor) -> SIN CREAR                    POST
    - 

· Instructor
    - createStudentTarget(createStudentTargetDto, user)                 POST    /student-target
    - createStudentsTargets(createStudentTargetDto, user)               POST    /student-target/all
    - setFeedback(studentId, targetId, body.feedback, user)             PATCH   /student-target/:studentId/:targetId

· Student
    -

· Administrador, Instructor and Student
    - updateProfile(user)  SIN CREAR
    - getStudentTargetsDoneByStudent(studentId)                         GET     /student-target/done/:studentId
    - getStudentTargetsNotDoneByStudent(studentId)                      GET     /student-target/notdone/:studentId
    - getStudentTargetById(studentId, targetId)                         GET     /student-target/:studentId/:targetId

EndPoints:
