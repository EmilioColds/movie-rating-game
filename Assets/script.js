// PASS GAME PAGE

document.addEventListener('DOMContentLoaded', function () {

    const startGameButton = document.getElementById('start-button');
    startGameButton.disabled = true;

    function checkIfSelectionMade() {
        const categorySelected = document.querySelector('#category-row .game-image.selected') !== null;
        const gameTypeSelected = document.querySelector('#game-type-row .game-image.selected') !== null;

        startGameButton.disabled = !(categorySelected && gameTypeSelected);
    }

    function addSelectionListener(selector) {
        document.querySelectorAll(selector).forEach(item => {
            item.addEventListener('click', function () {

                const currentlySelected = item.parentNode.querySelector('.selected');
                if (currentlySelected) {
                    currentlySelected.classList.remove('selected');
                }


                item.classList.add('selected');

                checkIfSelectionMade();
            });
        });
    }

    addSelectionListener('#category-row .game-image');
    addSelectionListener('#game-type-row .game-image');

    startGameButton.addEventListener('click', function () {
        if (!this.disabled) {

            document.getElementById('home-page').style.display = 'none';
            document.getElementById('game-page').style.display = 'block';
        }
    });
});


// HIGHSCORES PAGE // 

document.addEventListener('DOMContentLoaded', function () {

    var highscoresButton = document.getElementById('highscores-button');


    highscoresButton.addEventListener('click', function () {

        document.getElementById('home-page').classList.add('hidden');
        document.getElementById('highscores-page').classList.remove('hidden');
    });
});



// PLAY AGAIN BUTTON 
document.addEventListener('DOMContentLoaded', function () {
    var playAgainButton = document.getElementById('play-again-button');
    function resetViewToShowHomePage() {
        var sections = document.querySelectorAll('main > section');
        sections.forEach(function (section) {
            section.classList.add('hidden');
        });
        var homePage = document.getElementById('home-page');
        homePage.classList.remove('hidden');
    }
    playAgainButton.addEventListener('click', resetViewToShowHomePage);
});



// PLAY AGAIN BUTTON 2 

document.addEventListener('DOMContentLoaded', function () {
    var playAgainButton2 = document.getElementById('play-again-button2');
    playAgainButton2.addEventListener('click', function () {
        var sections = document.querySelectorAll('main > section');
        sections.forEach(function (section) {
            section.classList.add('hidden');
        });
        var homePage = document.getElementById('home-page');
        homePage.classList.remove('hidden');
    });
});


// WATCHLIST 


document.addEventListener('DOMContentLoaded', function () {

    var watchlistButtonLeft = document.getElementById('watchlist-button-left');
    var watchlistButtonRight = document.getElementById('watchlist-button-right');


    function addToWatchlist(movieTitle) {
        var li = document.createElement('li');
        li.textContent = movieTitle;
        li.classList.add('p-2');
        document.getElementById('watchlist-elements').appendChild(li);
    }

    watchlistButtonLeft.addEventListener('click', function () {
        var movieTitleLeft = document.getElementById('movie-title-left').textContent;
        addToWatchlist(movieTitleLeft);
    });

    watchlistButtonRight.addEventListener('click', function () {
        var movieTitleRight = document.getElementById('movie-title-right').textContent;
        addToWatchlist(movieTitleRight);
    });
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

