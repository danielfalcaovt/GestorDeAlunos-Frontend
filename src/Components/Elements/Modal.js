export default function Modal() {

  function logOutConfirm(evt) {
    var modal = document.querySelector("modal");
    if (evt.target.id === "confirmar"){
      localStorage.removeItem("token");
      window.location.reload()
    }else {
      modal.style.display = "none";
    }
  }

  return(
    <modal>
      <div id="modal-content">
        <header>
          <h1>Você tem certeza?</h1>
        </header>
        <main>
          <button onClick={logOutConfirm} id="confirmar">Sim</button>
          <button onClick={logOutConfirm} id="negar">Não</button>
        </main>
      </div>
    </modal>
  );
};