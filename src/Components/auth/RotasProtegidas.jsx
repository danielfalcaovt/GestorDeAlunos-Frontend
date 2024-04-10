/* eslint-disable react/prop-types */
import { Navigate } from 'react-router'
import { useContext, React } from 'react'
import { AuthContext } from '../../Contexts/AuthContext'

export default function RotasProtegidas ({ children }) {
  const { auth } = useContext(AuthContext)

  return auth ? children : <Navigate to="/login" />
}
