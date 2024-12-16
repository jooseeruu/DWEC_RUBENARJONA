// Referencia al formulario
const formSeguro = document.getElementById("form-seguro");

// Configuración de precios y penalizaciones
const configSeguro = {
  preciosBase: {
    Terceros: 500,
    "Terceros ampliado": 650,
    "Con franquicia": 750,
    "Todo riesgo": 1000,
  },
  penalizaciones: {
    Terceros: 0.2,
    "Terceros ampliado": 0.15,
    "Con franquicia": 0.05,
    "Todo riesgo": 0,
  },
};

// Función principal para calcular el seguro
function calcularSeguro(event) {
  event.preventDefault();
  const datosFormulario = obtenerDatosFormulario();

  // Calcular los precios para todos los tipos de seguro
  const preciosCalculados = calcularPreciosTodosSeguros(datosFormulario);

  // Mostrar los resultados, destacando el seguro seleccionado
  mostrarResultados(preciosCalculados, datosFormulario.tipoSeguro);
}

// Función para obtener los valores del formulario
function obtenerDatosFormulario() {
  return {
    edad: calcularEdad(document.getElementById("fecha_nacimiento").value),
    añosCarnet: calcularAniosDesdeFecha(
      document.getElementById("fecha_carnet").value
    ),
    añosCoche: calcularAniosDesdeFecha(
      document.getElementById("matricula").value
    ),
    tipoSeguro: document.getElementById("tipo_seguro").value,
  };
}

// Función para calcular los precios de todos los tipos de seguros
function calcularPreciosTodosSeguros(datosFormulario) {
  const preciosCalculados = {};

  for (const tipoSeguro in configSeguro.preciosBase) {
    const precioBase = configSeguro.preciosBase[tipoSeguro];
    const precioFinal = calcularPrecioFinal(precioBase, {
      ...datosFormulario,
      tipoSeguro,
    });
    preciosCalculados[tipoSeguro] = precioFinal;
  }

  return preciosCalculados;
}

// Función para calcular el precio final
function calcularPrecioFinal(
  precioBase,
  { edad, añosCarnet, añosCoche, tipoSeguro }
) {
  let precio = precioBase;
  precio += aplicarPenalizacionEdad(precio, edad);
  precio += aplicarDescuentoCarnet(precio, añosCarnet);
  precio += aplicarPenalizacionAntiguedadCoche(precio, añosCoche);
  precio += aplicarPenalizacionTipoSeguro(precio, tipoSeguro);
  return precio;
}

// Función para calcular penalización por edad
function aplicarPenalizacionEdad(precio, edad) {
  return edad < 25 ? precio * 0.1 : 0;
}

// Función para aplicar descuento por experiencia con carnet
function aplicarDescuentoCarnet(precio, añosCarnet) {
  return añosCarnet > 5 ? -precio * 0.1 : 0;
}

// Función para aplicar penalización por antigüedad del coche
function aplicarPenalizacionAntiguedadCoche(precio, añosCoche) {
  return añosCoche > 10 ? precio * ((añosCoche - 10) * 0.01) : 0;
}

// Función para aplicar penalización por tipo de seguro
function aplicarPenalizacionTipoSeguro(precio, tipoSeguro) {
  return precio * configSeguro.penalizaciones[tipoSeguro];
}

// Función para mostrar los resultados
function mostrarResultados(preciosCalculados, tipoSeguroSeleccionado) {
  const contenedorResultados = document.getElementById("resultados");
  contenedorResultados.innerHTML = ""; // Limpiar resultados previos

  const resultados = document.createElement("div");
  resultados.className = "row mt-4";

  for (const tipo in preciosCalculados) {
    const tarjeta = crearTarjeta(
      tipo,
      preciosCalculados[tipo],
      tipo === tipoSeguroSeleccionado
    );
    resultados.appendChild(tarjeta);
  }

  contenedorResultados.appendChild(resultados);
}

// Función para crear una tarjeta de resultados
function crearTarjeta(tipo, precioFinal, esSeleccionado) {
  const tarjeta = document.createElement("div");
  tarjeta.className = `col-md-3 mb-3 card ${
    esSeleccionado ? "bg-info text-black" : "bg-light"
  }`;
  tarjeta.style.transition = "transform 0.2s";

  tarjeta.innerHTML = `
    <div class="card-body text-center">
      <h5 class="card-title">${tipo}</h5>
      <p class="card-text">Precio Final: €${precioFinal.toFixed(2)}</p>
      <button class="btn btn-primary btn-contratar">Contratar</button>
      <button class="btn btn-danger btn-descartar mt-2">Descartar</button>
    </div>
  `;

  asignarEventosBotones(tarjeta);
  return tarjeta;
}

// Función para asignar eventos a los botones de la tarjeta
function asignarEventosBotones(tarjeta) {
  const botonContratar = tarjeta.querySelector(".btn-contratar");
  botonContratar.addEventListener("click", manejarContrato);
  tarjeta
    .querySelector(".btn-descartar")
    .addEventListener("click", () => tarjeta.remove());
  asignarEfectosHover(botonContratar);
}

// Función para manejar el contrato
function manejarContrato() {
  alert(
    "Gracias por contratar. Atentamente, tu asesor de seguros José Rubén Arjona."
  );
}

// Función para asignar efectos de hover a un botón
function asignarEfectosHover(boton) {
  boton.addEventListener(
    "mouseover",
    () => (boton.style.transform = "scale(1.1)")
  );
  boton.addEventListener(
    "mouseout",
    () => (boton.style.transform = "scale(1)")
  );
}

// Función para calcular la edad
function calcularEdad(fechaNacimiento) {
  return calcularAniosDesdeFecha(fechaNacimiento);
}

// Función para calcular años desde una fecha
function calcularAniosDesdeFecha(fecha) {
  const hoy = new Date();
  const fechaBase = new Date(fecha);
  let años = hoy.getFullYear() - fechaBase.getFullYear();
  const esFechaPendiente =
    hoy.getMonth() < fechaBase.getMonth() ||
    (hoy.getMonth() === fechaBase.getMonth() &&
      hoy.getDate() < fechaBase.getDate());
  return esFechaPendiente ? años - 1 : años;
}

// Asignar evento al formulario
formSeguro.addEventListener("submit", calcularSeguro);
