import axios from 'axios'

export default async function fetchUserData (jwt) {
  try {
    const config = {
      headers: { Authorization: `Bearer ${jwt}` }
    }
    const databaseResponse = await axios.get(
      'http://192.168.1.67:8080/api',
      config
    )
    return databaseResponse
  } catch (error) {
    console.error(error)
    return false
  }
}
