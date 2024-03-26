import { useContext } from "react";
import { DataContext } from "../../Contexts/DataContext";

export default function Main() {
  const {data, setData} = useContext(DataContext)
  console.log(data);

  return (
    <main>
      <table>
        <thead>
          <tr>
            <th>ALUNO</th>
            <th>CPF</th>
            <th>CEP / ENDEREÇO</th>
            <th>RESPONSÁVEL</th>
            <th>MÓDULO</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td></td>
            <td></td>;
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </main>
  );
}
