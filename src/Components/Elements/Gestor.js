import { useContext } from "react";
import { GestorFunctionContext } from "../../Contexts/GestorFunctionContext";
import axios from "axios";
import { StudentContext } from "../../Contexts/StudentContext";

function closeModal() {
  var modal = document.querySelector("#gestor-modal");
  modal.style.display = "none";
}

export default function Gestor() {
  const { GestorFunction, setGestorFunction } = useContext(
    GestorFunctionContext
  );
  const { SelectedStudent, setSelectedStudent } = useContext(StudentContext);
  const getUser = JSON.parse(localStorage.getItem("token"));
  const jwtToken = getUser.value.token;

  document.addEventListener("keydown", (evt)=>{
    if (evt.key === "Escape") {
      closeModal();
    }
  })

  async function submitDataFromForm(evt) {
    try {
      evt.preventDefault();
      console.log(GestorFunction);
      console.log(SelectedStudent);
      if (GestorFunction === "consultar" || GestorFunction === "remover") {
        console.log('ue');
        console.log(evt.target.children[0].children[1].value);
      } else if (GestorFunction === "cadastrar") {
        const divInputList = evt.target.children;
        const allInputValues = [];
        for (let pos = 0; pos < divInputList.length - 1; pos++) {
          const inputValue = divInputList[pos].children[1].value.trim();
          if (inputValue !== "") {
            allInputValues.push(inputValue);
          } else {
            allInputValues.push(undefined);
          }
        }
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
        const config = {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        };
        const serverResponse = await axios.post(
          "http://localhost:8080/api/register",
          allInputValuesInObject,
          config
        );
        window.location.reload();
      } else if (GestorFunction === "alterar") {
        const divInputList = evt.target.children;
        const allInputValues = setAllValuesInList(divInputList);
        const allInputValuesInObject = setAllValuesToObject(allInputValues);
        allInputValuesInObject.student_id = SelectedStudent.student_id;
        const config = {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        };
        const serverResponse = await axios.patch("http://localhost:8080/api/update", allInputValuesInObject, config);
        console.log(serverResponse);
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      alert("Erro interno do servidor.");
      closeModal();
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
    };
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
          {(GestorFunction === "consultar" || GestorFunction === "remover") && (
            <div>
              <label for="cpf">CPF</label>
              <input
                name="cpf"
                type="number"
                maxLength={11}
                placeholder="00000000000"
                required
              ></input>
            </div>
          )}

          {(GestorFunction === "cadastrar") && (
            <>
              <div>
                <label for="first_name">Primeiro Nome</label>
                <input
                  type="text"
                  name="first_name"
                  placeholder="Daniel"
                  required
                ></input>
              </div>
              <div>
                <label for="last_name">Último Nome</label>
                <input
                  type="text"
                  name="last_name"
                  placeholder="Falcão"
                  required
                ></input>
              </div>
              <div>
                <label for="cpf">CPF</label>
                <input
                  name="cpf"
                  type="number"
                  maxLength={11}
                  placeholder="00000000000"
                  required
                ></input>
              </div>
              <div>
                <label for="module">Módulo</label>
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
                <label for="address">Endereço</label>
                <input
                  type="text"
                  name="address"
                  placeholder="Av. Anhanguera, N° 18"
                ></input>
              </div>
              <div>
                <label for="cep">CEP</label>
                <input
                  name="cep"
                  type="number"
                  maxLength={8}
                  placeholder="26000000"
                ></input>
              </div>
              <div>
                <label for="email">Email</label>
                <input
                  name="email"
                  type="email"
                  placeholder="daniel@gmail.com"
                ></input>
              </div>
              <div>
                <label for="parent_name">Responsável</label>
                <input
                  name="parent_name"
                  type="text"
                  placeholder="Alex dos Santos"
                ></input>
              </div>
              <div>
                <label for="phone">Celular</label>
                <input
                  name="phone"
                  type="number"
                  maxLength={11}
                  placeholder="21987654321"
                ></input>
              </div>
            </>
          )}
          {(GestorFunction === "alterar") && (
            <>
              <div>
                <label for="first_name">Primeiro Nome</label>
                <input
                  type="text"
                  name="first_name"
                  placeholder={SelectedStudent.first_name ? SelectedStudent.first_name : "Indefinido"}
                ></input>
              </div>
              <div>
                <label for="last_name">Último Nome</label>
                <input
                  type="text"
                  name="last_name"
                  placeholder={SelectedStudent.last_name ? SelectedStudent.last_name : "Indefinido"}
                ></input>
              </div>
              <div>
                <label for="cpf">CPF</label>
                <input
                  name="cpf"
                  type="number"
                  maxLength={11}
                  placeholder={SelectedStudent.cpf ? SelectedStudent.cpf : "Indefinido"}
                ></input>
              </div>
              <div>
                <label for="module">Módulo</label>
                <select name="module" required>
                  <option selected disabled>
                    {SelectedStudent.module}
                  </option>
                  <option value={"B"}>Básico</option>
                  <option value={"P"}>Pré - Intermediário</option>
                  <option value={"I"}>Intermediário</option>
                  <option value={"A"}>Avançado</option>
                </select>
              </div>
              <div>
                <label for="address">Endereço</label>
                <input
                  type="text"
                  name="address"
                  placeholder={SelectedStudent.address ? SelectedStudent.address : "Indefinido"}
                ></input>
              </div>
              <div>
                <label for="cep">CEP</label>
                <input
                  name="cep"
                  type="number"
                  maxLength={8}
                  placeholder={SelectedStudent.cep ? SelectedStudent.cep : "Indefinido"}
                ></input>
              </div>
              <div>
                <label for="email">Email</label>
                <input
                  name="email"
                  type="email"
                  placeholder={SelectedStudent.email ? SelectedStudent.email : "Indefinido"}
                ></input>
              </div>
              <div>
                <label for="parent_name">Responsável</label>
                <input
                  name="parent_name"
                  type="text"
                  placeholder={SelectedStudent.parent ? SelectedStudent.parent : "Indefinido"}
                ></input>
              </div>
              <div>
                <label for="phone">Celular</label>
                <input
                  name="phone"
                  type="number"
                  maxLength={11}
                  placeholder={SelectedStudent.phone ? SelectedStudent.phone : "Indefinido"}
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
