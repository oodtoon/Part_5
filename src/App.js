import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return <div className="success">{message}</div>
}

const ErrorNotification = ({ message }) => {
  if (message === null) {
    return null
  }
  return <div className="error">{message}</div>
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      console.log(user.name)
    }
  }, [])

  const blogFormRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    console.log('login out')
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setUsername('')
    setPassword('')
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(
        blogs.concat({
          ...returnedBlog,
          user,
        })
      )

      console.log()

      setSuccessMessage(
        `A new blog ${blogObject.title} by ${blogObject.author} added`
      )
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    })
  }

  const handleDelete = (title, id) => {
    if (window.confirm(`Are you sure you want to delete ${title}?`)) {
      blogService.remove(id).then(() => {
        setBlogs(blogs.filter((blog) => blog.id !== id))
      })
    }
  }

  const addLikeTo = (id) => {
    const blog = blogs.find((b) => b.id === id)
    const likedBlog = { ...blog, likes: blog.likes + 1 }

    blogService.update(id, likedBlog).then((returnedBlog) => {
      setBlogs(
        blogs.map((blog) => (blog.id !== id ? blog : { ...returnedBlog, user }))
      )
    })
  }

  const logoutForm = () => <button id="log-out" onClick={handleLogout}>log out</button>

  return (
    <div>
      <Notification message={successMessage} />
      <ErrorNotification message={errorMessage} />
      {user === null && (
        <div>
          <p>log in to application </p>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </div>
      )}
      {user && (
        <div>
          {user.name} logged in {logoutForm()}
        </div>
      )}

      {user !== null && (
        <Togglable buttonLabel="add blog entry" ref={blogFormRef}>
          <BlogForm createBlog={addBlog} />
        </Togglable>
      )}

      <h2>blogs</h2>
      {blogs === null && <div>No Blogs</div>}
      {blogs !== null && blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          addLike={() => addLikeTo(blog.id)}
          handleDelete={() => handleDelete(blog.title, blog.id)}
        />
      ))}
    </div>
  )
}

export default App
