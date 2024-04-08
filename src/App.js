import { useEffect, useState } from "react";
import Root from "./Components/pages/Root";
import React from "react";
import { AuthContext } from "./Contexts/AuthContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Components/pages/Login";
import Register from "./Components/pages/Register";
import RotasProtegidas from "./Components/auth/RotasProtegidas";
import { DataContext } from "./Contexts/DataContext";
import fetchUserData from "./database/fetchUserData";
import Error404 from "./Components/pages/Error404";

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
  }, [auth]);
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
            errorElement  ={<Error404 />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

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

export default App;
