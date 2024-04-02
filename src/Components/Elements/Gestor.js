import { useContext } from "react";
import { GestorFunctionContext } from "../../Contexts/GestorFunctionContext";
import axios from "axios";
import { StudentContext } from "../../Contexts/StudentContext";
import { DataContext } from "../../Contexts/DataContext";

export default function Gestor() {
  const { GestorFunction, setGestorFunction } = useContext(
    GestorFunctionContext
  );
  const { SelectedStudentToModify, setSelectedStudentToModifyToModify } =
    useContext(StudentContext);
  const { data, setData } = useContext(DataContext);
  const getUser = JSON.parse(localStorage.getItem("token"));
  const jwtToken = getUser.value.token;

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
        };
        let serverResponse;
        serverResponse = await axios.post(
          "http://192.168.1.67:8080/api/search",
          studentInfoToSearch,
          config
        );
        console.log(studentInfoToSearch);
        if (serverResponse.data.students) {
          if (serverResponse.data.students.length > 1) {
            setData(serverResponse.data.students);
            closeModal();
          } else {
            setData(serverResponse.data.students[0]);
            closeModal();
          }
        } else {
          alert("Estudante não encontrado.");
        }
      } else if (GestorFunction === "cadastrar") {
        const divInputList = evt.target.children;
        const allInputValues = setAllValuesInList(divInputList);
        const allInputValuesInObject = setAllValuesToObject(allInputValues);
        const serverResponse = await axios.post(
          "http://192.168.1.67:8080/api/register",
          allInputValuesInObject,
          config
        );
        console.log(serverResponse);
        window.location.reload();
      } else if (GestorFunction === "alterar") {
        const divInputList = evt.target.children;
        const allInputValues = setAllValuesInList(divInputList);
        const allInputValuesInObject = setAllValuesToObject(allInputValues);
        allInputValuesInObject.student_id = SelectedStudentToModify.student_id;
        const serverResponse = await axios.patch(
          "http://192.168.1.67:8080/api/update",
          allInputValuesInObject,
          config
        );
        console.log(serverResponse);
        window.location.reload();
      } else if (GestorFunction === "remover") {
        const studentCpf = evt.target.cpf.value;
        const serverResponse = await axios.delete(
          `http://192.168.1.67:8080/api/delete/${studentCpf}`,
          config
        );
        if (serverResponse.data.student) {
          alert("Estudante removido com sucesso.");
          window.location.reload();
        }
      }
    } catch (error) {
      console.error(error);
      alert(error.response.data.error);
    }
  }

  function setAllValuesInList(divInputList) {
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

  function setAllValuesToObject(allInputValues) {
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
  return (
    <modal id="gestor-modal">
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
                <input
                  name="cpf"
                  type="number"
                  maxLength={11}
                  placeholder="00000000000"
                ></input>
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
                <input
                  name="cpf"
                  type="number"
                  maxLength={11}
                  placeholder="00000000000"
                  required
                ></input>
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
                <input
                  name="cep"
                  type="number"
                  maxLength={8}
                  placeholder="26000000"
                ></input>
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
                <label htmlFor="parent_name">Responsável</label>
                <input
                  name="parent_name"
                  type="text"
                  placeholder="Alex dos Santos"
                ></input>
              </div>
              <div>
                <label htmlFor="phone">Celular</label>
                <input
                  name="phone"
                  type="number"
                  maxLength={11}
                  placeholder="21987654321"
                ></input>
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
                      : "Indefinido"
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
                      : "Indefinido"
                  }
                ></input>
              </div>
              <div>
                <label htmlFor="cpf">CPF</label>
                <input
                  name="cpf"
                  type="number"
                  maxLength={11}
                  placeholder={
                    SelectedStudentToModify.cpf
                      ? SelectedStudentToModify.cpf
                      : "Indefinido"
                  }
                ></input>
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
                      : "Indefinido"
                  }
                ></input>
              </div>
              <div>
                <label htmlFor="cep">CEP</label>
                <input
                  name="cep"
                  type="number"
                  maxLength={8}
                  placeholder={
                    SelectedStudentToModify.cep
                      ? SelectedStudentToModify.cep
                      : "Indefinido"
                  }
                ></input>
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  name="email"
                  type="email"
                  placeholder={
                    SelectedStudentToModify.email
                      ? SelectedStudentToModify.email
                      : "Indefinido"
                  }
                ></input>
              </div>
              <div>
                <label htmlFor="parent_name">Responsável</label>
                <input
                  name="parent_name"
                  type="text"
                  placeholder={
                    SelectedStudentToModify.parent
                      ? SelectedStudentToModify.parent
                      : "Indefinido"
                  }
                ></input>
              </div>
              <div>
                <label htmlFor="phone">Celular</label>
                <input
                  name="phone"
                  type="number"
                  maxLength={11}
                  placeholder={
                    SelectedStudentToModify.phone
                      ? SelectedStudentToModify.phone
                      : "Indefinido"
                  }
                ></input>
              </div>
            </>
          )}

          {GestorFunction === "remover" && (
            <>
              <div>
                <label htmlFor="cpf">CPF</label>
                <input
                  name="cpf"
                  type="number"
                  maxLength={11}
                  placeholder="00000000000"
                ></input>
              </div>
            </>
          )}
          <button>Confirmar</button>
        </form>
      </main>
    </modal>
  );
}

function closeModal() {
  var modal = document.querySelector("#gestor-modal");
  modal.style.display = "none";
}
