import { setAllValuesInList, setAllValuesToObject } from '../Gestor'
import axios from 'axios'

export default async function patchStudentQuery (divInputList, studentId, axiosConfig) {
  const allInputValues = setAllValuesInList(divInputList)
  const allInputValuesInObject = setAllValuesToObject(allInputValues)
  allInputValuesInObject.student_id = studentId
  const serverResponse = await axios.patch(
    'http://192.168.1.12:8080/api/update',
    allInputValuesInObject,
    axiosConfig
  )
  window.location.reload()
  return serverResponse
}
