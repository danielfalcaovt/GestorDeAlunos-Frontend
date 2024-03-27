export default function LogoutModal() {

  function logOutConfirm(evt) {
    var modal = document.querySelector("#logout-modal");
    if (evt.target.id === "confirmar"){
      localStorage.removeItem("token");
      window.location.reload()
    }else {
      modal.style.display = "none";
    }
  }

  return(
    <modal id="logout-modal">
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