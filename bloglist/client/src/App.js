import React, { useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import UsersTable from './components/Users'
import Login from './components/Login'
import LoggedInUser from './components/LoggedInUser'
import User from './components/User'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, createBlog, likeBlog, deleteBlog } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'
import { useSelector, useDispatch } from 'react-redux'
import './index.css'

import {
  Switch, Route
} from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  const blogFormRef = useRef()

  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)
  const users = useSelector(state => state.users)

  const sortedBlogs = () => {
    return blogs.sort((a, b) => b.likes - a.likes)
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
    if (!user) {
      return null
    }

    return (
      <div>
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
      <h2>blogs</h2>
      <Notification />
      <Login />
      <LoggedInUser />
      <Switch>
        <Route path="/users/:id">
          <User />
        </Route>
        <Route path="/users/">
          <UsersTable users={users} />
        </Route>
        <Route path="/">
          <div>
            {showBlogs()}
          </div>
        </Route>
      </Switch>
    </div>
  )
}

export default App