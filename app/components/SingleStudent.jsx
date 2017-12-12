import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'

export function SingleStudent (props) {
    const studentId = Number(props.match.params.studentId);
    const selectedStudent = props.students.filter(student => student.id === studentId)[0]

    const myCampus = props.campuses.filter(campus => campus.id === selectedStudent.campusId)[0]
    
    return (
        <div>
            <h3>{selectedStudent && selectedStudent.name}</h3>
            <p>GPA: <span>{selectedStudent && selectedStudent.gpa}</span></p>
            <p>Email: <span>{selectedStudent && selectedStudent.email}</span></p>
            <p>Campus: <span>{myCampus && selectedStudent &&
                <Link to={`/campuses/${myCampus && myCampus.id}`}>{myCampus && myCampus.name}</Link>}</span></p>

            <button id="update"><Link to={`/students/updatestudent/${selectedStudent && selectedStudent.id}`}>UPDATE STUDENT</Link></button>
        </div>
    ) 
}

function mapStateToProps (state, ownProps) {
    return {
        students: state.students,
        campuses: state.campuses
    }
}

const SingleStudentContainer = withRouter(connect(mapStateToProps)(SingleStudent))

export default SingleStudentContainer

