const API_KEY =
  "eecf10b5d57dd1dc1d406f648c8d1ddb7791e66c86c14d85ee2591295e9c4df4";
const BASE_URL = "https://apiv1.geoapi.es";

const comunidadSelect = document.getElementById("comunidad");
const provinciaSelect = document.getElementById("provincia");

async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error al obtener datos:", error);
    return [];
  }
}

function populateSelect(
  selectElement,
  options,
  valueKey,
  textKey,
  defaultText
) {
  selectElement.innerHTML = `<option value="">${defaultText}</option>`;
  options.forEach((option) => {
    const opt = document.createElement("option");
    opt.value = option[valueKey];
    opt.textContent = option[textKey];
    selectElement.appendChild(opt);
  });
}

async function cargarComunidades() {
  const url = `${BASE_URL}/comunidades?key=${API_KEY}&type=json`;
  const comunidades = await fetchData(url);
  populateSelect(
    comunidadSelect,
    comunidades,
    "CCOM",
    "COM",
    "Selecciona una comunidad"
  );
}

async function cargarProvincias(codigoComunidad) {
  if (!codigoComunidad) {
    provinciaSelect.innerHTML =
      '<option value="">Selecciona una provincia</option>';
    return;
  }

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
  cargarComunidades();

  comunidadSelect.addEventListener("change", (event) => {
    cargarProvincias(event.target.value);
  });
});
