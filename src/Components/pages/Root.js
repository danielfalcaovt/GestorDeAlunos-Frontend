import Aside from "../Elements/Aside";
import Gestor from "../Elements/Gestor";
import Main from "../Elements/Main";
import LogoutModal from "../Elements/LogoutModal";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import { DataContext } from "../../Contexts/DataContext";
import { GestorFunctionContext } from "../../Contexts/GestorFunctionContext";
import { verificarValidadeDoToken } from "../../App";
import fetchUserData from "../../database/fetchUserData";

export default function Root() {
  const [GestorFunction, setGestorFunction] = useState("consultar");

  return (
    <div id="app">
      <Main />
      <LogoutModal />
      <GestorFunctionContext.Provider value={{ GestorFunction, setGestorFunction }}>
        <Aside />
        <Gestor />
      </GestorFunctionContext.Provider>
    </div>
  );
}
