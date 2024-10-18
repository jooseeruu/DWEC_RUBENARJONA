// Creación de un objeto simple
const persona = {
  nombre: "Juan",
  edad: 30,
  profesion: "Desarrollador",
};

// Acceder a propiedades del objeto
console.log(persona.nombre); // Output: Juan
console.log(persona.edad); // Output: 30

// Modificar propiedades del objeto
persona.edad = 31;
console.log(persona.edad); // Output: 31

// Añadir nuevas propiedades al objeto
persona.pais = "España";
console.log(persona.pais); // Output: España

// Métodos en objetos
const coche = {
  marca: "Toyota",
  modelo: "Corolla",
  arrancar: function () {
    console.log("El coche está arrancado");
  },
  parar: function () {
    console.log("El coche está apagado");
  },
};

coche.arrancar(); // Output: El coche está arrancado
coche.parar(); // Output: El coche está apagado

// Objetos anidados
const empresa = {
  nombre: "Tech Solutions",
  ubicacion: {
    ciudad: "Madrid",
    pais: "España",
  },
  empleados: ["Ana", "Carlos", "Pedro"],
  mostrarInfo: function () {
    console.log(
      `${this.nombre} está ubicado en ${this.ubicacion.ciudad}, ${this.ubicacion.pais}`
    );
  },
};

empresa.mostrarInfo(); // Output: Tech Solutions está ubicado en Madrid, España
console.log(empresa.empleados[1]); // Output: Carlos

// Uso de 'this' dentro de métodos
const usuario = {
  nombre: "María",
  edad: 25,
  saludar: function () {
    console.log(`Hola, mi nombre es ${this.nombre}`);
  },
  cumplirAños: function () {
    this.edad += 1;
  },
};

usuario.saludar(); // Output: Hola, mi nombre es María
usuario.cumplirAños();
console.log(usuario.edad); // Output: 26

// Objetos y Arrays
const libro = {
  titulo: "El Quijote",
  autor: "Miguel de Cervantes",
  capitulos: ["Capítulo 1", "Capítulo 2", "Capítulo 3"],
};

console.log(libro.capitulos[0]); // Output: Capítulo 1

// Iterar sobre las propiedades de un objeto
const ciudad = {
  nombre: "Barcelona",
  poblacion: 1620000,
  pais: "España",
};

for (let propiedad in ciudad) {
  console.log(`${propiedad}: ${ciudad[propiedad]}`);
  // Output:
  // nombre: Barcelona
  // poblacion: 1620000
  // pais: España
}

// Objetos dentro de Arrays
const animales = [
  { especie: "Perro", nombre: "Rex" },
  { especie: "Gato", nombre: "Miau" },
  { especie: "Loro", nombre: "Loro" },
];

animales.forEach((animal) => {
  console.log(`${animal.nombre} es un ${animal.especie}`);
  // Output:
  // Rex es un Perro
  // Miau es un Gato
  // Loro es un Loro
});
