import React, { useEffect, useRef } from 'react'
import { Container } from './components/Body.styled'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import UsersTable from './components/UsersTable'
import Login from './components/Login'
import Navigation from './components/Navigation'
import User from './components/User'
import Blogs from './components/Blogs'
import SingleBlog from './components/SingleBlog'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, createBlog } from './reducers/blogReducer'
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

  const users = useSelector(state => state.users)

  const blogFormRef = useRef()

  const handleAddBlog = async newBlog => {
    blogFormRef.current.toggleVisibility()

    try {
      await dispatch(createBlog(newBlog))
      dispatch(setNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`, 'SUCCESS_NOTIFICATION', 5000))
    } catch (exception) {
      dispatch(setNotification('Unable to add new blog', 'ERROR_NOTIFICATION', 5000))
    }
  }

  return (
    <Container >
      <Navigation />
      <h2>blogs</h2>
      <Notification />
      <Login />
      <Switch>
        <Route path="/users/:id">
          <User />
        </Route>
        <Route path="/users/">
          <UsersTable users={users} />
        </Route>
        <Route path="/blogs/:id">
          <SingleBlog />
        </Route>
        <Route path="/">
          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm handleCreate={handleAddBlog} />
          </Togglable>
          <Blogs />
        </Route>
      </Switch>
    </Container>
  )
}

export default App