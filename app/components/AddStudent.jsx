import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import StudentInfoForm from './StudentInfoForm'

export function AddStudent(props) {
        return (
        <div>
            <h1>ADD NEW STUDENT</h1>
            <StudentInfoForm />
        </div>
    )
}

function mapStateToProps (state, ownProps){
    return {
        campuses: state.campuses
    }
}

const AddStudentContainer = withRouter(connect(mapStateToProps)(AddStudent))

export default AddStudentContainer
