import axios from 'axios'
import users from './example_users.json'

users.forEach(async u => {
    const response = await axios.post("http://localhost:3000/flags", u)
    console.log(`For user with email ${u.email} and location ${u.location}, the returned feature flags are: ${response.data}`)
});