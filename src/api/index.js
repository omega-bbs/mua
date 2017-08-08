import axios from 'axios'

const client = axios.create({
  baseURL: '/api',
})

export const getPost = id => client.get(`/posts/${id}`)
