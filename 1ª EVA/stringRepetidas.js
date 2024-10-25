function eliminarRepetidas(cadena) {
  const caracteres = cadena.split("");
  return caracteres
    .filter(function (letra, indice) {
      // Verificar si es 'l' o 'r'
      if (letra === "l" || letra === "r") {
        // Permitir hasta dos 'l' o 'r' consecutivas
        return (
          caracteres[indice - 1] !== letra || caracteres[indice - 2] !== letra
        );
      } else {
        // Eliminar letras repetidas
        return letra !== caracteres[indice - 1];
      }
    })
    .join("");
}

// Ejemplo de uso
const cadenaOriginal = "aaaaabbbcccllrrrdeeefff";
const cadenaSinRepetidas = eliminarRepetidas(cadenaOriginal);
console.log(cadenaSinRepetidas); // Salida: "abccllrrde"
