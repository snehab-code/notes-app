import Axios from 'axios'

const axios = Axios.create({
    baseURL: "http://localhost:3010",
    headers: {
        "x-auth": localStorage.getItem("authToken")
    }
})

export default axios