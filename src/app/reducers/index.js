import { combineReducers } from 'redux'

import requestData from './requestData'
import requestDetails from './requestDetails'

const rootReducer = combineReducers ({
	requestData,
	requestDetails
})

export default rootReducer