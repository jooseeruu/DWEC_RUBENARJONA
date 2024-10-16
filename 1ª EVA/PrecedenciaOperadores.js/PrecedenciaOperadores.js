//1.¿Cuál será la salida de los siguientes códigos?
alert(null || 2 || undefined); // 2
alert(alert(1) || 2 || alert(3)); // 1 seguido de 2
alert(1 && null && 2); // null
alert(alert(1) && alert(2)); // 1 seguido de undefined
alert(null || (2 && 3) || 4); // 3

//2.¿Cuáles de estos alert va a ejecutarse? ¿Y cuáles serán los resultados de las expresiones dentro de if(...)?
if (-1 || 0) alert("primero"); // El alert se ejecutará, resultado: "primero"

if (-1 && 0) alert("segundo"); // El alert NO se ejecutará

if (null || (-1 && 1)) alert("tercero"); // El alert se ejecutará, resultado: "tercero"
