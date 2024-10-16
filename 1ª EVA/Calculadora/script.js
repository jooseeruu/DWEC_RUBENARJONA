function Calculadora() {
  let num1 = Number(document.getElementById("num1").value);
  let num2 = Number(document.getElementById("num2").value);
  let operador = document.getElementById("operador").value;
  let resultado;

  switch (operador) {
    case "+":
      resultado = num1 + num2;
      break;
    case "-":
      resultado = num1 - num2;
      break;
    case "*":
      resultado = num1 * num2;
      break;
    case "**":
      resultado = num1 ** num2;
      break;
    case "%":
      if (num2 == 0) {
        document.getElementById("resultado").innerText = "infinito";
        return;
      }
      resultado = num1 % num2;
      break;
    case "/":
      if (num2 == 0) {
        document.getElementById("resultado").innerText = "infinito";
        return;
      }
      resultado = num1 / num2;
      break;

    default:
      document.getElementById("resultado").innerText = "Operador no valido";
      return;
  }
  document.getElementById("resultado").innerText = `${resultado}`;
}
