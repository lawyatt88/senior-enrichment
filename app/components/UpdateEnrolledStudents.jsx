import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateStudent } from '../store'

class UpdateEnrolledStudents extends Component {
    constructor(){
        super()
        this.state = {
            unenroll: []
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(evt){
        if (this.state.unenroll.indexOf(evt.target.value) === -1) {
            this.setState({ unenroll: [...this.state.unenroll, evt.target.value] })
        } else {
            let newState = this.state.unenroll.filter(studentId => studentId !== evt.target.value)
            this.setState({unenroll: newState})
        } 
    }

    handleSubmit(evt){
        evt.preventDefault()

        this.state.unenroll.forEach(studentId => {
            let currentStudent = this.props.students.filter(student => Number(studentId) === student.id)[0]
            currentStudent.campusId = null
            console.log(currentStudent)
            this.props.dispatch(updateStudent(currentStudent))
        })

        this.setState({
            unenroll: []
        })
    }

    render(){
        console.log('update students state:', this.state)
        // const campusId = Number(this.props.match.params.campusId)
        const enrolledStudents = this.props.students.filter(student => student.campusId === this.props.campusId)
        return (
            <form onSubmit={this.handleSubmit}>
            <label htmlFor="sel1">Select current students to unenroll:</label>
            {this.props.students && enrolledStudents.map(student => {
                return (
                    <div onChange={this.handleChange} key={student.id} className="form-check">
                        <label className="form-check-label">
                            <input className="form-check-input" type="checkbox" value={student.id} />
                            {student.name}
                        </label>
                    </div>
            )})}
            <div className="form-group">
                <button type="submit" className="btn btn-default">Submit</button>
            </div>
            </form>
        )
    }
}

function mapStateToProps(state){
    return {
        students: state.students,
        campuses: state.campuses
    }
}

const UpdateEnrolledStudentsContainer = connect(mapStateToProps)(UpdateEnrolledStudents)

export default UpdateEnrolledStudentsContainer
