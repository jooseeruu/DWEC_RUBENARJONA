
# Apuntes de Programación Asíncrona en JavaScript

JavaScript es un lenguaje de un solo hilo, lo que significa que, por defecto, ejecuta una sola tarea a la vez. Sin embargo, es fundamental manejar operaciones que puedan tardar (como solicitudes a servidores, temporizadores o acceso a bases de datos) sin bloquear la ejecución. Para ello, se utilizan técnicas asíncronas, entre las que destacan:

- **Callbacks**
- **Promesas**
- **async/await**

Cada técnica tiene sus particularidades y casos de uso. A continuación, se explica cada una con ejemplos detallados.

---

## 1. Callbacks

### Concepto

Un **callback** es una función que se pasa como argumento a otra función y se ejecuta cuando se completa cierta tarea. Los callbacks permiten definir el comportamiento a ejecutar tras la finalización de una operación, pudiendo ser tanto síncronos (como en métodos de arrays) como asíncronos (como en `setTimeout` o en operaciones de E/S).

### Ventajas y Desventajas

- **Ventajas:**  
  - Es el método más básico para manejar la asincronía.
  - Fácil de implementar para tareas simples.

- **Desventajas:**  
  - **Callback Hell:** Cuando se encadenan múltiples operaciones, el código se vuelve anidado y difícil de leer y mantener.
  - Difícil manejo de errores de forma uniforme, ya que cada callback debe gestionar su propio posible error.

### Ejemplo 1: Callback Asíncrono Sencillo

```javascript
// Función que simula una operación asíncrona con setTimeout
function operacionAsincrona(callback) {
  console.log("Inicio de la operación asíncrona");
  setTimeout(() => {
    const resultado = "Operación completada";
    // Se invoca el callback pasando el resultado
    callback(null, resultado);
  }, 1000);
}

// Uso de la función con callback para manejar el resultado
operacionAsincrona((error, resultado) => {
  if (error) {
    console.error("Error:", error);
  } else {
    console.log("Resultado recibido:", resultado);
  }
});
```

> **Notas:**  

> - Se utiliza `setTimeout` para simular una tarea asíncrona.
> - El callback recibe dos argumentos: el primero para el error (por convención en Node.js) y el segundo para el resultado.
> - Este patrón se repite en muchas APIs antiguas de JavaScript.

### Ejemplo 2: Callback Hell

Un ejemplo de múltiples operaciones anidadas:

```javascript
// Simulación de varias operaciones asíncronas anidadas
function operacion1(callback) {
  setTimeout(() => {
    console.log("Operación 1 completada");
    callback(null, "Resultado 1");
  }, 500);
}

function operacion2(resultado1, callback) {
  setTimeout(() => {
    console.log("Operación 2 completada, usando:", resultado1);
    callback(null, "Resultado 2");
  }, 500);
}

function operacion3(resultado2, callback) {
  setTimeout(() => {
    console.log("Operación 3 completada, usando:", resultado2);
    callback(null, "Resultado 3");
  }, 500);
}

// Encadenando las operaciones de forma anidada (callback hell)
operacion1((err1, res1) => {
  if (err1) return console.error(err1);
  operacion2(res1, (err2, res2) => {
    if (err2) return console.error(err2);
    operacion3(res2, (err3, res3) => {
      if (err3) return console.error(err3);
      console.log("Resultado final:", res3);
    });
  });
});
```

> **Punto Crítico:**  
> La anidación excesiva dificulta la legibilidad y el manejo de errores, lo que nos lleva a buscar alternativas más limpias, como las Promesas.

---

## 2. Promesas

### Concepto

Una **Promesa** es un objeto que representa la eventual finalización o fallo de una operación asíncrona y su valor resultante. Permite escribir código asíncrono de forma más lineal y estructurada.

### Estados de una Promesa

- **Pendiente (Pending):** La operación no se ha completado.
- **Cumplida (Fulfilled):** La operación se completó exitosamente.
- **Rechazada (Rejected):** La operación falló.

### Creación y Consumo de Promesas

#### Creación

Una promesa se crea utilizando el constructor `Promise`, que recibe un *executor* con dos parámetros: `resolve` y `reject`.

```javascript
const miPromesa = new Promise((resolve, reject) => {
  // Simulación de operación asíncrona
  setTimeout(() => {
    const exito = true; // Cambiar a false para probar el rechazo
    if (exito) {
      resolve("Operación exitosa");
    } else {
      reject("Error en la operación");
    }
  }, 1000);
});
```

#### Consumo

Se consumen las promesas utilizando `.then()`, `.catch()` y opcionalmente `.finally()`.

```javascript
miPromesa
  .then((resultado) => {
    console.log("Resultado:", resultado);
  })
  .catch((error) => {
    console.error("Error:", error);
  })
  .finally(() => {
    console.log("Operación finalizada");
  });
```

### Encadenamiento de Promesas

El encadenamiento permite ejecutar varias operaciones de forma secuencial sin caer en el anidamiento excesivo.

```javascript
function operacionA() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Operación A completada");
      resolve("Resultado A");
    }, 500);
  });
}

function operacionB(resultadoA) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Operación B completada, usando:", resultadoA);
      resolve("Resultado B");
    }, 500);
  });
}

function operacionC(resultadoB) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Operación C completada, usando:", resultadoB);
      resolve("Resultado C");
    }, 500);
  });
}

// Encadenamiento de promesas para evitar callback hell
operacionA()
  .then((resA) => operacionB(resA))
  .then((resB) => operacionC(resB))
  .then((resC) => console.log("Resultado final:", resC))
  .catch((error) => console.error("Error en la cadena:", error));
```

### Ejecución en Paralelo

Cuando se tienen múltiples operaciones independientes, se puede utilizar `Promise.all()` para ejecutarlas en paralelo:

```javascript
function tarea1() {
  return new Promise((resolve) => setTimeout(() => resolve("Tarea 1 completada"), 700));
}

function tarea2() {
  return new Promise((resolve) => setTimeout(() => resolve("Tarea 2 completada"), 500));
}

function tarea3() {
  return new Promise((resolve) => setTimeout(() => resolve("Tarea 3 completada"), 900));
}

Promise.all([tarea1(), tarea2(), tarea3()])
  .then((resultados) => {
    console.log("Resultados de todas las tareas:", resultados);
  })
  .catch((error) => console.error("Error en alguna tarea:", error));
```

> **Puntos a Recordar:**  

> - El método `Promise.all()` se rechaza si alguna de las promesas falla.
> - La estructura de las promesas facilita el manejo de errores y la lectura del flujo asíncrono.

---

## 3. async/await

### Concepto

La sintaxis **async/await** permite escribir código asíncrono de forma que se parezca al código síncrono, mejorando la legibilidad y el mantenimiento.  
- Una función marcada como `async` siempre devuelve una promesa.
- La palabra clave `await` se utiliza para esperar la resolución (o rechazo) de una promesa dentro de una función `async`.

### Ejemplo Básico

```javascript
// Función que devuelve una promesa
function esperar2Segundos() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Operación resuelta después de 2 segundos");
    }, 2000);
  });
}

// Función asíncrona que utiliza await
async function ejemploAsyncAwait() {
  console.log("Inicio de la operación con async/await");
  const resultado = await esperar2Segundos(); // Se espera la resolución de la promesa
  console.log("Resultado:", resultado);
  return "Fin de la función async";
}

ejemploAsyncAwait()
  .then((mensaje) => console.log(mensaje))
  .catch((error) => console.error("Error:", error));
```

### Manejo de Errores con try/catch

Para gestionar errores en funciones async, se utiliza el bloque `try/catch`, lo que permite capturar cualquier rechazo de las promesas esperadas.

```javascript
async function obtenerDatosDeUsuario() {
  try {
    const respuesta = await fetch('/usuarios.json');
    if (!respuesta.ok) {
      throw new Error("Error en la solicitud: " + respuesta.statusText);
    }
    const usuarios = await respuesta.json();
    const usuario = usuarios[0];
    const detalleRespuesta = await fetch(`/usuarios/${usuario.id}`);
    const detalle = await detalleRespuesta.json();
    console.log("Datos del usuario:", detalle);
  } catch (error) {
    console.error("Error al obtener los datos:", error);
  }
}

obtenerDatosDeUsuario();
```

### Comparación y Ventajas

- **Legibilidad:**  
  El código escrito con async/await se lee de forma secuencial, lo que facilita la comprensión de la lógica.
- **Depuración:**  
  El uso de async/await permite que el depurador "salte" de forma natural entre las operaciones asíncronas sin entrar en un profundo encadenamiento.
- **Manejo de errores:**  
  El patrón try/catch centraliza el manejo de errores, evitando la dispersión de bloques `.catch()`.



## Conclusiones y Recomendaciones para el Examen

1. **Callbacks:**  
   - Son esenciales para entender la base de la asincronía en JavaScript.
   - Ten en cuenta el problema del callback hell y cómo se vuelve difícil de mantener cuando se anidan múltiples operaciones.

2. **Promesas:**  
   - Permiten un flujo lineal y limpio en la ejecución de tareas asíncronas.
   - El encadenamiento de promesas facilita la lectura y el manejo de errores mediante `.catch()`.
   - Conoce el uso de `Promise.all()` para ejecutar tareas en paralelo.

3. **async/await:**  
   - Introducido en ES2017, simplifica enormemente la escritura de código asíncrono.
   - Recuerda que el uso de `await` solo es válido dentro de funciones marcadas con `async`.
   - Es recomendable utilizar try/catch para el manejo de errores en funciones async.
