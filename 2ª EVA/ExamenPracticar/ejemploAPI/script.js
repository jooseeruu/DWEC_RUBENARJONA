// URL de la API de Random User (se solicitarán 5 usuarios)
const apiURL = "https://randomuser.me/api/?results=5";

// Referencias a elementos del DOM
const loadingDiv = document.getElementById("loading");
const usersContainer = document.getElementById("usersContainer");
const callbackBtn = document.getElementById("callbackBtn");
const promiseBtn = document.getElementById("promiseBtn");
const asyncBtn = document.getElementById("asyncBtn");

/**
 * Función para mostrar el indicador de carga.
 */
function showLoading() {
  loadingDiv.classList.remove("hidden");
}

/**
 * Función para ocultar el indicador de carga.
 */
function hideLoading() {
  loadingDiv.classList.add("hidden");
}

/**
 * Función para renderizar los usuarios en el DOM.
 * @param {Array} users - Array de objetos de usuario.
 */
function renderUsers(users) {
  usersContainer.innerHTML = ""; // Limpia el contenedor
  users.forEach((user) => {
    const userDiv = document.createElement("div");
    userDiv.classList.add("user");
    userDiv.innerHTML = `
      <img src="${user.picture.medium}" alt="Foto de ${user.name.first}">
      <p>${user.name.first} ${user.name.last}</p>
      <p>${user.email}</p>
    `;
    usersContainer.appendChild(userDiv);
  });
}

/**
 * Función para mostrar un mensaje de error en el DOM.
 * @param {String} errorMessage - Mensaje de error a mostrar.
 */
function renderError(errorMessage) {
  usersContainer.innerHTML = `<p class="error">${errorMessage}</p>`;
}

/* ============================================================
   MÉTODO 1: Uso de CALLBACKS
   ============================================================ */

/**
 * Función que obtiene los usuarios usando fetch y maneja la respuesta mediante un callback.
 * @param {Function} callback - Función callback que recibe (error, data).
 */
function fetchUsersCallback(callback) {
  showLoading();
  fetch(apiURL)
    .then((response) => response.json())
    .then((data) => {
      hideLoading();
      // Llamamos al callback sin error y pasamos los usuarios
      callback(null, data.results);
    })
    .catch((error) => {
      hideLoading();
      // Llamamos al callback con el error
      callback(error, null);
    });
}

// Evento para el botón de Callback
callbackBtn.addEventListener("click", () => {
  // Limpia el contenedor de usuarios
  usersContainer.innerHTML = "";
  fetchUsersCallback((error, users) => {
    if (error) {
      renderError("Error al cargar usuarios (Callback): " + error.message);
    } else {
      renderUsers(users);
    }
  });
});

/* ============================================================
   MÉTODO 2: Uso DE PROMESAS
   ============================================================ */

/**
 * Función que obtiene los usuarios y retorna una promesa.
 * @returns {Promise} Promesa que se resuelve con el array de usuarios.
 */
function fetchUsersPromise() {
  showLoading();
  return fetch(apiURL)
    .then((response) => response.json())
    .then((data) => {
      hideLoading();
      return data.results;
    });
}

// Evento para el botón de Promesas
promiseBtn.addEventListener("click", () => {
  // Limpia el contenedor de usuarios
  usersContainer.innerHTML = "";
  fetchUsersPromise()
    .then((users) => {
      renderUsers(users);
    })
    .catch((error) => {
      hideLoading();
      renderError("Error al cargar usuarios (Promesas): " + error.message);
    });
});

/* ============================================================
   MÉTODO 3: USO DE ASYNC/AWAIT
   ============================================================ */

/**
 * Función asíncrona que obtiene los usuarios usando async/await.
 */
async function fetchUsersAsync() {
  showLoading();
  try {
    const response = await fetch(apiURL);
    if (!response.ok) {
      throw new Error("La respuesta no fue correcta");
    }
    const data = await response.json();
    hideLoading();
    renderUsers(data.results);
  } catch (error) {
    hideLoading();
    renderError("Error al cargar usuarios (Async/Await): " + error.message);
  }
}

// Evento para el botón de Async/Await
asyncBtn.addEventListener("click", () => {
  // Limpia el contenedor de usuarios
  usersContainer.innerHTML = "";
  fetchUsersAsync();
});
