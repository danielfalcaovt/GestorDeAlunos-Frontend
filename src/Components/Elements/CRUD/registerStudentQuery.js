import axios from "axios";
import { setAllValuesInList, setAllValuesToObject } from "../Gestor";


export default async function registerStudentQuery(divInputList, config) {
  const allInputValues = setAllValuesInList(divInputList);
  const allInputValuesInObject = setAllValuesToObject(allInputValues);
  const serverResponse = await axios.post(
    "http://192.168.1.67:8080/api/register",
    allInputValuesInObject,
    config
  );
  window.location.reload();
  return serverResponse
};