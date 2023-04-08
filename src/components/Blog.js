import { useState } from 'react'
//import BlogToggle from "./BlogToggle" might export later

const Blog = ({ blog, addLike, handleDelete, user }) => {
  const [showBlogDetails, setBlogDetails] = useState(false)
  const buttonLabel = showBlogDetails ? 'hide' : 'view'

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const viewDetails = { display: showBlogDetails ? '' : 'none' }

  const toggleVisibility = () => {
    if (showBlogDetails === true) {
      setBlogDetails(false)
    } else {
      setBlogDetails(true)
    }
  }

  const deleteBlog = () => {
    return (
      <div>
        {user.name === blog.user.name && (
          <button onClick={handleDelete}>Delete</button>
        )}
      </div>
    )
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} - {blog.author}{' '}
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={viewDetails}>
        <div>{blog.url}</div>
        <div>
          {blog.likes} <button onClick={addLike}>like</button>
        </div>
        <div>{blog.user.name}</div>
        <div>{user !== null && deleteBlog()}</div>
      </div>
    </div>
  )
}

export default Blog
