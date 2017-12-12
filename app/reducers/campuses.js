import axios from 'axios'

//action-creator
const GOT_CAMPUSES = 'GOT_CAMPUSES'
const GOT_CAMPUS = 'GOT_CAMPUS'
const REMOVED_CAMPUS = 'REMOVED_CAMPUS'

export function gotCampuses(campuses){
    const action = {
        type: GOT_CAMPUSES,
        campuses
    }
    return action
}

//thunk
export function fetchCampuses(){
    return function thunk(dispatch){
        return axios.get('/api/campuses')
        .then(res => res.data)
        .then(campuses => {
            const action = gotCampuses(campuses)
            dispatch(action)
        })
    }
}

export function createCampus(formData, history){
    return function thunk (dispatch) {
        axios.post('/api/campuses', formData)
        .then(res => res.data)
        .then(campus => {
            dispatch(gotCampus(campus))
            history.push(`/campuses/${campus.id}`)
        })
    }
}

export function updateCampus(formData, history){
    return function thunk (dispatch) {
        axios.put('/api/campuses/:campusId', formData)
        .then(res => res.data)
        .then(updatedCampus => {
            dispatch(gotCampus(updatedCampus))
            history.push(`/campuses/${updatedCampus.id}`)
        })
    }
}

export function gotCampus(campus){
    const action = {
        type: GOT_CAMPUS,
        campus
    }
    return action
}

export default function campusesReducer(campuses = [], action){
    switch (action.type){
        case GOT_CAMPUSES:
            return [...campuses, ...action.campuses]

        case GOT_CAMPUS:
            const updatedCampusId = action.campus.id
            const campus = campuses.filter(campus => campus.id === updatedCampusId)
            const i = campuses.indexOf(campus[0])

            if (i < 0) return [...campuses, action.campus]
            return campuses.map( (campus, index) => {
                if(index !== i) return campus
                else return action.campus
            })
        
        case REMOVED_CAMPUS:
            return campuses.filter(campus => campus.id !== action.campusId)   

        default:
            return campuses
    }
}

export function removedCampus(campusId){
    return {
        type: REMOVED_CAMPUS,
        campusId
    }
}

export function deleteCampus(campusId){
    return function thunk (dispatch){
        axios.delete(`/api/campuses/${campusId}`)
        .then(res => res.data)
        .then(campus => {
            console.log(campus)
            dispatch(removedCampus(campusId))
        })
    }
}
