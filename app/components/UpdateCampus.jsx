import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import CampusInfoForm from './CampusInfoForm'
import UpdateEnrolledStudents from './UpdateEnrolledStudents'
import AddStudent from './AddStudent'
import { deleteCampus } from '../store'

function UpdateCampus (props) { 
    const campusId = Number(props.match.params.campusId)
    const currentCampus = props.campuses.filter(campus => campus.id === campusId)[0]
    console.log(props)
    if (props && !currentCampus) {return <h5>Campus has been deleted!</h5>}
        return (
            <div>
                <h1 className="update-title">UPDATE: <span>{currentCampus && currentCampus.name}</span></h1>
                <button id="delete" onClick={() => props.handleClick(currentCampus)}>DELETE CAMPUS</button>
                
                <div className="row">
                    <div className="col-3">
                        <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                            <a className="nav-link active" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false">Update Campus Info</a>
                            <a className="nav-link" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">Remove Students</a>
                            <a className="nav-link" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">Add Students</a>
                        </div>
                    </div>
                    <div className="col-9">
                        <div className="tab-content" id="v-pills-tabContent">
                            <div className="tab-pane fade" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab"><UpdateEnrolledStudents campusId={campusId}/></div>
                            <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab"><AddStudent /></div>
                            <div className="tab-pane fade show active" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab"><CampusInfoForm /></div>
                        </div>
                    </div>
                </div>
            </div>
        )
}

function mapStateToProps (state){
    return {
        campuses: state.campuses
    }
}

function mapDispatchToProps(dispatch){
    return {
        handleClick(currentCampus){
            console.log(currentCampus)
            const action = deleteCampus(currentCampus.id)
            dispatch(action)
        }
    }
}


const UpdateCampusContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(UpdateCampus))

export default UpdateCampusContainer
