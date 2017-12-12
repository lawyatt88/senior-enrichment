import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

export function SingleCampus (props){
    console.log(props)
    const campusId = Number(props.match.params.campusId)
    const selectedCampus = props.campuses.filter(campus => campus.id === campusId)[0]

    const enrolledStudents = props.students.filter(student => student.campusId === campusId)
    console.log(enrolledStudents)

    return (
        <div>
            <h2>{selectedCampus && selectedCampus.name}</h2>
            <div className="row">
                <div className="col-3"><img src={selectedCampus && selectedCampus.imgUrl} /></div>
                <p className="col-9">{selectedCampus && selectedCampus.description}</p>
            </div>

            <h3>ENROLLED STUDENTS</h3>
            <ul>
            {enrolledStudents.map(student => {
                return (
                <li key={student.id}>
                    <Link to={`/students/${student.id}`}>{student.name}</Link>
                </li>
                )
            })}
            </ul>

            <h3>Options</h3>
            <button id="update"><Link to={`/campuses/updatecampus/${selectedCampus && selectedCampus.id}`}>UPDATE CAMPUS</Link></button>
        </div>
    )
}

function mapStateToProps(state){
    return {
        campuses: state.campuses,
        students: state.students
    }
}

const SingleCampusContainer = connect(mapStateToProps)(SingleCampus)

export default SingleCampusContainer

