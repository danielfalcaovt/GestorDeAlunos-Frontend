import { Navigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContext";

export default function RotasProtegidas({children}) {
  const { auth, setAuth } = useContext(AuthContext);

  return auth ? children : <Navigate to="/login"/>
};