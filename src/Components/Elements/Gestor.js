import InputMask from "react-input-mask";
import { useContext, useState } from "react";
import { GestorFunctionContext } from "../../Contexts/GestorFunctionContext";
import { StudentContext } from "../../Contexts/StudentContext";
import { DataContext } from "../../Contexts/DataContext";
import deleteStudentQuery from "./CRUD/deleteStudentQuery";
import patchStudentQuery from "./CRUD/patchStudentQuery";
import registerStudentQuery from "./CRUD/registerStudentQuery";
import readStudentQuery from "./CRUD/readStudentQuery";

export default function Gestor() {
  const { GestorFunction, setGestorFunction } = useContext(GestorFunctionContext);
  const { SelectedStudentToModify, setSelectedStudentToModify } = useContext(StudentContext);
  const { data, setData } = useContext(DataContext);
  const getUser = JSON.parse(localStorage.getItem("token"));
  const jwtToken = getUser.value.token;
  
  // Fechar modal ao pressionar "ESC"
  document.addEventListener("keydown", (evt) => {
    if (evt.key === "Escape") {
      closeModal();
    }
  });
  
  async function submitDataFromForm(evt) {
    try {
      evt.preventDefault();

      const config = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      };
      if (GestorFunction === "consultar") {
        const studentInfoToSearch = {
          first_name: evt.target.first_name.value,
          cpf: evt.target.cpf.value,
          module: evt.target.module.value,
          parent: evt.target.parent.value
        };
        const foundStudent = await readStudentQuery(studentInfoToSearch, config);
        if (!foundStudent) {
          alert("Estudante não encontrado.");
        }else{
          setData(foundStudent);
        }
      } else if (GestorFunction === "cadastrar") {
        const divInputList = evt.target.children;
        await registerStudentQuery(divInputList, config);
      } else if (GestorFunction === "alterar") {
        const inputValuesList = evt.target.children;
        await patchStudentQuery(inputValuesList, SelectedStudentToModify.student_id, config);
      } else if (GestorFunction === "remover") {
        const studentCpf = evt.target.cpf.value;
        await deleteStudentQuery(studentCpf, config);
      }
    } catch (error) {
      console.error(error);
      alert(
        error.response.data.error
      );
    }
  }

  return (
    <modal className="modal" id="gestor-modal">
      <main id="gestor-content">
        <button onClick={closeModal} id="gestor-close">
          x
        </button>
        <h1>{GestorFunction.toUpperCase()}</h1>
        <form
          onSubmit={submitDataFromForm}
          method="POST"
          action="/"
          id="gestor-form"
        >
          {GestorFunction === "consultar" && (
            <>
              <div>
                <label htmlFor="first_name">Primeiro Nome</label>
                <input
                  type="text"
                  name="first_name"
                  placeholder="Daniel"
                ></input>
              </div>
              <div>
                <label htmlFor="cpf">CPF</label>
                <InputMask
                  name="cpf"
                  mask="999.999.999-99"
                  placeholder="999.999.999-99"
                />
              </div>
              <div>
                <label htmlFor="module">Módulo</label>
                <select name="module" required>
                  <option selected>Desconhecido</option>
                  <option>Básico</option>
                  <option>Pré - Intermediário</option>
                  <option>Intermediário</option>
                  <option>Avançado</option>
                </select>
              </div>
              <div>
                <label htmlFor="parent">Responsável</label>
                <input
                  name="parent"
                  type="text"
                  placeholder="Alex dos Santos"
                ></input>
              </div>
            </>
          )}

          {GestorFunction === "cadastrar" && (
            <>
              <div>
                <label htmlFor="first_name">Primeiro Nome</label>
                <input
                  type="text"
                  name="first_name"
                  placeholder="Daniel"
                  required
                ></input>
              </div>
              <div>
                <label htmlFor="last_name">Último Nome</label>
                <input
                  type="text"
                  name="last_name"
                  placeholder="Falcão"
                  required
                ></input>
              </div>
              <div>
                <label htmlFor="cpf">CPF</label>
                <InputMask
                  mask="999.999.999-99"
                  placeholder="999.999.999-99"
                  name="cpf"
                />
              </div>
              <div>
                <label htmlFor="module">Módulo</label>
                <select name="module" required>
                  <option selected disabled>
                    ---- Selecionar ----
                  </option>
                  <option value={"B"}>Básico</option>
                  <option value={"P"}>Pré - Intermediário</option>
                  <option value={"I"}>Intermediário</option>
                  <option value={"A"}>Avançado</option>
                </select>
              </div>
              <div>
                <label htmlFor="address">Endereço</label>
                <input
                  type="text"
                  name="address"
                  placeholder="Av. Anhanguera, N° 18"
                ></input>
              </div>
              <div>
                <label htmlFor="cep">CEP</label>
                <InputMask
                  name="cep"
                  mask="99999-999"
                  placeholder="26000-000"
                />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  name="email"
                  type="email"
                  placeholder="daniel@gmail.com"
                ></input>
              </div>
              <div>
                <label htmlFor="parent">Responsável</label>
                <input
                  name="parent"
                  type="text"
                  placeholder="Alex dos Santos"
                ></input>
              </div>
              <div>
                <label htmlFor="phone">Celular</label>
                <InputMask
                  name="phone"
                  mask="(99) 999999999"
                  placeholder="(21) 999999999"
                />
              </div>
            </>
          )}
          {GestorFunction === "alterar" && (
            <>
              <div>
                <label htmlFor="first_name">Primeiro Nome</label>
                <input
                  type="text"
                  name="first_name"
                  placeholder={
                    SelectedStudentToModify.first_name
                      ? SelectedStudentToModify.first_name
                      : "********"
                  }
                ></input>
              </div>
              <div>
                <label htmlFor="last_name">Último Nome</label>
                <input
                  type="text"
                  name="last_name"
                  placeholder={
                    SelectedStudentToModify.last_name
                      ? SelectedStudentToModify.last_name
                      : "********"
                  }
                ></input>
              </div>
              <div>
                <label htmlFor="cpf">CPF</label>
                <InputMask
                  name="cpf"
                  mask="999.999.999-99"
                  placeholder={
                    SelectedStudentToModify.cpf
                      ? SelectedStudentToModify.cpf
                      : "********"
                  }
                />
              </div>
              <div>
                <label htmlFor="module">Módulo</label>
                <select name="module" required>
                  <option selected disabled>
                    {SelectedStudentToModify.module}
                  </option>
                  <option value={"B"}>Básico</option>
                  <option value={"P"}>Pré - Intermediário</option>
                  <option value={"I"}>Intermediário</option>
                  <option value={"A"}>Avançado</option>
                </select>
              </div>
              <div>
                <label htmlFor="address">Endereço</label>
                <input
                  type="text"
                  name="address"
                  placeholder={
                    SelectedStudentToModify.address
                      ? SelectedStudentToModify.address
                      : "********"
                  }
                ></input>
              </div>
              <div>
                <label htmlFor="cep">CEP</label>
                <InputMask
                  name="cep"
                  mask="99999-999"
                  placeholder={
                    SelectedStudentToModify.cep
                      ? SelectedStudentToModify.cep
                      : "********"
                  }
                />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  name="email"
                  type="email"
                  placeholder={
                    SelectedStudentToModify.email
                      ? SelectedStudentToModify.email
                      : "********"
                  }
                ></input>
              </div>
              <div>
                <label htmlFor="parent">Responsável</label>
                <input
                  name="parent"
                  type="text"
                  placeholder={
                    SelectedStudentToModify.parent
                      ? SelectedStudentToModify.parent
                      : "********"
                  }
                ></input>
              </div>
              <div>
                <label htmlFor="phone">Celular</label>
                <InputMask
                  name="phone"
                  mask="(99) 999999999"
                  placeholder="(**) *********"
                />
              </div>
            </>
          )}
          {GestorFunction === "remover" && (
            <>
              <div>
                <label htmlFor="cpf">CPF</label>
                <InputMask
                  mask="999.999.999-99"
                  name="cpf"
                  placeholder="999.999.999-99"
                />
              </div>
            </>
          )}
          <button>Confirmar</button>
        </form>
      </main>
    </modal>
  );
}

export function setAllValuesInList(divInputList) {
  const allInputValues = [];
  for (let pos = 0; pos < divInputList.length - 1; pos++) {
    const inputValue = divInputList[pos].children[1].value.trim();
    if (inputValue !== "") {
      allInputValues.push(inputValue);
    } else {
      allInputValues.push(undefined);
    }
  }
  return allInputValues;
}

export function setAllValuesToObject(allInputValues) {
  const allInputValuesInObject = {
    first_name: allInputValues[0],
    last_name: allInputValues[1],
    cpf: allInputValues[2],
    module: allInputValues[3],
    address: allInputValues[4],
    cep: allInputValues[5],
    email: allInputValues[6],
    parent: allInputValues[7],
    phone: allInputValues[8],
  };
  return allInputValuesInObject;
}

export function closeModal() {
  var modal = document.querySelectorAll(".modal");
  for (let pos = 0; pos < modal.length; pos++){
    modal[pos].style.display = "none";
  }
}
