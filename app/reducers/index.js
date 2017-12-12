/* combineReducers is not currently used, but eventually should be for modular code :D */
import { combineReducers } from 'redux'

import { students, gotStudents, gotStudent, fetchStudents, fetchStudent, createStudent, updateStudent } from './students'
import campuses, { gotcampuses, fetchCampuses } from './campuses'

const rootReducer = combineReducers({
  students,
  campuses
})

export default rootReducer

export * from './students'
export * from './campuses'


