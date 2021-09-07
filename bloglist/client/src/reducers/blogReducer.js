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