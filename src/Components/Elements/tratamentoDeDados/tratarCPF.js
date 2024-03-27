export default function tratarCPF(cpf) {
  const validCPF = cpf.trim();


  if (validCPF.length === 11) {
    return validCPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  }else{
    return "CPF INVÁLIDO"
  }
};