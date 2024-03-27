import { useContext } from "react";
import { GestorFunctionContext } from "../../Contexts/GestorFunctionContext";

function closeModal() {
  var modal = document.querySelector("#gestor-modal");
  modal.style.display = "none";
}

export default function Gestor() {
  const { GestorFunction, setGestorFunction } = useContext(
    GestorFunctionContext
  );

    function submitData(evt) {
      evt.preventDefault();
      
    }

  return (
    <modal id="gestor-modal">
      <main id="gestor-content">
        <button onClick={closeModal} id="gestor-close">
          x
        </button>
        <h1>{GestorFunction.toUpperCase()}</h1>
        <form onSubmit={submitData} method="POST" action="/" id="gestor-form">
          <input type="text" placeholder="Primeiro Nome" required></input>
          <input type="text" placeholder="Ultimo Nome" required></input>
          <input type="number" maxLength={11} placeholder="CPF: XXXXXXXXXXX" required></input>
          <select required>
            <option selected disabled>
              ---- Selecionar ----
            </option>
            <option value={"basico"}>Básico</option>
            <option value={"preintermediario"}>Pré - Intermediário</option>
            <option value={"intermediario"}>Intermediário</option>
            <option value={"avancado"}>Avançado</option>
          </select>
          <input type="text" placeholder="Endereço"></input>
          <input type="number" maxLength={8} placeholder="CEP: XXXXXXXX"></input>
          <input type="email" placeholder="Email"></input>
          <input type="text" placeholder="Responsável"></input>
          <input type="number" maxLength={11} placeholder="Celular"></input>
          <button>Confirmar</button>
        </form>
      </main>
    </modal>
  );
}
