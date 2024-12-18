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

  // Obtener los datos del formulario
  const datosFormulario = obtenerDatosFormulario();

  // Calcular los precios para todos los tipos de seguro
  const preciosCalculados = calcularPreciosTodosSeguros(datosFormulario);

  // Mostrar los resultados, destacando el seguro seleccionado
  mostrarResultados(preciosCalculados, datosFormulario.tipoSeguro);
}

// Obtener los valores del formulario
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
    tipoVehiculo: document.getElementById("tipo_vehiculo").value,
  };
}

// Calcular los precios de todos los tipos de seguros
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

// Calcular el precio final
function calcularPrecioFinal(
  precioBase,
  { edad, añosCarnet, añosCoche, tipoSeguro, tipoVehiculo }
) {
  let precio = precioBase;
  precio += aplicarPenalizacionEdad(precio, edad);
  precio += aplicarDescuentoCarnet(precio, añosCarnet);
  precio += aplicarPenalizacionAntiguedadCoche(precio, añosCoche);
  precio += aplicarPenalizacionTipoSeguro(precio, tipoSeguro);
  precio += aplicarPenalizaciónTipoVehiculo(precio, tipoVehiculo);
  return precio;
}

// Aplicar penalización por edad
function aplicarPenalizacionEdad(precio, edad) {
  return edad < 25 ? precio * 0.1 : 0;
}

// Aplicar descuento por experiencia con carnet
function aplicarDescuentoCarnet(precio, añosCarnet) {
  return añosCarnet > 5 ? -precio * 0.1 : 0;
}

// Aplicar penalización por antigüedad del coche
function aplicarPenalizacionAntiguedadCoche(precio, añosCoche) {
  return añosCoche > 10 ? precio * ((añosCoche - 10) * 0.01) : 0;
}

// Aplicar penalización por tipo de seguro
function aplicarPenalizacionTipoSeguro(precio, tipoSeguro) {
  return precio * configSeguro.penalizaciones[tipoSeguro];
}

// Aplicar penalización por tipo de vehículo
function aplicarPenalizaciónTipoVehiculo(precio, tipoVehiculo) {
  const penalizacionesVehiculo = {
    diesel: 0.2, // 20%
    gasolina: 0.15, // 15%
    hibrido: 0.05, // 5%
    electrico: 0.0, // 0%
  };

  const penalizacion = penalizacionesVehiculo[tipoVehiculo] || 0; // 0% por defecto pero es tontería ponerlo realmente esta obligado a seleccionar
  return precio * penalizacion;
}

// Mostrar los resultados
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

// Crear una tarjeta de resultados
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

// Asignar eventos a los botones de la tarjeta
function asignarEventosBotones(tarjeta) {
  const botonContratar = tarjeta.querySelector(".btn-contratar");
  botonContratar.addEventListener("click", manejarContrato);
  tarjeta
    .querySelector(".btn-descartar")
    .addEventListener("click", () => tarjeta.remove());
  asignarEfectosHover(botonContratar);
}

// Manejar el contrato
function manejarContrato() {
  alert(
    "Gracias por contratar. Atentamente, tu asesor de seguros José Rubén Arjona."
  );
}

// Asignar efectos de hover a un botón
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

// Calcular la edad
function calcularEdad(fechaNacimiento) {
  return calcularAniosDesdeFecha(fechaNacimiento);
}

// Calcular años desde una fecha
function calcularAniosDesdeFecha(fecha) {
  const hoy = new Date();
  const fechaBase = new Date(fecha);
  let años = hoy.getFullYear() - fechaBase.getFullYear(); // Años completos
  const esFechaPendiente = // Comprobar si ya ha pasado el cumpleaños
    hoy.getMonth() < fechaBase.getMonth() || // Si el mes actual es anterior al de nacimiento
    (hoy.getMonth() === fechaBase.getMonth() && // Si el mes actual es igual al de nacimiento
      hoy.getDate() < fechaBase.getDate()); // Si el día actual es anterior al de nacimiento
  return esFechaPendiente ? años - 1 : años; // Restar un año si no ha pasado el cumpleaños
}

// Asignar evento al formulario
formSeguro.addEventListener("submit", calcularSeguro);
