import axios from 'axios';
  
const GOT_STUDENTS = 'GOT_STUDENTS'
const GOT_STUDENT = 'GOT_STUDENT'
const REMOVED_STUDENT = 'REMOVED_STUDENT'

export function gotStudents(students) {
    return {
        type: GOT_STUDENTS,
        students
    }
}

export function fetchStudents() {
    return function thunk (dispatch) {
        return axios.get('/api/students')
        .then(res => res.data)
        .then(students => {
            dispatch(gotStudents(students))
        })
    }
}


//action-creator
export function gotStudent (student) {
    const action = {type: GOT_STUDENT, student}
    return action
}

//thunk creator
export function createStudent(formData, history){
    return function thunk (dispatch) {
        axios.post('/api/students', formData)
        .then(res => res.data)
        .then(student => {
            dispatch(gotStudent(student))
            history.push(`/students/${student.id}`)
        })
    }
}

export function updateStudent(formData, history){
    return function thunk (dispatch) {
        axios.put('/api/students/:studentId', formData)
        .then(res => res.data)
        .then(updatedStudent => {
            dispatch(gotStudent(updatedStudent))
            if (history) history.push(`/students/${updatedStudent.id}`)
        })
    }
}


export function students (students = [], action) {
    switch (action.type) {
        case GOT_STUDENTS: 
            return [...students, ...action.students]

        case GOT_STUDENT:
            const updatedStudentId = action.student.id
            const student = students.filter(student => student.id === updatedStudentId)
            const i = students.indexOf(student[0])

            if (i < 0) return [...students, action.student]
            return students.map( (student, index) => {
                if(index !== i) return student
                else return action.student
            })
        
        case REMOVED_STUDENT:
            return students.filter(student => student.id !== action.studentId)
            
        default:
            return students
    }
}

export function removedStudent(studentId){
    return {
        type: REMOVED_STUDENT,
        studentId
    }
}

export function deleteStudent(studentId){
    return function thunk (dispatch){
        axios.delete(`/api/students/${studentId}`)
        .then(res => res.data)
        .then(student => {
            console.log(student)
            dispatch(removedStudent(studentId))
        })
    }
}

