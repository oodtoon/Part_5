import { useState } from "react"
//import BlogToggle from "./BlogToggle" might export later

const Blog = ({ blog }) => {
  const [showBlogDetails, setBlogDetails] = useState(false)
  const buttonLabel = showBlogDetails ? "hide" : "view"

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  }
  const viewDetails = { display: showBlogDetails ? "" : "none" }

  const toggleVisibility = () => {
    if (showBlogDetails === true) {
      setBlogDetails(false)
    } else {
      setBlogDetails(true)
    }
  }

  const handleLike = (event) => {
    console.log("like")
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} - {blog.author}{" "}
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={viewDetails}>
        <div>{blog.url}</div>
        <div>
          {blog.likes} <button onClick={handleLike}>like</button>
        </div>
        <div key={blog.id}>{blog.user.name}</div>
      </div>
    </div>
  )
}

export default Blog
