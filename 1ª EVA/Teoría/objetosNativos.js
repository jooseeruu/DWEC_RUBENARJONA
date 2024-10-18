// Objeto Math
console.log(Math.PI); // Output: 3.141592653589793
console.log(Math.sqrt(16)); // Output: 4
console.log(Math.random()); // Output: Número aleatorio entre 0 y 1

// Objeto Date
const ahora = new Date();
console.log(ahora); // Output: Fecha y hora actuales
const fechaEspecifica = new Date(2024, 9, 18); // Año, Mes (0-11), Día
console.log(fechaEspecifica); // Output: Fri Oct 18 2024 00:00:00

// Objeto JSON
const jsonString = '{"nombre":"Ana","edad":28}';
const objetoDesdeJSON = JSON.parse(jsonString);
console.log(objetoDesdeJSON.nombre); // Output: Ana
const nuevoJsonString = JSON.stringify(objetoDesdeJSON);
console.log(nuevoJsonString); // Output: {"nombre":"Ana","edad":28}

// Objeto RegExp
const expresionRegular = /hola/i;
console.log(expresionRegular.test("Hola mundo")); // Output: true

// Objeto Array
const array = [1, 2, 3, 4, 5];
console.log(array.length); // Output: 5
array.push(6);
console.log(array); // Output: [1, 2, 3, 4, 5, 6]
array.pop();
console.log(array); // Output: [1, 2, 3, 4, 5]

// Objeto String
const cadena = "Hola, JavaScript!";
console.log(cadena.length); // Output: 16
console.log(cadena.toUpperCase()); // Output: HOLA, JAVASCRIPT!
console.log(cadena.substring(0, 4)); // Output: Hola

// Objeto Number
const numero = 123.456;
console.log(numero.toFixed(2)); // Output: 123.46
console.log(Number.isInteger(numero)); // Output: false

// Objeto Boolean
const verdad = true;
const falsedad = false;
console.log(verdad.toString()); // Output: true
console.log(falsedad.valueOf()); // Output: false

// Objeto Symbol
const simbolo1 = Symbol("identificador");
const simbolo2 = Symbol("identificador");
console.log(simbolo1 === simbolo2); // Output: false
console.log(simbolo1.description); // Output: identificador

// Objeto Error
try {
  throw new Error("¡Algo salió mal!");
} catch (error) {
  console.error(error.message); // Output: ¡Algo salió mal!
}

// Objeto Map
const mapa = new Map();
mapa.set("nombre", "José");
mapa.set("edad", 45);
console.log(mapa.get("nombre")); // Output: José
console.log(mapa.size); // Output: 2

// Objeto Set
const conjunto = new Set([1, 2, 3, 3, 4]);
conjunto.add(5);
console.log(conjunto); // Output: Set(5) { 1, 2, 3, 4, 5 }

// Objeto WeakMap
let objeto1 = {};
let objeto2 = {};
const weakMap = new WeakMap();
weakMap.set(objeto1, "valor1");
weakMap.set(objeto2, "valor2");
console.log(weakMap.get(objeto1)); // Output: valor1

// Objeto WeakSet
let obj1 = {};
let obj2 = {};
const weakSet = new WeakSet([obj1]);
weakSet.add(obj2);
console.log(weakSet.has(obj1)); // Output: true

// Objeto Intl.DateTimeFormat
const fecha = new Date(Date.UTC(2024, 10, 18, 3, 0, 0));
const formatoFecha = new Intl.DateTimeFormat("es-ES", {
  year: "numeric",
  month: "long",
  day: "numeric",
});
console.log(formatoFecha.format(fecha)); // Output: 18 de noviembre de 2024

// Objeto Intl.NumberFormat
const numeroFormateado = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
}).format(123456.789);
console.log(numeroFormateado); // Output: 123.456,79 €

// Objeto Promise
const promesa = new Promise((resolve, reject) => {
  setTimeout(() => resolve("Promesa cumplida!"), 2000);
});
promesa.then((mensaje) => console.log(mensaje)); // Output: Promesa cumplida!

// Objeto Proxy
const objetivo = { mensaje: "Hola" };
const manejador = {
  get: function (objetivo, propiedad) {
    return propiedad in objetivo
      ? objetivo[propiedad]
      : "Propiedad no encontrada";
  },
};
const proxy = new Proxy(objetivo, manejador);
console.log(proxy.mensaje); // Output: Hola
console.log(proxy.noExiste); // Output: Propiedad no encontrada

// Objeto Reflect
const obj = { nombre: "Ana" };
Reflect.set(obj, "edad", 28);
console.log(obj); // Output: { nombre: 'Ana', edad: 28 }
console.log(Reflect.get(obj, "nombre")); // Output: Ana
console.log(Reflect.has(obj, "edad")); // Output: true

// Uso de Symbol.iterator
const iteradorArray = [1, 2, 3, 4, 5];
const iterador = iteradorArray[Symbol.iterator]();
console.log(iterador.next().value); // Output: 1
console.log(iterador.next().value);
