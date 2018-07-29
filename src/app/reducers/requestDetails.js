
/* Action for requesting all detail data for category */

import { REQUEST_FETCH_DATA_DETAILS, REQUEST_FETCH_DATA_DETAILS_RESET, RECEIVE_FETCH_DATA_DETAILS } from '../actions/index'

export default function (state = {
	data: [], isFetching: false
}, action) {
	switch (action.type) {
		case REQUEST_FETCH_DATA_DETAILS:
			return Object.assign({}, state, { isFetching: true })
		case REQUEST_FETCH_DATA_DETAILS_RESET:
			return Object.assign({}, state, {
				data: "",
				isFetching: false
			})
		case RECEIVE_FETCH_DATA_DETAILS:
			return Object.assign({}, state, {
				data: action.data,
				isFetching: false
			})
	}
	return state
}