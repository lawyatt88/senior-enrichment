import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import {connect} from 'react-redux'

import { withRouter } from 'react-router';

function StudentsList (props) {
    const enrolledStudents = props.students.filter(student => student.campusId !== null)
    return (
        <div>
         <ul>
            {enrolledStudents.map(student => {
                return (
                    <li key={student.id}>
                        <Link to={`/students/${student.id}`}>{student.name}</Link>
                    </li>
                )
            })}
        </ul>

        <Link to="/students/addstudent">ADD NEW STUDENT</Link>
        </div>
    )    
}

const mapStateToProps = (state) => {
    return {
        students: state.students
    }
}


const StudentsListContainer = withRouter(connect(mapStateToProps)(StudentsList))

export default StudentsListContainer
