// Creación de Arrays
let miArray = []; // Array vacío
let numeros = [1, 2, 3, 4, 5]; // Array con números
let mezclado = [1, "texto", true]; // Array mixto

// Acceso a Elementos
console.log(numeros[0]); // Imprime 1
console.log(numeros[3]); // Imprime 4

// Métodos Comunes
numeros.push(6); // [1, 2, 3, 4, 5, 6]
numeros.pop(); // [1, 2, 3, 4, 5]
numeros.shift(); // [2, 3, 4, 5]
numeros.unshift(1); // [1, 2, 3, 4, 5]
console.log(numeros.length); // Imprime 5

// Iteración
for (let i = 0; i < numeros.length; i++) {
  console.log(numeros[i]);
}

numeros.forEach(function (numero) {
  console.log(numero);
});

// Métodos Avanzados
let dobles = numeros.map((x) => x * 2); // [2, 4, 6, 8, 10]
let pares = numeros.filter((x) => x % 2 === 0); // [2, 4]
let suma = numeros.reduce((total, x) => total + x, 0); // 15

// Métodos de Ordenación
numeros.sort((a, b) => a - b); // [1, 2, 3, 4, 5]
numeros.reverse(); // [5, 4, 3, 2, 1]
