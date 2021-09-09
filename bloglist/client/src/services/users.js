import axios from 'axios'
const baseUrl = '/api/users'

const getUsers = async () => await axios.get(baseUrl)

export default { getUsers }