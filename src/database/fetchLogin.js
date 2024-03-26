import axios from "axios";

export default async function fetchLogin(username, password) {
  try {
    const userData = {
      username: username,
      password: password,
    };

    const serverResponse = await axios.post("http://localhost:8080/login", userData);
    if (serverResponse.statusText === "OK") {
      const { data } = serverResponse;
      console.log(data);
      return data;
    }else{
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}
