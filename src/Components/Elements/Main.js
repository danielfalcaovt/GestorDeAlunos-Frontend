import { useContext, React } from 'react'
import { DataContext } from '../../Contexts/DataContext'
import { GestorFunctionContext } from '../../Contexts/GestorFunctionContext'
import { StudentContext } from '../../Contexts/StudentContext'

export default function Main () {
  const { data } = useContext(DataContext)
  const { setGestorFunction } = useContext(GestorFunctionContext)
  const { setSelectedStudentToModify } = useContext(StudentContext)

  function handleClickOnStudent (student) {
    setSelectedStudentToModify(student)
    setGestorFunction('alterar')
    const gestorModal = document.querySelector('#gestor-modal')
    gestorModal.style.display = 'flex'
  }

  function renderStudents (studentData) {
    return studentData && studentData.length > 1
      ? (
          studentData.map((student) => {
            return (
          <tr
            key={student.student_id}
            onClick={() => {
              handleClickOnStudent(student)
            }}
          >
            <td>{`${student.first_name} ${student.last_name}`}</td>
            <td>{student.cpf}</td>
            <td>{student.email ? student.email : '********'}</td>
            <td className="cep-cell">
              {student.cep && `${student.cep} -`}{' '}
              {student.address || student.cep ? student.address : '********'}
            </td>
            <td>{student.phone ? student.phone : '********'}</td>
            <td>{student.parent ? student.parent : '********'}</td>
            <td>{student.module ? student.module : '********'}</td>
            <td>{student.cadastrador}</td>
          </tr>
            )
          })
        )
      : (
      <tr
        key={data[0].student_id}
        onClick={() => {
          handleClickOnStudent(data[0])
        }}
      >
        <td>{`${data[0].first_name} ${data[0].last_name}`}</td>
        <td>{data[0].cpf ? data[0].cpf : '********'}</td>
        <td>{data[0].email ? data[0].email : '********'}</td>
        <td className="cep-cell">
          {data[0].cep && `${data[0].cep} -`}{' '}
          {data[0].address || data[0].cep ? data[0].address : '********'}
        </td>
        <td>{data[0].phone ? data[0].phone : '********'}</td>
        <td>{data[0].parent ? data[0].parent : '********'}</td>
        <td>{data[0].module ? data[0].module : '********'}</td>
        <td>{data[0].cadastrador ? data[0].cadastrador : '********'}</td>
      </tr>
        )
  }

  function studentsPlaceholder () {
    return (
      <tr>
        <td>Nome do Aluno</td>
        <td>000.000.000-00</td>
        <td>aluno@email.com</td>
        <td>Casa do Aluno, N° 0, Belford Roxo</td>
        <td>(00) 000000000</td>
        <td>Responsável do Aluno</td>
        <td>Curso</td>
        <td>Cadastrante</td>
      </tr>
    )
  }

  return (
    <main>
      <table>
        <thead>
          <tr>
            <th>ALUNO</th>
            <th>CPF</th>
            <th>EMAIL</th>
            <th>CEP / ENDEREÇO</th>
            <th>CELULAR</th>
            <th>RESPONSÁVEL</th>
            <th>MÓDULO</th>
            <th>ID</th>
          </tr>
        </thead>
        <tbody>{data ? renderStudents(data) : studentsPlaceholder()}</tbody>
      </table>
    </main>
  )
}
