import axios from 'axios'

export default async function deleteStudentQuery (cpf, axiosConfig) {
  const studentCpf = cpf
  console.log(studentCpf)
  const serverResponse = await axios.delete(
    `http://192.168.1.67:8080/api/delete/${studentCpf}`,
    axiosConfig
  )
  if (serverResponse.data.student) {
    window.location.reload()
    return serverResponse
  } else {
    alert('Estudante não foi encontrado.')
    return serverResponse
  }
}
