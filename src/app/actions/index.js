
export const REQUEST_FETCH_DATA = 'REQUEST_FETCH_DATA'
const requestFetchData = () => {
	return { type: REQUEST_FETCH_DATA }
}

export const RECEIVE_FETCH_DATA = 'RECEIVE_FETCH_DATA'
const receiveFetchData = (json) => {
	return { type: RECEIVE_FETCH_DATA, data: json }
}

export const requestData = () => {
	return dispatch => {
		dispatch(requestFetchData())
		fetch ('https://demo.wp-api.org/wp-json/wp/v2/posts')
		.then ((response) => response.json())
		.then(json => dispatch(receiveFetchData(json)))
	}
}

export const REQUEST_FETCH_DATA_DETAILS = 'REQUEST_FETCH_DATA_DETAILS'
const requestFetchDetails = () => {
	return { type: REQUEST_FETCH_DATA_DETAILS }
}

export const REQUEST_FETCH_DATA_DETAILS_RESET = 'REQUEST_FETCH_DATA_DETAILS_RESET'
const requestFetchDetailsReset = () => {
	return { type: REQUEST_FETCH_DATA_DETAILS_RESET, data: "" }
}

export const RECEIVE_FETCH_DATA_DETAILS = 'RECEIVE_FETCH_DATA_DETAILS'
const receiveFetchDetails = (json) => {
	return { type: RECEIVE_FETCH_DATA_DETAILS, data: json }
}

export const requestDetails = (id) => {
	if (id == undefined) {
		return dispatch => {
			dispatch(requestFetchDetailsReset())
		}
	} else {
		return dispatch => {
			dispatch(requestFetchDetails())
			fetch (`https://demo.wp-api.org/wp-json/wp/v2/posts/${id}`)
			.then ((response) => response.json())
			.then(json => dispatch(receiveFetchDetails(json)))
		}
	}
}
