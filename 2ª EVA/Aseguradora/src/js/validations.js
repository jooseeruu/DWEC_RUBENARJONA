document.addEventListener("DOMContentLoaded", () => {
  console.log("El archivo validations.js se ha cargado correctamente.");
  // Creamos un array de objetos con los campos a validar y sus funciones de validación
  const campos = [
    { id: "nombre", validator: validarNombre },
    { id: "apellidos", validator: validarApellidos },
    { id: "dni", validator: validarDNI },
    { id: "correo", validator: validarCorreo },
    { id: "telefono", validator: validarTelefono },
    { id: "codigo_postal", validator: validarCodigoPostal },
    { id: "matricula", validator: validarMatricula },
    { id: "fecha_nacimiento", validator: validarFNacimiento },
    { id: "fecha_carnet", validator: validarFCarnet },
    { id: "foto_carnet", validator: validarFotoJPG },
  ];
  // Asignamos los eventos a los campos
  campos.forEach((campo) => {
    const input = document.getElementById(campo.id);
    if (input) {
      input.addEventListener("input", campo.validator);
      input.addEventListener("blur", campo.validator);
    }
  });
  // Asignamos el evento submit al formulario
  const form = document.getElementById("form-seguro");
  form.addEventListener("submit", (event) => {
    let esValido = true;
    campos.forEach((campo) => {
      if (!campo.validator()) esValido = false;
    });
    if (!esValido) {
      event.preventDefault();
    }
  });
});
// Funcion de mostrar error
function mostrarError(id, mensaje) {
  const errorDiv = document.getElementById(`error-${id}`);
  if (errorDiv) {
    errorDiv.textContent = mensaje;
  }
}
// Limpiamos el error si ya no se cumple la condición
function limpiarError(id) {
  const errorDiv = document.getElementById(`error-${id}`);
  if (errorDiv) {
    errorDiv.textContent = "";
  }
}

function validarNombre() {
  const input = document.getElementById("nombre");
  const valor = input.value.trim();
  const patron = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]+( [a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]+)?$/;
  if (!patron.test(valor) || valor.length > 30) {
    mostrarError(
      "nombre",
      "Nombre no válido (solo letras, un espacio entre palabras y máximo 30 caracteres)"
    );
    return false;
  }
  limpiarError("nombre");
  return true;
}

function validarApellidos() {
  const input = document.getElementById("apellidos");
  const valor = input.value.trim();
  const patron = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]+( [a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]+)*$/;
  if (!patron.test(valor) || valor.length > 30) {
    mostrarError(
      "apellidos",
      "Apellidos no válidos (solo letras, espacios entre palabras y máximo 30 caracteres)"
    );
    return false;
  }
  limpiarError("apellidos");
  return true;
}
//https://gist.github.com/afgomez/5691823
function validarDNI() {
  const input = document.getElementById("dni");
  const valor = input.value.trim().toUpperCase();
  const patron = /^(\d{8})([a-zA-Z])$/; // 8 dígitos y una letra
  if (!patron.test(valor)) {
    mostrarError("dni", "DNI no válido (8 dígitos y una letra)");
    return false;
  }
  limpiarError("dni");
  return true;
}
// https://w3.unpocodetodo.info/utiles/regex-ejemplos.php?type=email Una implementación del Estandard Official: RFC 5322
function validarCorreo() {
  const input = document.getElementById("correo");
  const valor = input.value.trim();
  const patron =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/; // Estandar RFC 5322
  if (!patron.test(valor)) {
    mostrarError("correo", "Correo no válido");
    return false;
  }
  limpiarError("correo");
  return true;
}
//https://es.stackoverflow.com/questions/415/regex-para-validar-numeros-de-movil-espa%C3%B1oles
function validarTelefono() {
  const input = document.getElementById("telefono");
  const valor = input.value.trim();
  const patron = /^(?:\+34|0034|34)?[ -]?(6|7)(?:[ -]?[0-9]){8}$/;
  if (!patron.test(valor)) {
    mostrarError("telefono", "Teléfono no válido");
    return false;
  }
  limpiarError("telefono");
  return true;
}

function validarCodigoPostal() {
  const input = document.getElementById("codigo_postal");
  const valor = input.value.trim();
  const patron = /^[0-9]{5}$/; // 5 dígitos
  if (!patron.test(valor)) {
    mostrarError(
      "codigo_postal",
      "Código postal no válido (deben ser 5 dígitos)"
    );
    return false;
  }
  limpiarError("codigo_postal");
  return true;
}
//https://github.com/robertostory/validate_matricula_espana/blob/main/script.js
function validarMatricula() {
  const input = document.getElementById("matricula");
  const valor = input.value.trim().toUpperCase();
  const patrones = [
    /^\d{4}[BCDFGHJKLMNPRSTVWXYZ]{3}$/, // Patron NEW (4 dígitos + 3 letras)
    /^[A-Z]{1,2}\d{4}[A-Z]{1,2}$/, // Patron MID (1 o 2 letras + 4 dígitos + 1 o 2 letras)
    /^[A-Z]{1,2}\d{6}$/, // Patron OLD (1 o 2 letras + 6 dígitos)
  ];
  if (!patrones.some((patron) => patron.test(valor))) {
    mostrarError("matricula", "Matrícula no válida");
    return false;
  }
  limpiarError("matricula");
  return true;
}

function validarFNacimiento() {
  const input = document.getElementById("fecha_nacimiento");
  const valor = new Date(input.value);
  const fechaActual = new Date();
  if (valor > fechaActual) {
    mostrarError(
      "fecha_nacimiento",
      "La fecha de nacimiento no puede ser futura"
    );
    return false;
  }
  const edadMinima = new Date(
    valor.getFullYear() + 18,
    valor.getMonth(),
    valor.getDate()
  );
  if (fechaActual < edadMinima) {
    mostrarError("fecha_nacimiento", "Debes tener al menos 18 años");
    return false;
  }
  limpiarError("fecha_nacimiento");
  return true;
}

function validarFCarnet() {
  const carnet = new Date(document.getElementById("fecha_carnet").value);
  const nacimiento = new Date(
    document.getElementById("fecha_nacimiento").value
  );
  const actual = new Date();
  if (carnet < nacimiento) {
    mostrarError(
      "fecha_carnet",
      "La fecha del carnet no puede ser anterior a la de nacimiento"
    );
    return false;
  }
  if (carnet > actual) {
    mostrarError("fecha_carnet", "La fecha del carnet no puede ser futura");
    return false;
  }
  limpiarError("fecha_carnet");
  return true;
}
// Validamos tipo MIME para asegurarse de que sea JPG, es muy facil cambiar la extensión de un archivo de un archivo y si solo se valida por la extensión se puede subir un archivo malicioso
function validarFotoJPG() {
  const input = document.getElementById("foto_carnet");
  const archivo = input.files[0];

  if (!archivo) {
    mostrarError("foto_carnet", "No se ha seleccionado ningún archivo");
    return false;
  }

  // Lista de tipos MIME válidos (solo aceptamos image/jpeg)
  const mimeValido = "image/jpeg"; // JPG y JPEG son lo mismo en cuanto a MIME type
  if (archivo.type !== mimeValido) {
    mostrarError("foto_carnet", "La foto debe ser de tipo JPG");
    return false;
  }

  // Validación adicional: comprobar la extensión .jpg
  const nombreArchivo = archivo.name.toLowerCase();
  if (!nombreArchivo.endsWith(".jpg")) {
    mostrarError("foto_carnet", "El archivo debe tener la extensión .jpg");
    return false;
  }

  limpiarError("foto_carnet");
  return true;
}
// 1 validar todo prevenir inyecciones sql
// 2 echar cuentas tipo de vehiculo
