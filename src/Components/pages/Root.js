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
import { StudentContext } from "../../Contexts/StudentContext";

export default function Root() {
  const [GestorFunction, setGestorFunction] = useState("consultar");
  const [SelectedStudent, setSelectedStudent] = useState();

  return (
    <div id="app">
      <GestorFunctionContext.Provider value={{ GestorFunction, setGestorFunction }}>
        <StudentContext.Provider value={{ SelectedStudent, setSelectedStudent }}>
          <Main />
          <LogoutModal />
          <Aside />
          <Gestor />
        </StudentContext.Provider>
      </GestorFunctionContext.Provider>
    </div>
  );
}
