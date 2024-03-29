import axios from "axios";

export default async function fetchUserData(jwt) {
  try {

    const config = {
      headers: { Authorization: `Bearer ${jwt}` },
    };
    const databaseResponse = await axios.get("http://localhost:8080/api", config);
    return databaseResponse
  } catch (error) {
    console.error(error);
    return false;
  }
}
