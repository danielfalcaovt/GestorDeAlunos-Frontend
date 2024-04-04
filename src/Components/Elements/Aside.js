import { useContext } from "react";
import { GestorFunctionContext } from "../../Contexts/GestorFunctionContext";

export default function Aside() {
  const { GestorFunction, setGestorFunction } = useContext(GestorFunctionContext);
  const getUser = JSON.parse(localStorage.getItem("token"));
  const loggedUser = getUser.value.user.username;

  function logOut() {
    var modal = document.querySelector("modal");
    modal.style.display = "flex";
  }
  
  function alterarFuncaoDoModal(botaoPressionado) {
    const funcaoDoModal = botaoPressionado.target.classList[1];
    setGestorFunction(funcaoDoModal);
  };
  
  function openGestorModal(botaoPressionado) {
    alterarFuncaoDoModal(botaoPressionado);
    var gestorModal = document.querySelector("#gestor-modal");
    gestorModal.style.display = "flex";
  };

  return (
    <aside>
      <section id="landing">
        <div id="logo">
          <img onClick={()=>{window.location.reload()}} src="./logo.png" alt="English Faster" />
          <h1>{loggedUser}</h1>
        </div>
      </section>
      <section id="alunos">
        <header>
          <h1>Alunos</h1>
        </header>
        <nav>
          <button onClick={openGestorModal} className="crud-alunos consultar">
            Consultar Aluno
          </button>
          <button onClick={openGestorModal} className="crud-alunos cadastrar">
            Cadastrar Aluno
          </button>
          <button onClick={openGestorModal} className="crud-alunos remover">
            Remover Aluno
          </button>
        </nav>
      </section>
      <button id="logout" onClick={logOut}>
        Sair
      </button>
    </aside>
  );
}
