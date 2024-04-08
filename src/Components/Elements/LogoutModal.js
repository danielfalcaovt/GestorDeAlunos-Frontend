import React from 'react'

export default function LogoutModal () {
  function logOutConfirm (evt) {
    const modal = document.querySelector('#logout-modal')
    if (evt.target.id === 'confirmar') {
      localStorage.removeItem('token')
      window.location.reload()
    } else {
      modal.style.display = 'none'
    }
  }

  return (
    <modal className="modal" id="logout-modal">
      <div id="modal-content">
        <header>
          <h1>Atenção</h1>
          <h2>Você deseja mesmo sair da sessão ?</h2>
        </header>
        <main>
          <button onClick={logOutConfirm} id="confirmar">
            Sair
          </button>
          <button onClick={logOutConfirm} id="negar">
            Cancelar
          </button>
        </main>
      </div>
    </modal>
  )
}
