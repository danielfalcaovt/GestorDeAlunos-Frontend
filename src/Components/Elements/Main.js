//! TO DO: CONFERIR SE A MATRICULA ESTA SENDO INSERIDA NO BD JUNTAMENTE DO ESTUDANTE
import { useContext, useEffect } from "react";
import { DataContext } from "../../Contexts/DataContext";
import { AuthContext } from "../../Contexts/AuthContext";
import tratarCPF from "./tratamentoDeDados/tratarCPF";

export default function Main() {
  const { auth, setAuth } = useContext(AuthContext);
  const { data, setData } = useContext(DataContext);

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
        {/* ID	ALUNO	CPF	EMAIL	CEP / ENDEREÇO	RESPONSÁVEL	MÓDULO */}
          {data && data.map((student) => {
            return (
              <tr key={student.student_id}>
                <td>1</td>
                <td>{`${student.first_name} ${student.last_name}`}</td>
                <td>{tratarCPF(student.cpf)}</td>
                <td>{student.email}</td>
                <td className="cep-cell">{student.cep} - {student.address}</td>
                <td>{student.phone}</td>
                <td>{student.parent}</td>
                <td>{student.module}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
