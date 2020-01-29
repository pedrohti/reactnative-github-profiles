import axios from 'axios'

const api = axios.create({
	baseURL: 'https://api.github.com'
	// baseURL: 'https://swapi.co/api/'
})

export default api
