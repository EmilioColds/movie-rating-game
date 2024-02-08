// Supongamos que estos son los valores de dos películas que compararemos
// Puedes cambiar estos valores para probar cómo funciona el código
var valueA = 100; // Valor para la película A
var valueB = 120; // Valor para la película B

// Función que se ejecuta cuando haces clic en el botón "HIGHER"
function guessHigher() {
    // Comparamos si B es mayor que A
    if (valueB > valueA) {
        alert("Correcto! B es mayor que A.");
    } else {
        alert("Incorrecto. B no es mayor que A.");
    }
}

// Función que se ejecuta cuando haces clic en el botón "LOWER"
function guessLower() {
    // Comparamos si B es menor que A
    if (valueB < valueA) {
        alert("Correcto! B es menor que A.");
    } else {
        alert("Incorrecto. B no es menor que A.");
    }
}

// Obtenemos los botones del documento HTML por su ID
var higherButton = document.getElementById('higher-button');
var lowerButton = document.getElementById('lower-button');

// Agregamos event listeners a los botones para que ejecuten las funciones cuando sean clickeados
higherButton.addEventListener('click', guessHigher);
lowerButton.addEventListener('click', guessLower);
