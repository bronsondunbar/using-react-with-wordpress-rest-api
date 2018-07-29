import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import DOMPurify from 'dompurify'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { requestDetails } from '../actions/index'

class PostContainer extends Component {
	constructor(props) {
  	super(props)
	}

	render () {
		const { isFetchingDataDetails, detailsData, searchTerm, searchSuggestions, dispatch } = this.props

		return (
			<Fragment>
				{detailsData != '' &&
					<Fragment>
		  			<a
							href="#"
							className="btn btn-default"
							onClick={() => dispatch(requestDetails())}>Back</a>
		  			<div className="grid">
		  				<div className="item data-details">
		  					<h1>{detailsData.title.rendered}</h1>
		  					<div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(detailsData.content.rendered)}}></div>
		  				</div>
		    		</div>
		    		<a
							href="#"
							className="btn btn-default"
							onClick={() => dispatch(requestDetails())}>Back</a>
		  		</Fragment>	
	  		}
  		</Fragment>
		)
  }

}

PostContainer.propTypes = {
	dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
	const { requestDetails } = state.rootReducer
  return {
  	isFetchingDataDetails: requestDetails.isFetching,
    detailsData: requestDetails.data
  }
}

export default connect(mapStateToProps)(PostContainer)