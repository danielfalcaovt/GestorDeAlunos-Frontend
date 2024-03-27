import { useEffect, useState } from "react";
import Root from "./Components/pages/Root";
import React from "react";
import { AuthContext } from "./Contexts/AuthContext";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Login from "./Components/pages/Login";
import Register from "./Components/pages/Register";
import Main from "./Components/Elements/Main";
import RotasProtegidas from "./Components/auth/RotasProtegidas";
import { DataContext } from "./Contexts/DataContext";
import fetchUserData from "./database/fetchUserData";

export function verificarValidadeDoToken(token) {
  let dataToken = new Date(token.timestamp);
  let dataInvalida = new Date(token.timestamp);
  dataInvalida.setHours(dataToken.getHours() + 8);
  let dataAtual = new Date();
  if (dataAtual >= dataInvalida) {
    localStorage.removeItem("token");
    return false;
  } else {
    return true;
  }
}

function App() {
  const [auth, setAuth] = useState(false);
  const [data, setData] = useState();

  function verificarTokenJWT() {
    const authorized = JSON.parse(localStorage.getItem("token"));
    if (authorized) {
      if (verificarValidadeDoToken(authorized)) {
        setAuth(true);
        return true;
      }
    }
  }

  async function getDataInDatabaseIfAuth() {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      if (verificarValidadeDoToken(token)) {
        const databaseResponse = await fetchUserData(token.value.token);
        console.log(databaseResponse.data);
        setData(databaseResponse.data.students);
      } else {
        return false;
      }
    } catch (error) {
      console.error(error.message);
      return false;
    }
  }
  useEffect(() => {
    if (verificarTokenJWT()) {
      getDataInDatabaseIfAuth();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      <DataContext.Provider value={{ data, setData }}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <RotasProtegidas>
                  <Root />
                </RotasProtegidas>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
      </DataContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
