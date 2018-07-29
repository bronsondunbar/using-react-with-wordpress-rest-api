import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import DOMPurify from 'dompurify'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { requestData, requestDetails } from './actions/index'

import SearchComponent from './components/searchComponent'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'

import '../sass/style.css'

class App extends Component {
	constructor(props) {
  	super(props)

  	this.state = {
  		searchTerm: '',
  		searchSuggestions: ''
  	}
	}

	async componentDidMount() {
		const { dispatch } = this.props
		dispatch(requestData())
	}

	userSearch (event) {
  	let searchTerm = event.target.value.toLowerCase()

    let searchSuggestions = this.props.allData.filter((searchData) => {
    	let filteredResults = searchData.title.rendered.toLowerCase()
      return filteredResults.includes(searchTerm)
    })

    this.setState((state, props) => {
    	return { searchSuggestions, searchTerm }
    })
  }

  clearSearch (event) {
  	event.preventDefault()

    let searchTerm = ''

    this.setState((state, props) => {
      return { searchTerm, searchTerm }
    })
  }

  getDetails (event) {
  	const { dispatch } = this.props

  	this.clearSearch(event)
  	dispatch(requestDetails(event.target.id.toLowerCase()))
  }

	render () {

    const { isFetchingAllData, allData, isFetchingDataDetails, detailsData, dispatch } = this.props
		const { category, icon_url, id, url, value } = this.props.detailsData

    let searchSuggestions = this.state.searchSuggestions
		let searchTerm = this.state.searchTerm

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
									onClick={() => dispatch(requestDetails(updatedSearchSuggestions.id))}>View post</a>
							</td>
						</tr>)})
	   	: null}

	  {(searchTerm != '' && searchSuggestions.length == 0)
	    ? updatedSearchSuggestions	=	<tr>
																			<td colspan="4">No result(s)</td>
																		</tr>
	   	: null}

   	{(detailsData != '' && searchSuggestions.length > 0)
	    ? updatedSearchSuggestions = searchSuggestions.map((updatedSearchSuggestions, index) => {
    			return (
    				 <a
    				 	href="#"
    				 	id={updatedSearchSuggestions.id}
              className="dropdown-item"
              onClick={this.getDetails.bind(this)}
              key={index}
            >
              {updatedSearchSuggestions.title.rendered}
            </a>
    			)})
	   	: null}

	 	{(detailsData != '' && searchSuggestions.length == 0)
	    ? updatedSearchSuggestions = <a href="#" className="dropdown-item" >No result(s)</a>
	   	: null}

  	return (
  		<div>
				<div className="container">
					<header>
	  				<h1>Using React with WordPress REST API</h1>

	  				<div className="card">
          		<div className="card-body">
	  						<p>This example calls the demo WordPress REST API using React and React Redux to display a list of posts</p>

	  						<p>You can then click on any of the posts to see the content</p>
	  					</div>
	  				</div>
	  			</header>

					<div className="grid">
						<div className="item">
							<div>
								<div className="btn-group search">
									<SearchComponent
				            searchTerm={searchTerm}
				            searchSuggestions={searchSuggestions}
				            userSearch={this.userSearch.bind(this)}
				            clearSearch={this.clearSearch.bind(this)}
				            placeHolder="Search for post..." />

			            {(detailsData == '' && updatedSearchSuggestions != null)
										? <table className="table-borderless table-striped">
											  <thead>
											    <tr>
											      <th scope="col">Title</th>
											      <th scope="col">Slug</th>
											      <th scope="col">Date</th>
											      <th scope="col"></th>
											    </tr>
											  </thead>
											  <tbody>
											  	{updatedSearchSuggestions}
											  </tbody>
											</table>
										: null
									}

									{(detailsData != '' && updatedSearchSuggestions != null && searchTerm != '')
										? <Fragment>
												<div className="dropdown-menu">
													{updatedSearchSuggestions}
												</div>
											</Fragment>
										: null
									}
								</div>

									{(detailsData == '' && updatedSearchSuggestions == null)
										? <Fragment>
												{isFetchingAllData &&
													<div>
											      <i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
											      <p>Loading posts...</p>
										      </div>
												}

												{!isFetchingAllData &&
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
															{allData.map((post, index) =>
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
															)}
														</tbody>
													</table>}
											</Fragment>
										: null}

									{detailsData != ''
										? <Fragment>
								    		{isFetchingDataDetails &&
								    			<div>
											      <i className="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
											      <p>Loading post...</p>
											    </div>
								    		}
								    		{!isFetchingDataDetails &&
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
							    	: null}
							</div>
						</div>
					</div>
				</div>
		  </div>
  	)

  }

}

App.propTypes = {
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

export default connect(mapStateToProps)(App)