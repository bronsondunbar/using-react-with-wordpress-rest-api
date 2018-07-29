
/* Action for requesting all category data */

import { REQUEST_FETCH_DATA, RECEIVE_FETCH_DATA } from '../actions/index'

export default function (state = {
	data: [], isFetching: false
}, action) {
	switch (action.type) {
		case REQUEST_FETCH_DATA:
			return Object.assign({}, state, { isFetching: true })
		case RECEIVE_FETCH_DATA:
			return Object.assign({}, state, {
				data: action.data,
				isFetching: false
			})
	}
	return state
}