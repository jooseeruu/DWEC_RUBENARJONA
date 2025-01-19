document.addEventListener("DOMContentLoaded", () => {
  const tablero = document.getElementById("tablero");
  let contenedorOrigen = null; // Guardamos contenedor de origen durante drag

  // =========================================================
  // 1. FUNCION PARA CREAR NUEVA LISTA
  // =========================================================
  function crearLista(nombre = "Nueva Lista") {
    const lista = document.createElement("div");
    lista.classList.add("list");

    // Título editable
    const titulo = document.createElement("div");
    titulo.classList.add("list-title");
    titulo.contentEditable = true;
    titulo.textContent = nombre;
    lista.appendChild(titulo);

    // Contenedor de tarjetas
    const listaTarjetas = document.createElement("div");
    listaTarjetas.classList.add("cards");
    lista.appendChild(listaTarjetas);

    // Botón: Añadir tarjeta
    const botonAgregarTarjeta = crearBoton(
      "Añadir tarjeta",
      () => crearTarjeta(listaTarjetas),
      "btn-add-card" // <-- clase específica
    );
    lista.appendChild(botonAgregarTarjeta);

    // Botón: Eliminar lista
    const botonEliminarLista = crearBoton(
      "Eliminar lista",
      () => lista.remove(),
      "btn-delete-list" // <-- clase específica
    );
    lista.appendChild(botonEliminarLista);

    // Drag & drop en el contenedor de tarjetas
    agregarEventosDragDrop(listaTarjetas);

    // Verificar contenedor vacío
    verificarContenedorVacio(listaTarjetas);

    // Agregar la lista al tablero
    tablero.appendChild(lista);
  }

  // =========================================================
  // 2. FUNCION PARA CREAR TARJETA
  // =========================================================
  function crearTarjeta(contenedor) {
    const tarjeta = document.createElement("div");
    tarjeta.classList.add("card");
    tarjeta.draggable = true;

    // Contenido editable
    const contenido = document.createElement("div");
    contenido.contentEditable = true;
    contenido.textContent = "Nueva tarjeta";
    tarjeta.appendChild(contenido);

    // Botón para eliminar tarjeta
    const botonEliminar = crearBoton(
      "X",
      () => {
        tarjeta.remove();
        verificarContenedorVacio(contenedor);
      },
      "btn-delete-card" // <-- clase específica
    );
    tarjeta.appendChild(botonEliminar);

    // Eventos dragstart / dragend
    tarjeta.addEventListener("dragstart", (e) => {
      contenedorOrigen = tarjeta.parentElement;
      tarjeta.classList.add("dragging");
      e.dataTransfer.setData("text/plain", "");
    });

    tarjeta.addEventListener("dragend", () => {
      tarjeta.classList.remove("dragging");
      verificarContenedorVacio(contenedorOrigen);
    });

    // Insertamos la tarjeta
    contenedor.appendChild(tarjeta);
    verificarContenedorVacio(contenedor);
  }

  // =========================================================
  // 3. AGREGAR EVENTOS DRAG & DROP
  // =========================================================
  function agregarEventosDragDrop(contenedor) {
    contenedor.addEventListener("dragover", (e) => {
      e.preventDefault();
      // posible indicador visual
    });

    contenedor.addEventListener("dragenter", () => {
      contenedor.classList.add("hover");
    });

    contenedor.addEventListener("dragleave", () => {
      contenedor.classList.remove("hover");
    });

    contenedor.addEventListener("drop", (e) => {
      e.preventDefault();
      contenedor.classList.remove("hover");

      const tarjetaArrastrada = document.querySelector(".dragging");
      if (tarjetaArrastrada) {
        contenedor.appendChild(tarjetaArrastrada);
        verificarContenedorVacio(contenedor);
      }
    });
  }

  // =========================================================
  // 4. VERIFICAR SI UN CONTENEDOR ESTÁ VACÍO
  // =========================================================
  function verificarContenedorVacio(contenedor) {
    if (contenedor.children.length === 0) {
      contenedor.classList.add("empty");
    } else {
      contenedor.classList.remove("empty");
    }
  }

  // =========================================================
  // 5. FUNCIÓN HELPER PARA CREAR BOTONES (con clase opcional)
  // =========================================================
  function crearBoton(texto, accion, className = "") {
    const boton = document.createElement("button");
    boton.textContent = texto;
    boton.addEventListener("click", accion);

    // Clase base .btn para todos
    boton.classList.add("btn");
    // Clase específica si se pasa en el 3er parámetro
    if (className) {
      boton.classList.add(className);
    }

    return boton;
  }

  // =========================================================
  // 6. INICIALIZACIÓN DE LA APP
  // =========================================================
  // Botón para añadir listas (global)
  const botonAgregarLista = document.createElement("button");
  botonAgregarLista.textContent = "Añadir Lista";
  // Agregamos clase base y clase específica
  botonAgregarLista.classList.add("btn", "btn-add-list");

  // Insertarlo antes del tablero
  document.body.insertBefore(botonAgregarLista, tablero);

  // Evento para crear listas
  botonAgregarLista.addEventListener("click", () => {
    crearLista();
  });

  // Crear listas iniciales
  crearLista("Por Hacer");
  crearLista("En Progreso");
  crearLista("Hecho");
});
