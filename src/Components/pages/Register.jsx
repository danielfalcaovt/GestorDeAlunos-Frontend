import { useContext, useEffect, React } from 'react'
import { AuthContext } from '../../Contexts/AuthContext'
import { useNavigate } from 'react-router'
import axios from 'axios'

export default function Register () {
  const { auth } = useContext(AuthContext)
  const navigate = useNavigate()

  async function handleSubmit (evt) {
    try {
      evt.preventDefault()
      const divInputList = evt.target.children
      const allInputValuesInObject = setAllInputValuesToObject(divInputList)
      const registeredUser = await axios.post(
        'http://192.168.1.67:8080/register',
        allInputValuesInObject
      )
      if (registeredUser.data.user) {
        navigate('/login')
      } else {
        alert('Tente novamente...')
        return false
      }
    } catch (err) {
      alert(err.response.data.error)
      return err.message
    }
  }

  function setAllInputValuesToObject (inputList) {
    const inputValues = {}

    for (let pos = 0; pos < inputList.length - 1; pos++) {
      inputValues[inputList[pos].name] = inputList[pos].value
    }

    if (!emailRegexTest(inputValues.email)) {
      return false
    }

    if (!confirmEmail(inputValues.email, inputValues.confirmEmail)) {
      return false
    }

    if (!confirmPassword(inputValues.password, inputValues.confirmPassword)) {
      return false
    }

    return inputValues
  }

  function emailRegexTest (email) {
    const regex = /^[\w\-.]+@([\w-]+\.)+[\w-]{2,}$/gm
    if (regex.test(email)) {
      return true
    } else {
      return false
    }
  }

  function confirmEmail (email, confirmEmail) {
    if (email === confirmEmail) {
      return true
    } else {
      return false
    }
  }

  function confirmPassword (password, confirmPassword) {
    if (password === confirmPassword) {
      return true
    } else {
      return false
    }
  }

  function handleAuth () {
    if (auth !== false) {
      navigate('/')
    }
  }

  useEffect(() => {
    handleAuth()
  }, [auth])

  return (
    <div id="login-page">
      <section id="login-landing">
        <img id="logo" src="./logo.png" alt="english faster" />
        <h1 id="landing-text">Gestor de Alunos</h1>
      </section>
      <section id="login-form">
        <header>
          <h1>Registro</h1>
        </header>
        <main>
          <form
            onSubmit={handleSubmit}
            method="POST"
            action="/"
            id="formularioDeLogin"
          >
            <input
              autoFocus={true}
              type="text"
              placeholder="Nome de Usuário"
              name="username"
              required
            ></input>
            <input
              autoFocus={true}
              type="text"
              placeholder="Email"
              name="email"
              required
            ></input>
            <input
              autoFocus={true}
              type="text"
              placeholder="Confirmar email"
              name="confirmEmail"
              required
            ></input>
            <input
              type="password"
              name="password"
              placeholder="Senha"
              required
            ></input>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirmar senha"
              required
            ></input>
            <button>Enviar</button>
          </form>
        </main>
      </section>
    </div>
  )
}
