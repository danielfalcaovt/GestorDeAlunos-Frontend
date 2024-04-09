import { useEffect, useState, React } from 'react'
import Root from './Components/pages/Root'
import { AuthContext } from './Contexts/AuthContext'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Components/pages/Login'
import Register from './Components/pages/Register'
import RotasProtegidas from './Components/auth/RotasProtegidas'
import { DataContext } from './Contexts/DataContext'
import fetchUserData from './database/fetchUserData'
import Error404 from './Components/pages/Error404'
import Cookies from 'js-cookie'

function App () {
  const [auth, setAuth] = useState(false)
  const [data, setData] = useState()

  function verificarTokenJWT () {
    const token = Cookies.get('jwt')
    if (typeof token === 'string') {
      setAuth(true)
      return true
    }
  }

  async function getDataInDatabaseIfAuth () {
    try {
      const token = Cookies.get('jwt')
      if (typeof token === 'string') {
        const databaseResponse = await fetchUserData(token)
        setData(databaseResponse.data.students)
      } else {
        return false
      }
    } catch (error) {
      console.error(error)
      return false
    }
  }
  useEffect(() => {
    if (verificarTokenJWT()) {
      getDataInDatabaseIfAuth()
    }
  }, [auth])
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <RotasProtegidas>
                <DataContext.Provider value={{ data, setData }}>
                  <Root />
                </DataContext.Provider>
              </RotasProtegidas>
            }
            errorElement={<Error404 />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export function verificarValidadeDoToken (token) {
  const dataToken = new Date(token.timestamp)
  const dataInvalida = new Date(token.timestamp)
  dataInvalida.setHours(dataToken.getHours() + 8)
  const dataAtual = new Date()
  if (dataAtual >= dataInvalida) {
    localStorage.removeItem('token')
    return false
  } else {
    return true
  }
}

export default App
