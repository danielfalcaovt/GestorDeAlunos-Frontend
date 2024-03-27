import { useContext } from "react";
import { DataContext } from "../../Contexts/DataContext";
import { GestorFunctionContext } from "../../Contexts/GestorFunctionContext";

export default function Aside() {
  const { data, setData } = useContext(DataContext);
  const { GestorFunction, setGestorFunction } = useContext(GestorFunctionContext);

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
    var modal = document.querySelector("#gestor-modal");
    modal.style.display = "flex";
  }

  return (
    <aside>
      <section id="landing">
        <div id="logo">
          <img src="./logo.png" alt="English Faster" />
          <h1>Felipe Cardoso</h1>
          <h2>Identificador: 01</h2>
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
          <button onClick={openGestorModal} className="crud-alunos alterar">
            Alterar Aluno
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
