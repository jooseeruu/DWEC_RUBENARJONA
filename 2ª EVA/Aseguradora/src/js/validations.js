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
    { id: "tipo_vehiculo", validator: validarTipoVehiculo },
    { id: "marca", validator: validarMarca },
    { id: "modelo", validator: validarModelo },
    { id: "provincia", validator: validarProvincia },
    { id: "comunidad", validator: validarComunidad },
    { id: "tipo_seguro", validator: validarTipoSeguro },
    { id: "form-check", validator: validarCheck },
    { id: "sexo", validator: validarSexo },
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
// Funcion para mostrar un mensaje de error debajo del campo
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
// Validamos los selects y checkbox
function validarSelectsCheckbox(id, mensaje, esCheckbox = false) {
  const input = document.getElementById(id);
  const valor = esCheckbox ? input.checked : input.value; // Si es un checkbox, usamos el atributo checked
  if (!valor) {
    mostrarError(id, mensaje);
    return false;
  }
  limpiarError(id);
  return true;
}

// FUNCIONES DE VALIDACIÓN DE CAMPOS

function validarNombre() {
  const input = document.getElementById("nombre");
  const valor = input.value.trim();
  const patron = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]+( [a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]+)?$/; // Nombre espacio Nombre
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
  const valor = input.value;
  const fechaActual = new Date();
  const patron = /^\d{4}-\d{2}-\d{2}$/; // Formato YYYY-MM-DD

  if (!patron.test(valor)) {
    mostrarError(
      "fecha_nacimiento",
      "Fecha no válida. Usa el formato YYYY-MM-DD"
    );
    return false;
  }

  const fechaNacimiento = new Date(valor);
  if (fechaNacimiento > fechaActual) {
    mostrarError(
      "fecha_nacimiento",
      "La fecha de nacimiento no puede ser futura"
    );
    return false;
  }

  const edadMinima = new Date(
    fechaNacimiento.getFullYear() + 18,
    fechaNacimiento.getMonth(),
    fechaNacimiento.getDate()
  );
  if (fechaActual < edadMinima) {
    mostrarError("fecha_nacimiento", "Debes tener al menos 18 años");
    return false;
  }

  limpiarError("fecha_nacimiento");
  return true;
}

function validarFCarnet() {
  const carnetInput = document.getElementById("fecha_carnet");
  const nacimientoInput = document.getElementById("fecha_nacimiento");
  const carnetValor = carnetInput.value;
  const nacimientoValor = nacimientoInput.value;
  const patron = /^\d{4}-\d{2}-\d{2}$/; // Formato YYYY-MM-DD

  if (!patron.test(carnetValor)) {
    mostrarError("fecha_carnet", "Fecha no válida. Usa el formato YYYY-MM-DD");
    return false;
  }

  if (!patron.test(nacimientoValor)) {
    mostrarError("fecha_carnet", "Primero corrige la fecha de nacimiento");
    return false;
  }

  const carnet = new Date(carnetValor);
  const nacimiento = new Date(nacimientoValor);
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
// https://developer.mozilla.org/es/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/image
function validarFotoJPG() {
  const input = document.getElementById("foto_carnet");
  const archivo = input.files[0];
  const preview = document.getElementById("preview-foto_carnet"); // Imagen preview
  const mensajeArchivo = document.getElementById("mensaje-archivo"); // Mensaje adicional

  if (!archivo) {
    mostrarError("foto_carnet", "No se ha seleccionado ningún archivo");
    preview.style.display = "none";
    preview.src = ""; // Limpiamos la imagen preview
    if (mensajeArchivo) mensajeArchivo.textContent = "";
    return false;
  }

  // Lista de tipos MIME válidos (solo aceptamos image/jpeg)
  const mimeValido = "image/jpeg"; // JPG y JPEG son lo mismo en cuanto a MIME type
  if (archivo.type !== mimeValido) {
    mostrarError("foto_carnet", "La foto debe ser de tipo JPG");
    preview.style.display = "none";
    preview.src = "#";
    if (mensajeArchivo) mensajeArchivo.textContent = "";
    return false;
  }

  // Validación adicional: comprobar la extensión .jpg
  const nombreArchivo = archivo.name.toLowerCase();
  if (!nombreArchivo.endsWith(".jpg")) {
    mostrarError("foto_carnet", "El archivo debe tener la extensión .jpg");
    preview.style.display = "none";
    preview.src = "#";
    if (mensajeArchivo) mensajeArchivo.textContent = "";
    return false;
  }

  const reader = new FileReader(); // Objeto para leer el archivo
  const img = new Image(); // Objeto para cargar y validar dimensiones de la imagen

  reader.onload = () => {
    img.onload = () => {
      // Verifica las dimensiones de la imagen
      if (img.width <= 500 && img.height <= 500) {
        preview.style.display = "block";
        preview.src = reader.result; // Cargar la imagen en el preview
        if (mensajeArchivo) mensajeArchivo.textContent = "";
      } else {
        preview.style.display = "none"; // Ocultar la imagen
        preview.src = ""; // Limpiamos el preview
        if (mensajeArchivo) {
          mensajeArchivo.textContent =
            "Imagen cargada, pero la imagen es demasiado grande y no se previsualizará.";
        }
      }
    };
    img.src = reader.result; // Cargar el archivo como fuente de la imagen
  };

  reader.readAsDataURL(archivo); // Leer el archivo como una URL base64

  limpiarError("foto_carnet");
  return true;
}

function validarTipoVehiculo() {
  return validarSelectsCheckbox(
    "tipo_vehiculo",
    "Selecciona un tipo de vehículo"
  );
}

function validarMarca() {
  return validarSelectsCheckbox("marca", "Selecciona una marca");
}

function validarModelo() {
  return validarSelectsCheckbox("modelo", "Selecciona un modelo");
}

function validarProvincia() {
  return validarSelectsCheckbox("provincia", "Selecciona una provincia");
}

function validarComunidad() {
  return validarSelectsCheckbox("comunidad", "Selecciona una comunidad");
}

function validarTipoSeguro() {
  return validarSelectsCheckbox("tipo_seguro", "Selecciona un tipo de seguro");
}

function validarCheck() {
  return validarSelectsCheckbox(
    "form-check",
    "Debes aceptar las condiciones",
    true
  );
}

function validarSexo() {
  return validarSelectsCheckbox("sexo", "Selecciona un sexo");
}
