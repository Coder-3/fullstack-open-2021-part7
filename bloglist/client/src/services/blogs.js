import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, blog) => {
  const response = await axios.put(`${baseUrl}/${id}`, blog)
  return response.data
}

const deleteBlog = async id => {
  const config = {
    headers: { Authorization: token },
  }

  return await axios.delete(`${baseUrl}/${id}`, config)
}

const addComment = async (id, blog) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, blog)
  return response.data
}

export default { getAll, create, addComment, setToken, update, deleteBlog }