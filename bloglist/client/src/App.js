import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="success">
      {message}
    </div>
  )
}

const ErrorMessage = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a, b) => b.likes - a.likes) )
    )
  }, [])

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInUser')
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser)
      setUser(user)
    }
  }, [])

  const loginForm = () => (
    <div>
      <h2>log in to application</h2>
      <ErrorMessage message={errorMessage} />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            id="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            id="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit" id="loginButton">login</button>
      </form>
    </div>
  )

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }

  const handleAddBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility()
    try {
      const theBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(theBlog))
      setSuccessMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Unable to add new blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const likeBlog = async (id, blogObject) => {
    const updatedBlog = await blogService.update(id, blogObject)
    setBlogs(blogs.map(blog => {
      if (blog.id !== id) {
        return blog
      } else {
        const modifiedUpdatedBlog = {
          title: updatedBlog.title,
          author: updatedBlog.author,
          url: updatedBlog.url,
          likes: updatedBlog.likes,
          user: {
            name: blog.user.name
          },
          id: updatedBlog.id
        }

        return modifiedUpdatedBlog
      }
    }).sort((a, b) => b.likes - a.likes))
  }

  const deleteBlog = async id => {
    await blogService.deleteBlog(id)

    const allBlogs = await blogService.getAll()
    setBlogs(allBlogs.sort((a, b) => b.likes - a.likes))
  }

  const showBlogs = () => {
    return (
      <div>
        <h2>blogs</h2>
        <Notification message={successMessage} />
        <ErrorMessage message={errorMessage} />
        <div>
          <p>{user.name} logged in</p>
          <button onClick={() => {logout()}}>logout</button>
        </div>
        <Togglable buttonLabel="create new blog" ref={blogFormRef}>
          <BlogForm handleCreate={handleAddBlog} />
        </Togglable>
        <div>
          {blogs.map(blog => <Blog key={blog.id} blog={blog} likeBlog={likeBlog} deleteBlog={deleteBlog} user={user} />)}
        </div>
      </div>
    )
  }

  return (
    <div>
      {user === null ?
        <div>
          {loginForm()}
        </div>
        :
        <div>
          {showBlogs()}
        </div>
      }
    </div>
  )
}

export default App