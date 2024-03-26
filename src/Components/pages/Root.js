import Aside from "../Elements/Aside"
import Gestor from "../Elements/Gestor"
import Main from "../Elements/Main";
import Modal from "../Elements/Modal";
import { useContext } from "react";
import { AuthContext } from "../../Contexts/AuthContext";

export default function Root() {
  const {auth, setAuth} = useContext(AuthContext);
  console.log(auth);

  return (
    <div id="app">
      <Aside />
      <Main />
      <Modal />
      <Gestor />
    </div>
  )
}