import InputMask from 'react-input-mask'
import { useContext, React } from 'react'
import { GestorFunctionContext } from '../../Contexts/GestorFunctionContext'
import { StudentContext } from '../../Contexts/StudentContext'
import { DataContext } from '../../Contexts/DataContext'
import deleteStudentQuery from './studentQueries/deleteStudentQuery'
import patchStudentQuery from './studentQueries/patchStudentQuery'
import registerStudentQuery from './studentQueries/registerStudentQuery'
import readStudentQuery from './studentQueries/readStudentQuery'
import Cookies from 'js-cookie'

export default function Gestor () {
  const { GestorFunction } = useContext(GestorFunctionContext)
  const { SelectedStudentToModify } = useContext(StudentContext)
  const { setData } = useContext(DataContext)
  // Fechar modal ao pressionar "ESC"
  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      closeModal()
    }
  })

  async function submitDataFromForm (evt) {
    try {
      evt.preventDefault()
      const token = Cookies.get('jwt')
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      if (GestorFunction === 'consultar') {
        const studentCpf = evt.target.cpf.value
        if (studentCpf.length === 14 && !checkIfInputMaskValueIsValid(studentCpf)) {
          alertInvalidParams()
        } else {
          const studentInfoToSearch = {
            first_name: evt.target.first_name.value,
            cpf: evt.target.cpf.value,
            module: evt.target.module.value,
            parent: evt.target.parent.value
          }
          const foundStudent = await readStudentQuery(studentInfoToSearch, config)
          setData(foundStudent)
        }
      } else if (GestorFunction === 'cadastrar') {
        const divInputList = evt.target.children
        if (checkIfValuesOfInputMaskAreInvalid(evt)) {
          alertInvalidParams()
        } else {
          await registerStudentQuery(divInputList, config)
        }
      } else if (GestorFunction === 'alterar') {
        const divInputList = evt.target.children
        if (checkIfValuesOfInputMaskAreInvalid(evt)) {
          alertInvalidParams()
        } else {
          await patchStudentQuery(
            divInputList,
            SelectedStudentToModify.student_id,
            config
          )
        }
      } else if (GestorFunction === 'remover') {
        const studentCpf = evt.target.cpf.value
        const confirmation = evt.target.confirmation.value
        if (confirmation === 'DELETAR') {
          if (checkIfInputMaskValueIsValid(studentCpf) && studentCpf.length === 14) {
            await deleteStudentQuery(studentCpf, config)
          } else {
            alertInvalidParams()
          }
        } else {
          alertInvalidParams()
        }
      }
    } catch (error) {
      alert(error.response.data.error)
      console.error(error)
    }
  }

  function checkIfValuesOfInputMaskAreInvalid (evt) {
    const studentCpf = evt.target.cpf.value
    const studentCep = evt.target.cep.value
    const studentPhone = evt.target.phone.value
    if (studentCpf) {
      if (!checkIfInputMaskValueIsValid(studentCpf)) {
        return true
      }
    }

    if (studentCep) {
      if (!checkIfInputMaskValueIsValid(studentCep)) {
        return true
      }
    }

    if (studentPhone) {
      if (!checkIfInputMaskValueIsValid(studentPhone)) {
        return true
      }
    }
  }

  function checkIfInputMaskValueIsValid (InputMaskValue) {
    if (InputMaskValue.length === 14 || InputMaskValue.length === 9) {
      const InputMaskValueRegex = /_/g
      if (!InputMaskValueRegex.test(InputMaskValue)) {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  }

  function alertInvalidParams () {
    alert('Parâmetros Inválidos.')
  }

  return (
    <modal className="modal" id="gestor-modal">
      <main className={GestorFunction} id="gestor-content">
        <button onClick={closeModal} id="gestor-close">
          x
        </button>
        <h1>{GestorFunction.toUpperCase()}</h1>
        <form
          onSubmit={submitDataFromForm}
          method="POST"
          action="/"
          id="gestor-form"
        >
          {GestorFunction === 'consultar' && (
            <>
              <div>
                <label htmlFor="first_name">Primeiro Nome</label>
                <input
                  type="text"
                  name="first_name"
                  placeholder="Daniel"
                ></input>
              </div>
              <div>
                <label htmlFor="cpf">CPF</label>
                <InputMask
                  name="cpf"
                  mask="999.999.999-99"
                  placeholder="999.999.999-99"
                />
              </div>
              <div>
                <label htmlFor="module">Módulo</label>
                <select name="module" required>
                  <option selected>Desconhecido</option>
                  <option>Básico</option>
                  <option>Pré - Intermediário</option>
                  <option>Intermediário</option>
                  <option>Avançado</option>
                </select>
              </div>
              <div>
                <label htmlFor="parent">Responsável</label>
                <input
                  name="parent"
                  type="text"
                  placeholder="Alex dos Santos"
                ></input>
              </div>
            </>
          )}

          {GestorFunction === 'cadastrar' && (
            <>
              <div>
                <label htmlFor="first_name">Primeiro Nome</label>
                <input
                  type="text"
                  name="first_name"
                  placeholder="Daniel"
                  required
                ></input>
              </div>
              <div>
                <label htmlFor="last_name">Último Nome</label>
                <input
                  type="text"
                  name="last_name"
                  placeholder="Falcão"
                  required
                ></input>
              </div>
              <div>
                <label htmlFor="cpf">CPF</label>
                <InputMask
                  mask="999.999.999-99"
                  placeholder="999.999.999-99"
                  name="cpf"
                />
              </div>
              <div>
                <label htmlFor="module">Módulo</label>
                <select name="module" required>
                  <option selected disabled>
                    ---- Selecionar ----
                  </option>
                  <option value={'B'}>Básico</option>
                  <option value={'P'}>Pré - Intermediário</option>
                  <option value={'I'}>Intermediário</option>
                  <option value={'A'}>Avançado</option>
                </select>
              </div>
              <div>
                <label htmlFor="address">Endereço</label>
                <input
                  type="text"
                  name="address"
                  placeholder="Av. Anhanguera, N° 18"
                ></input>
              </div>
              <div>
                <label htmlFor="cep">CEP</label>
                <InputMask
                  name="cep"
                  mask="99999-999"
                  placeholder="26000-000"
                />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  name="email"
                  type="email"
                  placeholder="daniel@gmail.com"
                ></input>
              </div>
              <div>
                <label htmlFor="parent">Responsável</label>
                <input
                  name="parent"
                  type="text"
                  placeholder="Alex dos Santos"
                ></input>
              </div>
              <div>
                <label htmlFor="phone">Celular</label>
                <InputMask
                  name="phone"
                  mask="(99) 999999999"
                  placeholder="(21) 999999999"
                />
              </div>
            </>
          )}
          {GestorFunction === 'alterar' && (
            <>
              <div>
                <label htmlFor="first_name">Primeiro Nome</label>
                <input
                  type="text"
                  name="first_name"
                  placeholder={
                    SelectedStudentToModify.first_name
                      ? SelectedStudentToModify.first_name
                      : '********'
                  }
                ></input>
              </div>
              <div>
                <label htmlFor="last_name">Último Nome</label>
                <input
                  type="text"
                  name="last_name"
                  placeholder={
                    SelectedStudentToModify.last_name
                      ? SelectedStudentToModify.last_name
                      : '********'
                  }
                ></input>
              </div>
              <div>
                <label htmlFor="cpf">CPF</label>
                <InputMask
                  name="cpf"
                  mask="999.999.999-99"
                  placeholder={
                    SelectedStudentToModify.cpf
                      ? SelectedStudentToModify.cpf
                      : '********'
                  }
                />
              </div>
              <div>
                <label htmlFor="module">Módulo</label>
                <select name="module" required>
                  <option selected disabled>
                    {SelectedStudentToModify.module}
                  </option>
                  <option value={'B'}>Básico</option>
                  <option value={'P'}>Pré - Intermediário</option>
                  <option value={'I'}>Intermediário</option>
                  <option value={'A'}>Avançado</option>
                </select>
              </div>
              <div>
                <label htmlFor="address">Endereço</label>
                <input
                  type="text"
                  name="address"
                  placeholder={
                    SelectedStudentToModify.address
                      ? SelectedStudentToModify.address
                      : '********'
                  }
                ></input>
              </div>
              <div>
                <label htmlFor="cep">CEP</label>
                <InputMask
                  name="cep"
                  mask="99999-999"
                  placeholder={
                    SelectedStudentToModify.cep
                      ? SelectedStudentToModify.cep
                      : '********'
                  }
                />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  name="email"
                  type="email"
                  placeholder={
                    SelectedStudentToModify.email
                      ? SelectedStudentToModify.email
                      : '********'
                  }
                ></input>
              </div>
              <div>
                <label htmlFor="parent">Responsável</label>
                <input
                  name="parent"
                  type="text"
                  placeholder={
                    SelectedStudentToModify.parent
                      ? SelectedStudentToModify.parent
                      : '********'
                  }
                ></input>
              </div>
              <div>
                <label htmlFor="phone">Celular</label>
                <InputMask
                  name="phone"
                  mask="(99) 999999999"
                  placeholder={
                    SelectedStudentToModify.phone
                      ? SelectedStudentToModify.phone
                      : '(**) *********'
                  }
                />
              </div>
            </>
          )}
          {GestorFunction === 'remover' && (
            <>
              <div>
                <label htmlFor="cpf">CPF</label>
                <InputMask
                  mask="999.999.999-99"
                  name="cpf"
                  placeholder="999.999.999-99"
                />
              </div>
              <div>
                <label htmlFor="confirmation">Para confirmar digite {'\''}DELETAR{'\''}</label>
                <input type='text' name='confirmation' placeholder='DELETAR' />
              </div>
            </>
          )}
          <button>Confirmar</button>
        </form>
      </main>
    </modal>
  )
}

export function setAllValuesInList (divInputList) {
  const allInputValues = []
  for (let pos = 0; pos < divInputList.length - 1; pos++) {
    const inputValue = divInputList[pos].children[1].value.trim()
    if (inputValue !== '') {
      allInputValues.push(inputValue)
    } else {
      allInputValues.push(undefined)
    }
  }
  return allInputValues
}

export function setAllValuesToObject (allInputValues) {
  const allInputValuesInObject = {
    first_name: allInputValues[0],
    last_name: allInputValues[1],
    cpf: allInputValues[2],
    module: allInputValues[3],
    address: allInputValues[4],
    cep: allInputValues[5],
    email: allInputValues[6],
    parent: allInputValues[7],
    phone: allInputValues[8]
  }
  return allInputValuesInObject
}

export function closeModal () {
  const modal = document.querySelectorAll('.modal')
  for (let pos = 0; pos < modal.length; pos++) {
    modal[pos].style.display = 'none'
  }
}
