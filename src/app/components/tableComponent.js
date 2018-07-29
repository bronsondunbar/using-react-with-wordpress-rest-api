import React from 'react'

const TableComponent = ({ allData, updatedSearchSuggestions, detailsData, requestDetails }) => {
  return (
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
        {(detailsData == '' && updatedSearchSuggestions != null)
          ? {updatedSearchSuggestions}
          : null
        }

        {allData.length > 0 && 
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
  )
}

export default TableComponent