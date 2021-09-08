import React, { useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import { loginUser, logoutUser } from './reducers/userReducer'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, createBlog, likeBlog, deleteBlog } from './reducers/blogReducer'
import { useSelector, useDispatch } from 'react-redux'
import './index.css'

const App = () => {
  const user = useSelector(state => state.user)

  const blogFormRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const blogs = useSelector(state => state.blogs)

  const sortedBlogs = () => {
    return blogs.sort((a, b) => b.likes - a.likes)
  }

  const loginForm = () => (
    <div>
      <h2>log in to application</h2>
      <Notification />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            name="username"
            id="username"
          />
        </div>
        <div>
          password
          <input
            type="password"
            name="password"
            id="password"
          />
        </div>
        <button type="submit" id="loginButton">login</button>
      </form>
    </div>
  )

  const handleLogin = async (event) => {
    event.preventDefault()

    const credentials = {
      username: event.target.username.value,
      password: event.target.password.value
    }

    try {
      dispatch(loginUser(credentials))
    } catch (exception) {
      dispatch(setNotification('wrong credentials', 'ERROR_NOTIFICATION', 5000))
    }
  }

  const logout = () => {
    dispatch(logoutUser())
  }

  const handleAddBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility()
    try {
      await dispatch(createBlog(newBlog))
      dispatch(setNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`, 'SUCCESS_NOTIFICATION', 5000))
    } catch (exception) {
      dispatch(setNotification('Unable to add new blog', 'ERROR_NOTIFICATION', 5000))
    }
  }

  const handleLike = async (id, blogObject) => {
    dispatch(likeBlog(id, blogObject))
  }

  const handleDelete = async id => {
    dispatch(deleteBlog(id))
  }

  const showBlogs = () => {
    return (
      <div>
        <h2>blogs</h2>
        <Notification />
        <div>
          <p>{user.name} logged in</p>
          <button onClick={() => {logout()}}>logout</button>
        </div>
        <Togglable buttonLabel="create new blog" ref={blogFormRef}>
          <BlogForm handleCreate={handleAddBlog} />
        </Togglable>
        <div>
          {sortedBlogs().map(blog => <Blog key={blog.id} blog={blog} likeBlog={handleLike} deleteBlog={handleDelete} user={user} />)}
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