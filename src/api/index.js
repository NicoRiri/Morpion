import axios from "axios"

const apikey = "Ag8zZphjqVE%"

const api =  axios.create({
    baseURL: "https://morpion-api.edu.netlor.fr",
    headers: {
        'Content-Type' : "application/json",
        'Authorization': `key=${apikey}`
    }
})

export default api