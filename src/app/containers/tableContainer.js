import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { requestData, requestDetails } from '../actions/index'

class TableContainer extends Component {
	constructor(props) {
  	super(props)
	}

	render () {
		const { isFetchingAllData, allData, getDetails, detailsData, searchTerm, searchSuggestions, dispatch } = this.props

		let updatedSearchSuggestions = null

    {(searchTerm != '' && searchSuggestions.length > 0)
	    ? updatedSearchSuggestions = searchSuggestions.map((updatedSearchSuggestions, index) => {
    			return (
    				<tr
							key={index}>
							<td>
								{updatedSearchSuggestions.title.rendered}
							</td>
							<td>
								{updatedSearchSuggestions.slug}
							</td>
							<td>
								{updatedSearchSuggestions.date}
							</td>
							<td>
								<a
									href="#"
									className="btn btn-default"
									id={updatedSearchSuggestions.id}
									onClick={(event) => getDetails(event)}>View post</a>
							</td>
						</tr>)})
	   	: null}

	  {(searchTerm != '' && searchSuggestions.length == 0)
	    ? updatedSearchSuggestions	=	<tr>
																			<td colSpan="4">No result(s)</td>
																		</tr>
	   	: null}

		return (
			<Fragment>
				{detailsData == '' &&
					<table className="table-borderless table-striped">
					  <thead>
					    <tr>
					      <th scope="col">Title</th>
					      <th scope="col">Slug</th>
					      <th scope="col">Date</th>
					      <th scope="col"></th>
					    </tr>
					  </thead>
					  <tbody>
					  	{updatedSearchSuggestions != null &&
					  		updatedSearchSuggestions
					  	}

					  	{updatedSearchSuggestions == null &&
					  		allData.map((post, index) =>
									<tr
										key={index}>
										<td>
											{post.title.rendered}
										</td>
										<td>
											{post.slug}
										</td>
										<td>
											{post.date}
										</td>
										<td>
											<a
												href="#"
												className="btn btn-default"
												onClick={() => dispatch(requestDetails(post.id))}>View post</a>
										</td>
									</tr>
								)
					  	}
					  </tbody>
					</table>
				}
			</Fragment>
		)
  }

}

TableContainer.propTypes = {
	dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
	const { requestData, requestDetails } = state.rootReducer
  return {
  	isFetchingAllData: requestData.isFetching,
    allData: requestData.data,
    isFetchingDataDetails: requestDetails.isFetching,
    detailsData: requestDetails.data
  }
}

export default connect(mapStateToProps)(TableContainer)