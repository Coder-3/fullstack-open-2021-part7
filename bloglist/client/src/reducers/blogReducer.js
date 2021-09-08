import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'INIT_BLOGS':
    return action.data
  case 'TOGGLE_EXPANDED': {
    const id = action.blog.id
    const toggledExpansionBlog = {
      ...action.blog,
      isExpanded: !action.blog.isExpanded
    }
    return state.map(blog => blog.id !== id ? blog : toggledExpansionBlog)
  }
  case 'CREATE_BLOG':
    return [...state, action.newBlog]
  case 'LIKE_BLOG': {
    const id = action.likedBlog.id
    return state.map(blog => blog.id !== id ? blog : action.likedBlog)
  }
  case 'DELETE_BLOG':
    return action.data
  default:
    return state
  }
}

export const createBlog = blog => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch({
      type: 'CREATE_BLOG',
      newBlog
    })
  }
}

export const deleteBlog = id => {
  return async dispatch => {
    await blogService.deleteBlog(id)
    const blogs = await blogService.getAll()

    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const likeBlog = (id, blog) => {
  return async dispatch => {
    const likedBlog = await blogService.update(id, blog)
    dispatch({
      type: 'LIKE_BLOG',
      likedBlog
    })
  }
}

// blog expansion state is not part of the backend because blog expansion needs to reset each load
export const toggleBlogExpansion = blog => {
  return async dispatch => {
    dispatch({
      type: 'TOGGLE_EXPANDED',
      blog
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    const modifiedBlogs = blogs.map(blog => {
      return {
        ...blog,
        isExpanded: false
      }
    })

    dispatch({
      type: 'INIT_BLOGS',
      data: modifiedBlogs
    })
  }
}

export default blogReducer