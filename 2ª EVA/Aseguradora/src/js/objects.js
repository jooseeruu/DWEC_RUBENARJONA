console.log("El archivo objects.js se ha cargado correctamente.");
// Datos de marcas y modelos
const Coches = {
  Abarth: ["500", "595", "695"],
  "Alfa Romeo": ["Giulia", "Stelvio", "Tonale"],
  Audi: ["A3", "A4", "Q5"],
  BMW: ["Serie 1", "Serie 3", "X5"],
  Citroën: ["C3", "C4", "C5 Aircross"],
  Dacia: ["Sandero", "Duster", "Jogger"],
  Fiat: ["500", "Panda", "Tipo"],
  Ford: ["Fiesta", "Focus", "Kuga"],
  Honda: ["Civic", "HR-V", "CR-V"],
  Hyundai: ["i20", "i30", "Tucson"],
  Kia: ["Rio", "Ceed", "Sportage"],
  Mazda: ["Mazda2", "Mazda3", "CX-5"],
  "Mercedes-Benz": ["Clase A", "Clase C", "GLC"],
  Nissan: ["Micra", "Qashqai", "X-Trail"],
  Opel: ["Corsa", "Astra", "Grandland"],
  Peugeot: ["208", "308", "3008"],
  Renault: ["Clio", "Mégane", "Captur"],
  SEAT: ["Ibiza", "León", "Arona"],
  Škoda: ["Fabia", "Octavia", "Kodiaq"],
  Toyota: ["Yaris", "Corolla", "RAV4"],
  Volkswagen: ["Polo", "Golf", "Tiguan"],
  Volvo: ["XC40", "XC60", "XC90"],
};

// Referencias a los elementos select
const marcaSelect = document.getElementById("marca");
const modeloSelect = document.getElementById("modelo");

// Función para poblar el select de marcas
document.addEventListener("DOMContentLoaded", () => {
  const marcas = Object.keys(Coches);
  marcaSelect.innerHTML =
    '<option value="">Selecciona una marca</option>' +
    marcas
      .map((marca) => `<option value="${marca}">${marca}</option>`)
      .join("");
});

// Evento para poblar los modelos al seleccionar una marca
marcaSelect.addEventListener("change", () => {
  const marca = marcaSelect.value;
  if (marca) {
    modeloSelect.innerHTML =
      '<option value="">Selecciona un modelo</option>' +
      Coches[marca]
        .map((modelo) => `<option value="${modelo}">${modelo}</option>`)
        .join("");
  } else {
    modeloSelect.innerHTML = '<option value="">Selecciona un modelo</option>';
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const tiposCombustible = [
    { valor: "diesel", texto: "Diesel" },
    { valor: "gasolina", texto: "Gasolina" },
    { valor: "hibrido", texto: "Híbrido" },
    { valor: "electrico", texto: "Eléctrico" },
  ];

  const selectTipo = document.getElementById("tipo");

  // Opciones dinámicas
  tiposCombustible.forEach((tipo) => {
    const opcion = document.createElement("option");
    opcion.value = tipo.valor;
    opcion.textContent = tipo.texto;
    selectTipo.appendChild(opcion);
  });
});
