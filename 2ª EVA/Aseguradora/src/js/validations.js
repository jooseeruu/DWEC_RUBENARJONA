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

function validarDNI() {
  const dni = document.getElementById("dni").value.trim();
  const patron = /^(\d{8})([A-Z])$/; //https://gist.github.com/afgomez/5691823
  if (!patron.test(dni)) {
    alert("DNI no válido (8 dígitos y una letra)");
    return false;
  }
  return true;
}

function validarCorreo() {
  const correo = document.getElementById("correo").value.trim();
  // https://w3.unpocodetodo.info/utiles/regex-ejemplos.php?type=email Una implementación del Estandard Official: RFC 5322
  const patron =
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  if (!patron.test(correo)) {
    alert("Correo no válido");
    return false;
  }
  return true;
}

function validarTelefono() {
  const telefono = document.getElementById("telefono").value.trim();
  const patron = /^(?:\+34|0034|34)?[ -]?(6|7)(?:[ -]?[0-9]){8}$/; //https://es.stackoverflow.com/questions/415/regex-para-validar-numeros-de-movil-espa%C3%B1oles
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

function validarMatricula() {
  //https://github.com/robertostory/validate_matricula_espana/blob/main/script.jss
  const matricula = document.getElementById("matricula").value;
  let matriculaFormateada = matricula.toUpperCase().replace("-", "").trim();
  let patronNEW =
    /^\d\d\d\d[BCDFGHJKLMNPRSTVWXYZ][BCDFGHJKLMNPRSTVWXYZ][BCDFGHJKLMNPRSTVWXYZ]$/;
  let patronMID = /^[A-Z]{1,2}\d\d\d\d[A-Z]{1,2}$/;
  let patronOLD = /^[A-Z]{1,2}\d\d\d\d\d\d$/;
  let ciclomotores =
    /^C\d\d\d\d[BCDFGHJKLMNPRSTVWXYZ][BCDFGHJKLMNPRSTVWXYZ][BCDFGHJKLMNPRSTVWXYZ]$/;
  if (
    !patronNEW.test(matriculaFormateada) ||
    !patronMID.test(matriculaFormateada) ||
    !patronOLD.test(matriculaFormateada) ||
    !ciclomotores.test(matriculaFormateada)
  ) {
    alert("Matrícula no válida");
    return false;
  }
  return true;
}
