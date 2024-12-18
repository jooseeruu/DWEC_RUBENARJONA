console.log("El archivo locationLoader.js se ha cargado correctamente.");
// Datos de marcas y modelos
const API_KEY =
  "eecf10b5d57dd1dc1d406f648c8d1ddb7791e66c86c14d85ee2591295e9c4df4";
const BASE_URL = "https://apiv1.geoapi.es";

const comunidadSelect = document.getElementById("comunidad");
const provinciaSelect = document.getElementById("provincia");

// Función para obtener datos de la API
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`); // 404 Not Found
    const data = await response.json(); // { data: [...] }
    return data.data;
  } catch (error) {
    console.error("Error al obtener datos:", error);
    return []; // Devolver un array vacío en caso de error
  }
}

function populateSelect( // Función para poblar un select
  selectElement,
  options,
  valueKey,
  textKey,
  defaultText
) {
  selectElement.innerHTML = `<option value="">${defaultText}</option>`;
  options.forEach((option) => {
    // Crear un elemento option por cada objeto en el array
    const opt = document.createElement("option");
    opt.value = option[valueKey];
    opt.textContent = option[textKey];
    selectElement.appendChild(opt);
  });
}
// Función para cargar las comunidades autónomas
async function cargarComunidades() {
  const url = `${BASE_URL}/comunidades?key=${API_KEY}&type=json`;
  const comunidades = await fetchData(url); // [{ CCOM: "01", COM: "Andalucía" }, ...]
  populateSelect(
    comunidadSelect,
    comunidades,
    "CCOM",
    "COM",
    "Selecciona una comunidad"
  );
}
// Función para cargar las provincias de una comunidad autónoma
async function cargarProvincias(codigoComunidad) {
  if (!codigoComunidad) {
    provinciaSelect.innerHTML =
      '<option value="">Selecciona una provincia</option>';
    return;
  }
  // https://apiv1.geoapi.es/provincias
  const url = `${BASE_URL}/provincias?CCOM=${codigoComunidad}&key=${API_KEY}&type=json`;
  const provincias = await fetchData(url);
  populateSelect(
    provinciaSelect,
    provincias,
    "CPRO",
    "PRO",
    "Selecciona una provincia"
  );
}

document.addEventListener("DOMContentLoaded", () => {
  //Evento que se dispara al cargar la página
  cargarComunidades();

  comunidadSelect.addEventListener("change", (event) => {
    //Evento que se dispara al cambiar de comunidad autónoma
    cargarProvincias(event.target.value);
  });
});
