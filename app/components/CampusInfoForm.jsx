import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import { createCampus, updateCampus } from '../store'
import SingleStudent from './SingleStudent'
import { SingleCampus } from './SingleCampus'

class CampusInfoForm extends Component {
    constructor (){
        super()

        this.state = {
            name: '',
            imgUrl: '',
            description: ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount(){
        if (this.props.match.params.campusId) {
            this.setLocalState()
        }
    }

    componentWillReceiveProps(){
        if (this.props.match.params.campusId) {
            this.setLocalState()
        }
    }

    setLocalState(){
        //if updating a single campus, setState/populate form with their information
        const campusId = Number(this.props.match.params.campusId)
        const selectedCampus = this.props.campuses.filter(campus => campus.id === campusId)[0]
        console.log(selectedCampus)
        this.setState((prevState, props) => selectedCampus);
    }

    handleChange(evt){
        // if (evt.target.name === 'gpa') this.setState({ [evt.target.name]: (parseFloat(evt.target.value).toFixed(1))/1 })
        if (parseFloat(evt.target.value)) this.setState({ [evt.target.name]: parseFloat(evt.target.value) })
        else this.setState({ [evt.target.name]: evt.target.value })
    }

    handleSubmit(evt){
        evt.preventDefault()
        const action = this.props.match.params.campusId ? updateCampus(this.state, this.props.history) : createCampus(this.state, this.props.history)
        this.props.dispatch(action)
        this.setState({
            name: '',
            imgUrl: '',
            description: ''
        })
    }


    render(){
        console.log('i am info form state', this.state)
        return (
        <div className="col-12">
            <form onSubmit={this.handleSubmit}>
                <input onChange={this.handleChange} value={this.state.name} type="text" name="name" placeholder="Name" className="form-control" />
                <input onChange={this.handleChange} value={this.state.imgUrl} type="text" name="imgUrl" placeholder="Image URL" className="form-control" />
                <textarea onChange={this.handleChange} value={this.state.description} name="description" id="description" placeholder="School Description" rows="4" className="form-control" />

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

const CampusInfoFormContainer = withRouter(connect(mapStateToProps)(CampusInfoForm))

export default CampusInfoFormContainer
