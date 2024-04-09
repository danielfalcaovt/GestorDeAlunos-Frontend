import axios from 'axios'

export default async function fetchLogin (email, password) {
  try {
    const userData = {
      email,
      password
    }

    const serverResponse = await axios.post(
      'http://192.168.1.67:8080/login',
      userData
    )
    if (serverResponse.statusText === 'OK') {
      const { data } = serverResponse
      return data
    } else {
      return false
    }
  } catch (error) {
    console.error(error)
    return false
  }
}
