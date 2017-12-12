import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import { createStudent, updateStudent, fetchStudents } from '../store'

class StudentInfoForm extends Component {
    constructor (){
        super()

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            gpa: 0.0,
            campusId: 0
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount(){
        if (this.props.match.params.studentId) {
            this.setLocalState()
        }
        if (this.props.match.params.campusId) {
            const campusId = Number(this.props.match.params.campusId)
            console.log(campusId)
            this.setState({campusId: campusId});
        }
    }

    componentWillReceiveProps(){
        if (this.props.match.params.studentId) {
            this.setLocalState()
        }
        if (this.props.match.params.campusId) {
            const campusId = Number(this.props.match.params.campusId)
            console.log(campusId)
            this.setState({campusId: campusId});
        }
    }

    setLocalState(){
        //if updating a single student, setState/populate form with their information
        const studentId = Number(this.props.match.params.studentId)
        const selectedStudent = this.props.students.filter(student => student.id === studentId)[0]
        console.log(selectedStudent)
        this.setState((prevState, props) => selectedStudent);
    }

    handleChange(evt){
        // if (evt.target.name === 'gpa') this.setState({ [evt.target.name]: (parseFloat(evt.target.value).toFixed(1))/1 })
        if (parseFloat(evt.target.value)) this.setState({ [evt.target.name]: parseFloat(evt.target.value) })
        else this.setState({ [evt.target.name]: evt.target.value })
    }

    handleSubmit(evt){
        evt.preventDefault()
        const action = this.props.match.params.studentId ? updateStudent(this.state, this.props.history) : createStudent(this.state, this.props.history)
        this.props.dispatch(action)
        this.setState({
            firstName: '',
            lastName: '',
            email: '',
            gpa: 0.0,
            campusId: 0
        })
    }


    render(){
        console.log('this is the state', this.state)
        return (
            <div className="col-md-6">
        <form className="row" onSubmit={this.handleSubmit}>
            <div className="form-group col-6">
                <label htmlFor="firstName">First Name</label>
                <input onChange={this.handleChange} value={this.state.firstName} type="text" name="firstName" placeholder="First Name" className="form-control" />
            </div>
            <div className="form-group col-6">
                <label htmlFor="lastName">Last Name</label>
                <input onChange={this.handleChange} value={this.state.lastName} type="text" name="lastName" placeholder="Last Name" className="form-control" />
            </div>
            <div className="form-group col-6">
                <label htmlFor="email">Email</label>
                <input onChange={this.handleChange} value={this.state.email} type="text" name="email" placeholder="Email" className="form-control" />
            </div>
            <div className="form-group col-2">
                <label htmlFor="gpa">GPA</label>
                <input onChange={this.handleChange} value={this.state.gpa} type="number" min="0.0" max="4.0" step=".1" name="gpa" placeholder="GPA" className="form-control" />
            </div>
            <div className="form-group col-12">
            <label htmlFor="sel1">Select Campus:</label>
            <select onChange={this.handleChange} value={this.state.campusId} name="campusId" className="form-control" id="campus-choices" >
                <option disabled value="0"> -- Select Campus -- </option>
                {this.props.campuses && this.props.campuses.map(campus => <option key={campus.id} value={campus.id}>{campus.name}</option>)}
            </select>
            </div>

            <div className="form-group">
                <button type="submit" className="btn btn-default">Submit</button>
            </div>
        </form>
        </div>
        )
    }
}

function mapStateToProps (state){
    return {
        campuses: state.campuses,
        students: state.students
    }
}

const StudentInfoFormContainer = withRouter(connect(mapStateToProps)(StudentInfoForm))

export default StudentInfoFormContainer
