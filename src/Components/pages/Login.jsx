import { useContext, useEffect, React } from 'react'
import fetchLogin from '../../database/fetchLogin'
import { AuthContext } from '../../Contexts/AuthContext'
import { useNavigate } from 'react-router'
import Cookies from 'js-cookie'
import { Link } from 'react-router-dom'

export default function Login () {
  const { auth, setAuth } = useContext(AuthContext)
  const navigate = useNavigate()

  async function handleSubmit (evt) {
    try {
      evt.preventDefault()
      const emailInput = evt.target.children[0]
      const passwordInput = evt.target.children[1]

      const response = await fetchLogin(emailInput.value.trim(), passwordInput.value.trim())
      if (response !== false) {
        Cookies.set('jwt', response.token, { expires: 0.3 })
        Cookies.set('user', response.user.username, { expires: 0.3 })
        setAuth(response)
        emailInput.classList.remove('wrong')
        passwordInput.classList.remove('wrong')
      } else {
        setAuth(false)
        emailInput.classList.add('wrong')
        passwordInput.classList.add('wrong')
        alert('Email e/ou senha incorretos.')
      }
    } catch (error) {
      console.log(error)
      return error.message
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
      <Link to="/register">
        <img id="logo" src="./logo.png" alt="english faster" />
      </Link>
        <h1 id="landing-text">Gestor de Alunos</h1>
      </section>
      <section id="login-form">
        <header>
          <h1>Login</h1>
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
              placeholder="Email"
              required
            ></input>
            <input type="password" placeholder="Senha" required></input>
            <button>Enviar</button>
          </form>
        </main>
      </section>
    </div>
  )
}
