document.addEventListener("DOMContentLoaded", () => {
  console.log("El archivo script.js se ha cargado correctamente."); // Verificación para asegurar menos ncagadas
  // Creamos un array de objetos con los campos a validar y sus funciones de validación
  const campos = [
    { id: "nombre", validator: validarNombre },
    { id: "correo", validator: validarCorreo },
    { id: "telefono", validator: validarTelefono },
    { id: "cantidad", validator: validarCantidad },
  ];
  // Asignamos los eventos a los campos
  campos.forEach((campo) => {
    const input = document.getElementById(campo.id);
    if (input) {
      input.addEventListener("input", campo.validator);
      input.addEventListener("blur", campo.validator);
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
function validarCorreo() {
  // validacion correo
  const input = document.getElementById("correo");
  const valor = input.value.trim();
  const patron = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!patron.test(valor)) {
    // muestro error dinamicamente
    mostrarError("correo", "Correo no válido");
    return false;
  }
  limpiarError("correo");
  return true;
}
function validarTelefono() {
  // valido el telefono con numeros del 0-9
  const input = document.getElementById("telefono");
  const valor = input.value.trim();
  const patron = /^[0-9]{9}$/;
  if (!patron.test(valor)) {
    mostrarError("telefono", "Teléfono no válido (9 dígitos)");
    return false;
  }
  limpiarError("telefono");
  return true;
}

function validarCantidad() {
  // Validar cantidad (1 al 10)
  const input = document.getElementById("cantidad");
  const valor = input.value.trim(); // Eliminamos espacios en blanco
  const patron = /^[1-9]|10$/; // 1 al 10  (^[1-9]|10$)
  if (!patron.test(valor)) {
    mostrarError("cantidad", "Cantidad no válida (1 al 10)");
    return false;
  }
  limpiarError("cantidad");
  return true;
}
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("pizzeriaForm");

  const configPizza = {
    preciosBase: {
      pequena: 10,
      mediana: 15,
      grande: 20,
    },
    extra: {
      champi: 1,
      peppe: 1,
      aceitunas: 1,
      pimientos: 1,
    },
  };

  // Función principal para calcular la pizza
  function calcularPizza(event) {
    event.preventDefault();

    // Obtener los datos del formulario
    const datosFormulario = obtenerDatosFormulario();

    // Calcular los precios para la pizza
    const preciosCalculados = calcularPrecioPizza(datosFormulario);

    // Mostrar los resultados
    mostrarResultados(preciosCalculados);
  }

  // Obtener los valores del formulario
  function obtenerDatosFormulario() {
    // Obtenemos el tamaño
    const tamaño = document.getElementById("tamano").value;

    // Calculamos los ingredientes seleccionados
    const checkboxes = document.querySelectorAll(
      "#ingredientes input[type='checkbox']:checked"
    );
    const ingredientesSeleccionados = Array.from(checkboxes).map(
      (checkbox) => checkbox.id
    );

    // Obtenemos la cantidad
    const cantidad = parseInt(document.getElementById("cantidad").value, 10);

    return { tamaño, ingredientesSeleccionados, cantidad };
  }

  // Calcular el precio base de acuerdo con el tamaño
  function calcularPrecioBase(tamaño) {
    return configPizza.preciosBase[tamaño] || 0;
  }

  // Calcular el precio adicional de los ingredientes
  function calcularPrecioIngredientesExtra(ingredientes) {
    return ingredientes.reduce(
      (total, ingrediente) => total + (configPizza.extra[ingrediente] || 0),
      0
    );
  }

  // Calcular el precio total de la pizza
  function calcularPrecioPizza({
    tamaño,
    ingredientesSeleccionados,
    cantidad,
  }) {
    const precioBase = calcularPrecioBase(tamaño);
    const precioIngredientesExtra = calcularPrecioIngredientesExtra(
      ingredientesSeleccionados
    );
    const precioTotal = (precioBase + precioIngredientesExtra) * cantidad;

    return {
      precioBase,
      precioIngredientesExtra,
      precioFinal: precioTotal,
    };
  }

  // Mostrar los resultados en la página
  function mostrarResultados(preciosCalculados) {
    const resultados = document.getElementById("resultados");

    resultados.innerHTML = `
        <h2>Resumen de la pizza</h2>
        <p>Precio base por unidad: $${preciosCalculados.precioBase.toFixed(
          2
        )}</p>
        <p>Precio de ingredientes extra por unidad: $${preciosCalculados.precioIngredientesExtra.toFixed(
          2
        )}</p>
        <p>Precio total: $${preciosCalculados.precioFinal.toFixed(2)}</p>
      `;
  }

  // Asignar evento al formulario
  form.addEventListener("submit", calcularPizza);
});
