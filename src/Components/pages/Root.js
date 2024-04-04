import Aside from "../Elements/Aside";
import Gestor from "../Elements/Gestor";
import Main from "../Elements/Main";
import LogoutModal from "../Elements/LogoutModal";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Contexts/AuthContext";
import { DataContext } from "../../Contexts/DataContext";
import { GestorFunctionContext } from "../../Contexts/GestorFunctionContext";
import { verificarValidadeDoToken } from "../../App";
import { StudentContext } from "../../Contexts/StudentContext";

export default function Root() {
  const [GestorFunction, setGestorFunction] = useState("consultar");
  const [SelectedStudentToModify, setSelectedStudentToModify] = useState();

  return (
      <div id="app">
        <GestorFunctionContext.Provider value={{ GestorFunction, setGestorFunction }}>
          <StudentContext.Provider
            value={{ SelectedStudentToModify, setSelectedStudentToModify }}
          >
            <Main />
            <LogoutModal />
            <Aside />
            <Gestor />
          </StudentContext.Provider>
        </GestorFunctionContext.Provider>
      </div>
  );
}
