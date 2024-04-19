import axios from 'axios'
import { closeModal } from '../Gestor'

export default async function readStudentQuery (student, config) {
  const serverResponse = await axios.post('http://192.168.1.12:8080/api/search', student, config)
  if (serverResponse.data.students) {
    closeModal()
    return serverResponse.data.students
  } else {
    return false
  }
}
