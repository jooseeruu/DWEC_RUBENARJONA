const str = "Hola mundo";
const palabras = str.split(" ");
let lista = [];

palabras.forEach((palabra) => {
  lista.push(palabra);
});

console.log(lista);
