
var valueA = 100;
var valueB = 200;

function guessHigher() {

    if (valueB > valueA) {
        alert("Correcto! ");
    } else {
        alert("Incorrecto.");
    }
}

function guessLower() {

    if (valueB < valueA) {
        alert("Correcto! ");
    } else {
        alert("Incorrecto.");
    }
}
var higherButton = document.getElementById('higher-button');
var lowerButton = document.getElementById('lower-button');


higherButton.addEventListener('click', guessHigher);
lowerButton.addEventListener('click', guessLower);