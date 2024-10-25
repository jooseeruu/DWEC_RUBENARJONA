const str = "Hola mundo";
const palabras = str.split(" ");
let lista = [];

palabras.forEach(function (palabra) {
  lista.push(palabra);
});
console.log(lista);
const coincidencia = str.match(/mundo/);
if (coincidencia) {
  lista.push(coincidencia[0]);
}

console.log(lista);
