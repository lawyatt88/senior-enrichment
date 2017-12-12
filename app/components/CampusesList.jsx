import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import {withRouter} from 'react-router'

function CampusesList (props){
    return (
        <div>
            <ul>
                {props.campuses.map(campus => {
                    return (
                        <li key={campus.id}>
                            <Link to={`/campuses/${campus.id}`}>{campus.name}</Link>
                        </li>
                    )
                })}
            </ul>

            <Link to="/campuses/addcampus">ADD NEW CAMPUS</Link>
        </div>
    )
}

function mapStateToProps(state){
    return {
        campuses: state.campuses
    }
}

const CampusesListContainer = withRouter(connect(mapStateToProps)(CampusesList))

export default CampusesListContainer