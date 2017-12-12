import React, { Component } from 'react';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import { gotStudents, fetchStudents, fetchCampuses } from '../store';
import {connect} from 'react-redux'
import { withRouter } from 'react-router'

import Navbar from './Navbar'
import StudentsList from './StudentsList'
import SingleStudent from './SingleStudent'
import AddStudent from './AddStudent'
import UpdateStudent from './UpdateStudent'
import CampusesList from './CampusesList'
import SingleCampus from './SingleCampus'
import AddCampus from './AddCampus'
import UpdateCampus from './UpdateCampus'
import UpdateEnrolledStudents from './UpdateEnrolledStudents'

export class AppMain extends Component {
    componentDidMount() {
        this.props.getStudentsDispatch()
        this.props.getCampusesDispatch()
    }

    render(){
        return (
            <div className="col-12">
                <Navbar />
                <Switch>
                    <Route exact path="/students" component={StudentsList} />
                    <Route exact path="/students/addstudent" component={AddStudent} />
                    <Route exact path="/students/updatestudent/:studentId" component={UpdateStudent} />
                    <Route exact path="/students/:studentId" component={SingleStudent} />
                    <Route exact path="/campuses" component={CampusesList} />
                    <Route exact path="/campuses/addcampus" component={AddCampus} />
                    <Route exact path="/campuses/updateenrolledstudents" component={UpdateEnrolledStudents} />
                    <Route exact path="/campuses/updatecampus/:campusId" component={UpdateCampus} />
                    <Route exact path="/campuses/:campusId" component={SingleCampus} />
                </Switch>
            </div>
        )
    }
        
}

function mapStateToProps (state) {
    return {
        students: state.students,
        campuses: state.campuses
    }
}

function mapDispatchToProps (dispatch, ownProps) {
    return {
        getStudentsDispatch() {
            const studentsThunk = fetchStudents()
            dispatch(studentsThunk)
        },

        getCampusesDispatch(){
            const campusesThunk = fetchCampuses()
            dispatch(campusesThunk)
        }
    }
}

const MainContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(AppMain))
export default MainContainer
