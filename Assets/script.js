
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
const YouTubeAPIKey = "AIzaSyDXbp7YPyb65jrrSvvqv53H8-q1W3V9dJ8";

//Searches for the Video Title in de google API
function searchVideo(element) {
    const searchQuery = element.textContent + " trailer"; //Defines itself depending on the text inside the <li> element onclick.
    const url = `https://www.googleapis.com/youtube/v3/search?key=${YouTubeAPIKey}&q=${searchQuery}&part=snippet&type=video&maxResults=1`;

    fetch(url)
        .then(response => response.json()) //extracts the Json data from the response received form the API.
        .then(data => {
            if (data.items && data.items.length > 0) {
                const videoId = data.items[0].id.videoId; //Extract the Id of the youtube video with the title of the searchQuery.
                const videoUrl = `https://www.youtube.com/watch?v=${videoId}`; //Defines the url of the FIRST video found in the search result.
                window.open(videoUrl); //Opens the link in a new browser window.
            } else {
                alert('No trailer found.');                 //CAMBIAR A ALGO FISICO GENERADO EN EL HTML!!!
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while searching for the video.');                 //CAMBIAR A ALGO FISICO GENERADO EN EL HTML!!!
        });
}


// <li onclick="searchVideo(this)">Gladiator</li> <!--Ejemplo de un elemento the watchlist-->

