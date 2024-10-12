// Ejercicio 1
function CalcPago() {
  const horas = document.getElementById("horas").value;
  const salario = document.getElementById("salario").value;
  const pago = horas * salario;
  document.getElementById(
    "resultado1"
  ).innerText = `Te corresponden ${pago} euros`;
}

// Ejercicio 2
function CalcIMC() {
  const peso = Number(document.getElementById("peso").value);
  const altura = Number(document.getElementById("altura").value);
  const IMC = peso / (altura * altura);
  document.getElementById(
    "resultado2"
  ).innerText = `Tienes un IMC de ${IMC.toFixed(2)}`;
}

// Ejercicio 3
function CalcDivision() {
  const numero1 = Number(document.getElementById("numero1").value);
  const numero2 = Number(document.getElementById("numero2").value);
  const cociente = Math.floor(numero1 / numero2);
  const resto = numero1 % numero2;
  document.getElementById(
    "resultadoCociente"
  ).innerText = `El cociente es ${cociente}`;
  document.getElementById("resultadoResto").innerText = `El resto es ${resto}`;
}

// Ejercicio 4
function CalcInv() {
  const cantidad = Number(document.getElementById("cantidad").value);
  const interes = Number(document.getElementById("interes").value / 100);
  const anos = Number(document.getElementById("anos").value);
  const capital = cantidad * (1 + interes) ** anos;
  document.getElementById(
    "resultado4"
  ).innerText = `El capital obtenido en la inversión es: ${capital.toFixed(
    2
  )} €`;
}

// Ejercicio 5
function CalcPeso() {
  const payasos = document.getElementById("payasos").value;
  const munecas = document.getElementById("munecas").value;
  const pesoTotal = payasos * 112 + munecas * 75;
  document.getElementById(
    "resultado5"
  ).innerText = `El peso total del paquete es: ${pesoTotal} g`;
}
