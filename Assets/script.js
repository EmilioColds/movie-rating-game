
let categorySelected = false;
let gameTypeSelected = false;


function updateButtonState() {
    const button = document.getElementById('start-game-button');
    button.disabled = !(categorySelected && gameTypeSelected);
}


document.getElementById('category-row').addEventListener('click', function (event) {
    if (event.target.closest('.game-image')) {
        categorySelected = true;
        updateButtonState();
    }
});


document.getElementById('game-type-row').addEventListener('click', function (event) {
    if (event.target.closest('.game-image')) {
        gameTypeSelected = true;
        updateButtonState();
    }
});



/// START BUTTON



document.addEventListener('DOMContentLoaded', function () {
    var startButton = document.getElementById('start-button');
    startButton.onclick = function () {
        var homePage = document.getElementById('home-page');
        var gamePage = document.getElementById('game-page');
        homePage.style.display = 'none';
        gamePage.style.display = 'block';
    };
});

