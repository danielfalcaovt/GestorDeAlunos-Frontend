import { useContext, useEffect, useState } from "react";
import fetchLogin from "../../database/fetchLogin";
import { AuthContext } from "../../Contexts/AuthContext";
import { useNavigate } from "react-router";

export default function Login() {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleSubmit(evt) {
    try {
      evt.preventDefault();
      const username = evt.target.children[0].value;
      const password = evt.target.children[1].value;

      const response = await fetchLogin(username, password);
      if (response !== false) {
        setAuth(response);
        var authorized = {
          value: response,
          timestamp: new Date().getTime()
        };
        localStorage.setItem("token", JSON.stringify(authorized));
      } else {
        setAuth(false);
        console.error("Errado");
      }
    } catch (error) {
      return error.message;
    };
  };

  function handleAuth() {
    if(auth !== false) {
      navigate("/");
    };
  };

  useEffect(()=>{
    handleAuth();
  }, [auth]);

  return (
    <div id="login-page">
      <section id="login-landing">
        <img id="logo" src="./logo.png" alt="english faster"/>
        <h1 id="landing-text">Gestor de Alunos</h1>
      </section>
      <section id="login-form">
        <header>
          <h1>Login Page</h1>
        </header>
        <main>
          <form
            onSubmit={handleSubmit}
            method="POST"
            action="/"
            id="formularioDeLogin"
          >
            <input
              autoFocus={true}
              type="text"
              placeholder="Nome de Usuário"
            ></input>
            <input type="password" placeholder="Senha"></input>
            <button>Enviar</button>
          </form>
        </main>
      </section>
    </div>
  );
}
