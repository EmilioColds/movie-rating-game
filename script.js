// START GAME BUTTON// 

document.addEventListener('DOMContentLoaded', function () {
    const startGameButton = document.getElementById('start-button');
    const categoryIcons = document.querySelectorAll('.category-icons');
    const typeIcons = document.querySelectorAll('.type-icons');
    let categorySelected = false;
    let gameTypeSelected = false;


    function handleSelection(event) {

        if (event.target.closest('.category-icons')) {
            categorySelected = true;
        } else if (event.target.closest('.type-icons')) {
            gameTypeSelected = true;
        }

        startGameButton.disabled = !(categorySelected && gameTypeSelected);
    }

    categoryIcons.forEach(icon => icon.addEventListener('click', handleSelection));
    typeIcons.forEach(icon => icon.addEventListener('click', handleSelection));


    startGameButton.addEventListener('click', function () {
        document.getElementById('home-page').classList.add('hidden');
        document.getElementById('game-page').classList.remove('hidden');
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

// HIGHSCORE PAGE 2 // 
document.addEventListener('DOMContentLoaded', function () {
    var highscoresButton2 = document.getElementById('highscores-button2');
    highscoresButton2.addEventListener('click', function () {
        document.querySelectorAll('section').forEach(function (section) {
            section.classList.add('hidden');
        });
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


/////////////////////////////////////////////////


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

///////////////////////////////////////////////////////////////////////////////////

// Function para que los icons de HOME PAGE se pongan en HIGHLIGHT al ser seleccionados

function categorySelection(selectedElement) {

    document.querySelectorAll('.category-icons').forEach(image => {
        image.classList.remove('category-selected');
        image.classList.add('category-unselected')
    });

    selectedElement.classList.remove('category-unselected');
    selectedElement.classList.add('category-selected');
}

function typeSelection(selectedElement) {

    document.querySelectorAll('.type-icons').forEach(image => {
        image.classList.remove('type-selected');
        image.classList.add('type-unselected')
    });

    selectedElement.classList.remove('type-unselected');
    selectedElement.classList.add('type-selected');
}

/////////////////////////////////////

// Movie API section

/* const moviesAPIKey = "e240c7d3"; //
 var movieTitleOne = "ABC Life: The Movie";
//  var movieTitleTwo = 

fetch("http://www.omdbapi.com/?apikey=" + moviesAPIKey + "&t=" + movieTitleOne)

    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not OK");
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error("There was a problem with your fetch operation", error);
    });


let movieTitles = []; //array defined by the "getAllMovieTitles()" asyncFunction ; so that it can be used constantly in the code.

async function getAllMovieTitles() {
    const apiKey = '352a7d13';
    const apiUrl = `http://www.omdbapi.com/?s=movie&apikey=` + apiKey; // Example API URL to search for movies in general.

    let allMovieTitles = [];
    let page = 1;

    try {
        while (true) {
            const response = await fetch(apiUrl + "&page=" + page);
            const data = await response.json();
            console.log(data);
            if (data.Response === 'False') {
                console.log('No more movies found');
                break;
            }

            allMovieTitles.push(...data.Search.map(movie => movie.Title));
  

            if (!data.Search || data.Search.length < 10) {
                break;
            }

            page++;
        }

        movieTitles = allMovieTitles;
    } catch (error) {
        console.error('Error fetching movie data:', error);
    };

    return allMovieTitles;
};

async function getRandomMovieTitle() {
    if (movieTitles.length === 0) {
        console.log("Movie titles array is empty. Fetching movie titles...");
        await getAllMovieTitles();
    }
    const randomIndex = Math.floor(Math.random() * movieTitles.length);
    return movieTitles[randomIndex];
};

// Call the function to get all movie titles
getAllMovieTitles()

    .then(movieTitles => {
        console.log('All Movie Titles:', movieTitles);
    })
    .catch(error => {
        console.error('Error:', error);
    });

function getRandomMovieTitle() {

    if (movieTitles.length ===0) {
        console.log("Movie titles array is still empty.");
        return null;
    }

    const randomIndex = Math.floor(Math.random() * movieTitles.length);
    return movieTitles[randomIndex];
};

async function fetchleftMovieDetailsAndUpdateHTML(movieTitle) {
    const moviesAPIKey = "e240c7d3";
    const apiUrl = "http://www.omdbapi.com/?apikey=" + moviesAPIKey + "&t=" + encodeURIComponent(movieTitle);

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error("Network response was not OK");
        }
        const data = await response.json();
        updateHTMLWithMovieDetailsleft(data);
    } catch (error) {
        console.error("There was a problem with your fetch operation", error);
    };
};

function updateHTMLWithMovieDetailsleft(movieData) {
    const titleElement = document.getElementById("movie-title-left");
    titleElement.textContent = movieData.Title;
    const boxOfficeElement = document.getElementById("rating-boxoffice-left");
    boxOfficeElement.textContent = movieData.Metascore;
    const posterElement = document.getElementById("poster-left");
    posterElement.src = movieData.Poster;
};


function randomMovieButtonClick() {
    const randomMovieTitle = getRandomMovieTitle();

    if (randomMovieTitle) {
        fetchleftMovieDetailsAndUpdateHTML(randomMovieTitle);

    } else {

        const displayElementTitle = document.getElementById("movie-title-left");
        displayElementTitle.textContent = "No movie title available yet";
    };
};

const randomMovieButton = document.getElementById("randomMovieButton");
randomMovieButton.addEventListener("click", randomMovieButtonClick);


fetch('movieTitles.json')
  .then(response => {
    return response.json();
  })
  .then(allMovieTitles => {
    console.log(allMovieTitles)
  })
  .catch(error => console.error(error));
*/ 
