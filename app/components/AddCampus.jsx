import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import CampusInfoForm from './CampusInfoForm'

export function AddCampus (props) {
    return (
        <div>
            <h1>ADD NEW CAMPUS</h1>
            <CampusInfoForm />
        </div>
    )
}

function mapStateToProps (state){
    return {
        campuses: state.campuses
    }
}

const AddCampusContainer = withRouter(connect(mapStateToProps)(AddCampus))

export default AddCampusContainer
