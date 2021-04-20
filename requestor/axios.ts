import axios from 'axios'

const requestor = axios.create({ baseURL: 'http://localhost:3000' })

export default requestor
