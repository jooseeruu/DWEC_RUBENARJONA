// **Asignación de eventos con diferentes métodos**

// Propiedades de eventos
const button = document.getElementById("myButton");
button.onclick = function () {
  logEvent('Se hizo clic en el botón usando "onclick".');
};

// Método addEventListener (recomendado)
const box = document.getElementById("box");
box.addEventListener("mouseover", () => {
  box.classList.add("highlight");
  logEvent("El ratón está sobre el cuadro (mouseover).");
});
box.addEventListener("mouseout", () => {
  box.classList.remove("highlight");
  logEvent("El ratón salió del cuadro (mouseout).");
});

box.addEventListener("click", (event) => {
  logEvent(
    `Haz hecho clic dentro del cuadro. Tipo de puntero: ${event.pointerType}`
  );
});

// **Propagación y captura de eventos**
document.body.addEventListener(
  "click",
  (event) => {
    logEvent("Evento capturado en <body> durante la fase de captura.");
  },
  true // Captura activada
);

document.body.addEventListener("click", () => {
  logEvent("Evento detectado en <body> durante la fase de burbujeo.");
});

// **Eventos de teclado**
const textInput = document.getElementById("textInput");
textInput.addEventListener("keydown", (event) => {
  logEvent(`Tecla presionada: ${event.key}, Código: ${event.code}`);
});

textInput.addEventListener("keyup", (event) => {
  logEvent(`Tecla soltada: ${event.key}`);
});

// **Eventos de puntero**
box.addEventListener("pointerdown", (event) => {
  logEvent(`Puntero presionado dentro del cuadro. Tipo: ${event.pointerType}`);
});

box.addEventListener("pointerup", (event) => {
  logEvent(`Puntero liberado dentro del cuadro. Tipo: ${event.pointerType}`);
});

// Función auxiliar para registrar eventos
function logEvent(message) {
  const output = document.getElementById("output");
  const newLog = document.createElement("p");
  newLog.textContent = message;
  output.appendChild(newLog);
}
