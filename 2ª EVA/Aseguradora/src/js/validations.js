document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-seguro");
  form.addEventListener("submit", (event) => {
    if (
      !validarNombreApellido() ||
      !validarDNI() ||
      !validarCorreo() ||
      !validarTelefono() ||
      !validarCodigoPostal() ||
      !validarMatricula() ||
      !validarFMatricula() ||
      !validarFCarnet() ||
      !validarFotoJPG() ||
      !validarFNacimiento()
    ) {
      event.preventDefault(); // Detiene el envío del formulario si hay errores
    }
  });
});

function validarNombreApellido() {
  let nombre = document.getElementById("nombre").value.trim();
  const patron = /^[a-zA-Z]+( [a-zA-Z]+)?$/;
  if (!patron.test(nombre) || nombre.length > 30) {
    alert(
      "Nombre no válido (solo letras, un espacio entre palabras y máximo 30 caracteres)"
    );
    return false;
  }
  return true;
}

//https://gist.github.com/afgomez/5691823
function validarDNI() {
  const dni = document.getElementById("dni").value.trim();
  const patron = /^(\d{8})([A-Z])$/;
  if (!patron.test(dni)) {
    alert("DNI no válido (8 dígitos y una letra)");
    return false;
  }
  return true;
}
// https://w3.unpocodetodo.info/utiles/regex-ejemplos.php?type=email Una implementación del Estandard Official: RFC 5322
function validarCorreo() {
  const correo = document.getElementById("correo").value.trim();
  const patron =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  if (!patron.test(correo)) {
    alert("Correo no válido");
    return false;
  }
  return true;
}
//https://es.stackoverflow.com/questions/415/regex-para-validar-numeros-de-movil-espa%C3%B1oles
function validarTelefono() {
  const telefono = document.getElementById("telefono").value.trim();
  const patron = /^(?:\+34|0034|34)?[ -]?(6|7)(?:[ -]?[0-9]){8}$/;
  if (!patron.test(telefono)) {
    alert("Teléfono no válido");
    return false;
  }
  return true;
}

function validarCodigoPostal() {
  const codigo = document.getElementById("codigo_postal").value.trim();
  const patron = /^[0-9]{5}$/;
  if (!patron.test(codigo)) {
    alert("Código postal no válido (deben ser 5 dígitos)");
    return false;
  }
  return true;
}

//https://github.com/robertostory/validate_matricula_espana/blob/main/script.js
function validarMatricula() {
  const matricula = document
    .getElementById("matricula")
    .value.trim()
    .toUpperCase()
    .replace("-", "");

  const patrones = [
    /^\d{4}[BCDFGHJKLMNPRSTVWXYZ]{3}$/, // Patron NEW (4 dígitos + 3 letras)
    /^[A-Z]{1,2}\d{4}[A-Z]{1,2}$/, // Patron MID (1 o 2 letras + 4 dígitos + 1 o 2 letras)
    /^[A-Z]{1,2}\d{6}$/, // Patron OLD (1 o 2 letras + 6 dígitos)
  ];

  // Verifica si al menos uno de los patrones coincide
  const esValida = patrones.some((patron) => patron.test(matricula));

  if (!esValida) {
    alert("Matrícula no válida");
    return false;
  }
  return true;
}
//faltan validaciones de y validación de foto

function validarFMatricula() {
  const fechaMatricula = document.getElementById("fecha_matricula").value;
  const fechaActual = new Date(); // Fecha actual en formato ISO
  if (fechaMatricula > fechaActual) {
    alert("La fecha de matriculación no puede ser futura");
    return false;
  }
  return true;
}

function validarFNacimiento() {
  const fechaNacimiento = new Date(
    document.getElementById("fecha_nacimiento").value
  );
  const fechaActual = new Date();

  if (fechaNacimiento > fechaActual) {
    alert("La fecha de nacimiento no puede ser futura");
    return false;
  }

  const edadMinima = new Date(
    fechaNacimiento.getFullYear() + 18,
    fechaNacimiento.getMonth(),
    fechaNacimiento.getDate()
  );

  if (fechaActual < edadMinima) {
    alert("Debes tener al menos 18 años");
    return false;
  }

  return true;
}

function validarFCarnet() {
  const fechaCarnet = document.getElementById("fecha_carnet").value;
  const fechaNacimiento = document.getElementById("fecha_nacimiento").value;
  if (fechaCarnet < fechaNacimiento) {
    alert("La fecha de carnet no puede ser anterior a la de nacimiento");
    return false;
  }
  const fechaActual = new Date();
  if (fechaCarnet > fechaActual) {
    alert("La fecha de carnet no puede ser futura");
    return false;
  }

  return true;
}

function validarFotoJPG() {
  const fotoInput = document.getElementById("fotoCarnet");
  const archivo = fotoInput.files[0]; // Obtenemos el archivo cargado

  if (!archivo) {
    alert("No se ha seleccionado ningún archivo");
    return false;
  }

  // Validamos tipo MIME para asegurarse de que sea JPG, es muy facil cambiar la extensión de un archivo de un archivo y si solo se valida por la extensión se puede subir un archivo malicioso
  const mimeValido = ["image/jpeg", "image/jpg"];
  if (!mimeValido.includes(archivo.type)) {
    alert("La foto debe ser de tipo JPG");
    return false;
  }

  return true;
}
