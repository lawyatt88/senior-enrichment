import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import StudentInfoForm from './StudentInfoForm'
import { deleteStudent } from '../store'

function UpdateStudent (props) { 
        const studentId = Number(props.match.params.studentId)
        const currentStudent = props.students.filter(student => student.id === studentId)[0]
        console.log(props)
        if (currentStudent) {
            return (
            <div>
                <h1>UPDATE: <span>{currentStudent && currentStudent.name}</span></h1>
                <StudentInfoForm />
                <button id="delete" onClick={() => props.handleClick(currentStudent)}>DELETE STUDENT</button>
            </div>
        )}
        else {return <h5>Student has been deleted!</h5>}
}

function mapStateToProps (state){
    return {
        students: state.students
    }
}

function mapDispatchToProps(dispatch){
    return {
        handleClick(currentStudent){
            console.log(currentStudent)
            const action = deleteStudent(currentStudent.id)
            dispatch(action)
        }
    }
}


const UpdateStudentContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(UpdateStudent))

export default UpdateStudentContainer
