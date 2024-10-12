// Ejercicio 6
function CalcPan() {
  const barrasNoDia = document.getElementById("barrasNoDia").value;
  const totalBarras = document.getElementById("totalBarras").value;
  const precioNormal = 3.49;
  const descuento = 0.6;

  const barrasDia = totalBarras - barrasNoDia;
  const precioBarrasNoDia = barrasNoDia * precioNormal * (1 - descuento);
  const precioBarrasDia = barrasDia * precioNormal;
  const precioGanado = precioBarrasNoDia + precioBarrasDia;
  const precioSiDia = totalBarras * precioNormal;

  document.getElementById("resultado6").innerText =
    `Precio ganado: ${precioGanado.toFixed(2)} €\n` +
    `Precio si todas las barras fueran del día: ${precioSiDia.toFixed(2)} €`;
}

// Ejercicio 7
function verificarRespuestas() {
  const respuesta1 = document.querySelector(
    'input[name="pregunta1"]:checked'
  ).value;
  const respuesta2 = document.querySelector(
    'input[name="pregunta2"]:checked'
  ).value;
  const respuesta3 = document.querySelector(
    'input[name="pregunta3"]:checked'
  ).value;

  if (respuesta1 === "sí" && respuesta2 === "sí" && respuesta3 === "sí") {
    document.getElementById("resultado7").innerText = "¡Felicidades máquina!";
  } else {
    document.getElementById("resultado7").innerText =
      "Has perdido, te falta cultura";
  }
}

// Ejercicio 8
function verificarAutenticacion() {
  const usuario = document.getElementById("usuario").value;
  const contrasena = document.getElementById("contrasena").value;

  const usuarioCorrecto = "Ruben";
  const contrasenaCorrecta = "Arjona";

  if (usuario === usuarioCorrecto && contrasena === contrasenaCorrecta) {
    document.getElementById("resultado8").innerText = "Autenticación exitosa";
  } else {
    document.getElementById("resultado8").innerText =
      "Usuario o contraseña equivocados";
  }
}

// Ejercicio 9
function evalBM() {
  const asciiArt = `
  ░░░░░▄▄▄▀▀▀▀▀▀▀▀▀▄▄▄░░░░░░░░░
  ░░░▄▀░░░░░░░░░░░░░░░▀▀▄▄░░░░░
  ░░▄▀░░░░░░░░░░░░░░░░░░░░▀▄░░░
  ░▄▀░░░░░░░░░░░░░░░░░░░░░░░█░░
  ░█░░░░░░░░░░░░░░░░░░░░░░░░░█░
  ▐░░░░░░░░░░░░░░░░░░░░░░░░░░░█
  █░░░░▀▀█▄▄▄░░░▄▌░░░░░░░░░░░░▐
  ▌░░░░░▌░██▀█▀▀░░░▄▄▄▄▄░░░░▌░▐
  ▌░░░░░▀▄▄▄▀░░░░░░▌░▀███▄▄▀░░▐
  ▌░░░░░░░░░░░░░░░░░▀▄▄▄▄▀░░░▄▌
  ▐░░░░▐▀░░░░░░░░░░░░░░░░░░░▄▀░
  ░█░░░▌░░▄▀▀▀▄▄▄░░░░░░░░░░▄▀░░
  ░░█░░▀░░░░▄▄▄▄░▀▀▌░░▌░░░█░░░░
  ░░░▀▄░░░░░░░░░▀░░░▄▀░░▄▀░░░░░
  ░░░░░▀▄▄▄░░░░░░░░░▄▄▀▀░░░░░░░
  ░░░░░░░░▐▀▀▀▀▀▀▀▀▀░░░░░░░░░░░
  ░░░░░░░░█░░░░░░░░░░░░░░░░░░░░
  █▀▀█ █▀▀█ █▀▀ 　 █░░█ █▀▀█ █░░█
  █▄▄█ █▄▄▀ █▀▀ 　 █▄▄█ █░░█ █░░█
  ▀░░▀ ▀░▀▀ ▀▀▀ 　 ▄▄▄█ ▀▀▀▀ ░▀▀▀
  ▒█░▄▀ ▀█▀ ▒█▀▀▄ ▒█▀▀▄ ▀█▀ ▒█▄░▒█ ▒█▀▀█
  ▒█▀▄░ ▒█░ ▒█░▒█ ▒█░▒█ ▒█░ ▒█▒█▒█ ▒█░▄▄
  ▒█░▒█ ▄█▄ ▒█▄▄▀ ▒█▄▄▀ ▄█▄ ▒█░░▀█ ▒█▄▄█
  ▒█▀▄▀█ ▒█▀▀▀ ▀█
  ▒█▒█▒█ ▒█▀▀▀ █▀
  ▒█░░▒█ ▒█▄▄▄ ▄░
  `;
  const satisfacion = Number(document.getElementById("satisfacion").value);

  if (satisfacion < 1 || satisfacion > 10) {
    document.getElementById("resultado9").innerText =
      "Por favor, ingresa un número del 1 al 10";
  } else {
    let mensaje;

    switch (satisfacion) {
      case 10:
        mensaje = asciiArt;
        break;
      case 7:
      case 8:
      case 9:
        mensaje = "😊Satisfecho";
        break;
      case 4:
      case 5:
      case 6:
        mensaje = "😐Podría mejorar";
        break;
      default:
        mensaje = "😞Insatisfecho";
    }

    document.getElementById("resultado9").innerText = mensaje;
  }
}

// Ejercicio 10
function mostrarMensaje() {
  const nota = Number(document.getElementById("nota").value);

  if (nota >= 1 && nota <= 10) {
    let mensaje;

    if (nota === 10) {
      mensaje = "¡Excelente!";
    } else if (nota >= 8) {
      mensaje = "¡Muy bien!";
    } else if (nota >= 6) {
      mensaje = "Aprobado";
    } else {
      mensaje = "Reprobado";
    }

    document.getElementById("resultado10").innerText = mensaje;
  } else {
    document.getElementById("resultado10").innerText =
      "Por favor, ingresa una nota válida del 1 al 10";
  }
}
