import axios from "axios";

export default async function fetchLogin(email, password) {
  try {
    const userData = {
      email: email,
      password: password,
    };

    const serverResponse = await axios.post("http://192.168.1.67:8080/login", userData);
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
