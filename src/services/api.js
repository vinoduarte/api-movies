import axios from"axios"

export const api = axios.create({
  baseURL: "https://node-backend-server.onrender.com"
})
