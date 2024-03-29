import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../Contexts/DataContext";
import { AuthContext } from "../../Contexts/AuthContext";
import { GestorFunctionContext } from "../../Contexts/GestorFunctionContext";
import { StudentContext } from "../../Contexts/StudentContext";

export default function Main() {
  const { auth, setAuth } = useContext(AuthContext);
  const { data, setData } = useContext(DataContext);
  const { GestorFunction, setGestorFunction } = useContext(GestorFunctionContext);
  const { selectedStudent, setSelectedStudent } = useContext(StudentContext);

  function handleClickOnStudent(student) {
    setSelectedStudent(student);
    setGestorFunction("alterar");
    var gestorModal = document.querySelector("#gestor-modal");
    gestorModal.style.display = "flex";
  };

  return (
    <main>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>ALUNO</th>
            <th>CPF</th>
            <th>EMAIL</th>
            <th>CEP / ENDEREÇO</th>
            <th>CELULAR</th>
            <th>RESPONSÁVEL</th>
            <th>MÓDULO</th>
          </tr>
        </thead>
        <tbody>
          {data && data.map((student) => {
            return (
              <tr key={student.student_id} onClick={()=>{
                handleClickOnStudent(student);                
              }}>
                <td>1</td>
                <td>{`${student.first_name} ${student.last_name}`}</td>
                <td>{student.cpf}</td>
                <td>{student.email ? student.email : "********"}</td>
                <td className="cep-cell">{student.cep && `${student.cep} -`} {(student.address || student.cep) ? student.address : "Não informado."}</td>
                <td>{student.phone ? student.phone : "********"}</td>
                <td>{student.parent ? student.parent : "********"}</td>
                <td>{student.module ? student.module : "********"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
