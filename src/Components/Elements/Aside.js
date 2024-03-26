export default function Aside() {
  function logOut() {
    var modal = document.querySelector("modal");
    modal.style.display = "flex";
  };

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
          <div>
            <h1>Consultar Aluno</h1>
          </div>
          <div>
            <h1>Cadastrar Aluno</h1>
          </div>
          <div>
            <h1>Alterar Aluno</h1>
          </div>
          <div>
            <h1>Remover Aluno</h1>
          </div>
        </nav>
      </section>
      <button onClick={logOut}>Sair</button>
    </aside>  
  )
};
