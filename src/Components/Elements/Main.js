import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../Contexts/DataContext";
import { AuthContext } from "../../Contexts/AuthContext";
import { GestorFunctionContext } from "../../Contexts/GestorFunctionContext";
import { StudentContext } from "../../Contexts/StudentContext";

export default function Main() {
  const { auth, setAuth } = useContext(AuthContext);
  const { data, setData } = useContext(DataContext);
  const { GestorFunction, setGestorFunction } = useContext(GestorFunctionContext);
  const { SelectedStudentToModify, setSelectedStudentToModify } = useContext(StudentContext);

  function handleClickOnStudent(student) {
    setSelectedStudentToModify(student);
    setGestorFunction("alterar");
    var gestorModal = document.querySelector("#gestor-modal");
    gestorModal.style.display = "flex";
  };

  return (
    <main>
      <table>
        <thead>
          <tr>
            <th>ALUNO</th>
            <th>CPF</th>
            <th>EMAIL</th>
            <th>CEP / ENDEREÇO</th>
            <th>CELULAR</th>
            <th>RESPONSÁVEL</th>
            <th>MÓDULO</th>
            <th>ID</th>
          </tr>
        </thead>
        <tbody>
          {(data && data.length > 1) ? data.map((student) => {
            return (
              <tr key={student.student_id} onClick={()=>{
                handleClickOnStudent(student);                
              }}>
                <td>{`${student.first_name} ${student.last_name}`}</td>
                <td>{student.cpf}</td>
                <td>{student.email ? student.email : "********"}</td>
                <td className="cep-cell">{student.cep && `${student.cep} -`} {(student.address || student.cep) ? student.address : "********"}</td>
                <td>{student.phone ? student.phone : "********"}</td>
                <td>{student.parent ? student.parent : "********"}</td>
                <td>{student.module ? student.module : "********"}</td>
                <td>{student.cadastrador}</td>
              </tr>
            );
          }) : (data) && <tr key={data.student_id} onClick={()=>{
                handleClickOnStudent(data);                
              }}>
                <td>1</td>
                <td>{`${data.first_name} ${data.last_name}`}</td>
                <td>{data.cpf}</td>
                <td>{data.email ? data.email : "********"}</td>
                <td className="cep-cell">{data.cep && `${data.cep} -`} {(data.address || data.cep) ? data.address : "********"}</td>
                <td>{data.phone ? data.phone : "********"}</td>
                <td>{data.parent ? data.parent : "********"}</td>
                <td>{data.module ? data.module : "********"}</td>
              </tr>
              }
        </tbody>
      </table>
    </main>
  );
}
