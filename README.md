Aplicação Fullstack: Gerenciamento de Alunos

Visão Geral
Nossa aplicação fullstack foi desenvolvida usando React para o frontend e Express para o backend. Ela oferece recursos de gerenciamento de alunos, permitindo que os usuários realizem operações como consulta, cadastro, remoção e atualização de informações.

Funcionalidades Principais
1. Tela de Login e Redirecionamento
<ul>
 <li> Após fazer login com sucesso, o usuário é redirecionado para a página principal.</li>
 <li> A tela de login verifica as credenciais do usuário e concede acesso à área restrita.</li>
  <li> Ao fazer um cadastro na aplicação, o identificador "nome de usuario" do mesmo será informado.</li>
</ul>

![engfaster8](https://github.com/danielfalcaovt/GestorDeAlunos-Frontend/assets/146419346/31e04e75-293b-497b-9f92-497f780cebf7)

3. Tabela de Alunos Cadastrados
<ul>
 <li>Na página principal, exibimos uma tabela de alunos cadastrados.</li>
 <li>Essa tabela lista todos os alunos presentes no banco de dados.</li>
</ul>

![engfaster1](https://github.com/danielfalcaovt/GestorDeAlunos-Frontend/assets/146419346/05a0caf4-c79f-4b78-891d-000ed843f035)

5. Consulta de Alunos
<ul>
 <li>Ao clicar no botão “Consultar”, o usuário pode escolher entre quatro opções de consulta:</li>
<ul>
 <li>Primeiro Nome</li>
 <li>CPF</li>
 <li>Módulo</li>
 <li>Responsável</li>
</ul>
 <li>O sistema busca os alunos que atendem aos parâmetros especificados.</li>
 <li>Se nenhum aluno for encontrado ou se os parâmetros forem inválidos, o usuário receberá uma mensagem de erro apropriada.</li>
</ul>

![engfaster3](https://github.com/danielfalcaovt/GestorDeAlunos-Frontend/assets/146419346/a3a6a719-68e5-4106-a280-f3c12ceab699)

7. Remoção de Alunos
 <ul>
 <li>Ao clicar no botão “Remover”, o usuário deve informar o CPF do aluno que deseja excluir.</li>
 <li>Para confirmar a exclusão, o usuário deve digitar a palavra “DELETAR” como método de confirmação.</li>
 <li>O aluno é removido do banco de dados.</li>
 </ul>

![image](https://github.com/danielfalcaovt/GestorDeAlunos-Frontend/assets/146419346/cc9a5f03-9b2b-4891-a7d2-9fd22839328c)

5. Cadastro de Alunos
 <ul>
   <li>
  Ao clicar no botão “Cadastrar”, o usuário pode inserir todas as informações relevantes para um aluno.
    </li>
   <li>
   <ul>
  As informações obrigatórias são:
  <li>Primeiro Nome</li>
  <li>Último Nome</li>
  <li>CPF</li>
  <li>Módulo</li>
   </ul>
   </li>
 </ul>
 
![engfaster4](https://github.com/danielfalcaovt/GestorDeAlunos-Frontend/assets/146419346/6aed47aa-562d-490c-89a5-53f1eea4240f)

7. Atualização de Alunos
<ul>
<li>Para alterar as informações de um aluno, basta clicar sobre o aluno na tabela.</li>
<li>Um formulário de alteração será exibido, já preenchido com as informações atuais do aluno.</li>
<li>O usuário pode fazer as alterações desejadas e salvar.</li>
</ul>

![engfaster6](https://github.com/danielfalcaovt/GestorDeAlunos-Frontend/assets/146419346/76402ed0-e692-4742-aa64-2e21d90a72df)

Conclusão
Nossa aplicação oferece uma experiência completa para gerenciar informações de alunos de forma eficiente e segura. Esperamos que você aproveite! 📚🎓
