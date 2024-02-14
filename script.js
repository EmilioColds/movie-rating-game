// START GAME BUTTON//

document.addEventListener("DOMContentLoaded", function () {
  const startGameButton = document.getElementById("start-button");
  const categoryIcons = document.querySelectorAll(".category-icons");
  const typeIcons = document.querySelectorAll(".type-icons");
  let categorySelected = false;
  let gameTypeSelected = false;

  startGameButton.addEventListener("click", function () {
    document.getElementById("home-page").classList.add("hidden");
    document.getElementById("game-page").classList.remove("hidden");
  });
});

// HIGHSCORES PAGE //

document.addEventListener("DOMContentLoaded", function () {
  var highscoresButton = document.getElementById("highscores-button");

  highscoresButton.addEventListener("click", function () {
    document.getElementById("home-page").classList.add("hidden");
    document.getElementById("watchlist-page").classList.remove("hidden");
  });
});

// HIGHSCORE PAGE 2 //
document.addEventListener("DOMContentLoaded", function () {
  var highscoresButton2 = document.getElementById("highscores-button2");
  highscoresButton2.addEventListener("click", function () {
    document.querySelectorAll("section").forEach(function (section) {
      section.classList.add("hidden");
    });
    document.getElementById("highscores-page").classList.remove("hidden");
  });
});

// PLAY AGAIN BUTTON
document.addEventListener("DOMContentLoaded", function () {
  var playAgainButton = document.getElementById("play-again-button");
  function resetViewToShowHomePage() {
    var sections = document.querySelectorAll("main > section");
    sections.forEach(function (section) {
      section.classList.add("hidden");
    });
    var homePage = document.getElementById("home-page");
    homePage.classList.remove("hidden");
  }
  playAgainButton.addEventListener("click", resetViewToShowHomePage);
});

// PLAY AGAIN BUTTON 2

document.addEventListener("DOMContentLoaded", function () {
  var playAgainButton2 = document.getElementById("play-again-button2");
  playAgainButton2.addEventListener("click", function () {
    var sections = document.querySelectorAll("main > section");
    sections.forEach(function (section) {
      section.classList.add("hidden");
    });
    var homePage = document.getElementById("home-page");
    homePage.classList.remove("hidden");
  });
});


///////////////////////WATCHLIST BUTTONS//////////////////////////////////////////////////////////////
window.onload = function() {
    loadWatchlist();
};

document.getElementById("watchlist-button-left").addEventListener("click", function() {
    var movieNameLeft = document.getElementById("movie-title-left").innerText;
    
    var watchlistListItem = document.createElement('h4');
    watchlistListItem.textContent = movieNameLeft;

    watchlistListItem.setAttribute('onclick', 'searchVideo(this)');

    var listItem = document.querySelector("#watchlist-elements li");
    listItem.appendChild(watchlistListItem);

    saveWatchlist();
});

document.getElementById("watchlist-button-right").addEventListener("click", function() {
    var movieNameRight = document.getElementById("movie-title-right").innerText;
    
    var watchlistListItem = document.createElement('h4');
    watchlistListItem.textContent = movieNameRight;

    watchlistListItem.setAttribute('onclick', 'searchVideo(this)');

    var listItem = document.querySelector("#watchlist-elements li");
    listItem.appendChild(watchlistListItem);

    saveWatchlist();
});


//Function to save waatchlist to localstorage.
function saveWatchlist() {
    var watchlistListItems = document.querySelectorAll("#watchlist-elements li h4");
    var watchlistArray = [];

    watchlistListItems.forEach(function(item) {
        watchlistArray.push(item.textContent);
    });

    localStorage.setItem("watchlist", JSON.stringify(watchlistArray));
};

//Loads watchlist from local storage.
function loadWatchlist() {
    var watchlist = localStorage.getItem("watchlist");
    if (watchlist) {
        var watchlistArray = JSON.parse(watchlist);
        
        watchlistArray.forEach(function(itemText) {
            var watchlistListItem = document.createElement("h4");
            watchlistListItem.textContent = itemText;
            //Adds 'onclick' to the h4 element.
            watchlistListItem.setAttribute('onclick', 'searchVideo(this)');

            var removeIcon = document.createElement("span");
            removeIcon.textContent = "❌";
            removeIcon.classList.add("remove-icon");
            removeIcon.onclick = function(event) {
                event.stopPropagation();
                removeItemFromWatchlist(itemText, watchlistListItem);
            };

            watchlistListItem.appendChild(removeIcon);

            

            var listItem = document.querySelector("#watchlist-elements li");
            listItem.appendChild(watchlistListItem);
        });
    };
};

function removeItemFromWatchlist(itemText, watchlistListItem) {
    watchlistListItem.remove();

    var watchlist = localStorage.getItem("watchlist");
    if (watchlist) {
        var watchlistArray = JSON.parse(watchlist);
        var index = watchlistArray.indexOf(itemText);
        if (index !== -1) {
            watchlistArray.splice(index, 1);
            localStorage.setItem("watchlist", JSON.stringify(watchlistArray));
        }
    }
};

/////////////////////////////////////////////////

const YouTubeAPIKey = "AIzaSyDXbp7YPyb65jrrSvvqv53H8-q1W3V9dJ8";

//Searches for the Video Title in de google API
function searchVideo(element) {
  const searchQuery = element.textContent + " trailer"; //Defines itself depending on the text inside the <li> element onclick.
  const url = `https://www.googleapis.com/youtube/v3/search?key=${YouTubeAPIKey}&q=${searchQuery}&part=snippet&type=video&maxResults=1`;

  fetch(url)
    .then((response) => response.json()) //extracts the Json data from the response received form the API.
    .then((data) => {
      if (data.items && data.items.length > 0) {
        const videoId = data.items[0].id.videoId; //Extract the Id of the youtube video with the title of the searchQuery.
        const videoUrl = `https://www.youtube.com/watch?v=${videoId}`; //Defines the url of the FIRST video found in the search result.
        window.open(videoUrl); //Opens the link in a new browser window.
      } else {
        console.log ("No trailer found."); 
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      console.log ("An error occurred while searching for the video."); 
    });
}

// <li onclick="searchVideo(this)">Gladiator</li> <!--Ejemplo de un elemento the watchlist-->

///////////////////////////////////////////////////////////////////////////////////

// Function para que los icons de HOME PAGE se pongan en HIGHLIGHT al ser seleccionados

function categorySelection(selectedElement) {
  document.querySelectorAll(".category-icons").forEach((image) => {
    image.classList.remove("category-selected");
    image.classList.add("category-unselected");
  });

  selectedElement.classList.remove("category-unselected");
  selectedElement.classList.add("category-selected");
}

function typeSelection(selectedElement) {
  document.querySelectorAll(".type-icons").forEach((image) => {
    image.classList.remove("type-selected");
    image.classList.add("type-unselected");
  });

  selectedElement.classList.remove("type-unselected");
  selectedElement.classList.add("type-selected");
}

////////////////////Higher or lower and Score Counter

function Scorestorage (scores) {
let finalScore = JSON.parse(localStorage.getItem("final-score")) || [];
finalScore.push(scores);

localStorage.setItem("final-score", JSON.stringify(finalScore))
}
function showscores() {
  let finalScore = JSON.parse(localStorage.getItem("final-score")) || [];
  let scoreElement = document.getElementById("session-scores-list");
  scoreElement.innerHTML = "";

  finalScore.forEach (scores => {
    let scorelist = document.createElement ("h4");
    scorelist.textContent = `${score}`;
  
    scoreElement.appendChild (scorelist);
  }) 
}

//document.addEventListener("DOMContentLoaded", function () {
  // Show the maximum score saved in local storage when loading the last page
  //const topScore = localStorage.getItem('top-score') || 0;
  //document.getElementById('top-score').textContent = topScore;
//});

let moviesUpdated = false;
let score = 0; // Starts at 0 at the beginning of the game
let topScore = localStorage.getItem('top-score') || 0;

function compareRatings(isHigher) {
  if (moviesUpdated) {
    return;
  }

  const leftRatingElement = document.getElementById('rating-boxoffice-left');
  const rightRatingElement = document.getElementById('rating-boxoffice-right');
  const leftRating = parseFloat(leftRatingElement.textContent);
  const rightRating = parseFloat(rightRatingElement.textContent);
  const correctGuess = isHigher ? rightRating > leftRating : rightRating < leftRating;

  document.getElementById('game-buttons').classList.add('hidden');
  const movieContainerRight = document.getElementById('movie-container-right');
  movieContainerRight.classList.remove('bg-green-500', 'bg-red-500');

  if (correctGuess) {
    movieContainerRight.classList.add('bg-green-500');
    score += 10; // Increase the score by 10 if the answer is correct
    document.getElementById('score-counter').textContent = score; // Update the score on the interface

    // Check if a new top score has been reached
    if (score > topScore) {
      topScore = score;
      localStorage.setItem('top-score', topScore);
      document.getElementById('top-score').textContent = topScore; // Update the top score on the interface
    }

    setTimeout(() => {
      movieContainerRight.classList.remove('bg-green-500');
      updateTwoMovieDetails();
      moviesUpdated = false;
    }, 1500);
    moviesUpdated = true;
  } else {
    movieContainerRight.classList.add('bg-red-500');
    updateTwoMovieDetails();
    setTimeout(() => {
      showWatchlistPage();
    }, 1500);
  }

  leftRatingElement.style.display = 'block';
  rightRatingElement.style.display = 'block';
  leftRatingElement.textContent = leftRating;
  rightRatingElement.textContent = rightRating;

  setTimeout(() => {
    document.getElementById('game-buttons').classList.remove('hidden');
    movieContainerRight.classList.remove('bg-green-500', 'bg-red-500');
    leftRatingElement.textContent = leftRating;
    rightRatingElement.textContent = rightRating;
  }, 500);

  if (correctGuess) {
    const rightMovieImdbRating = parseFloat(document.getElementById('rating-boxoffice-right').textContent);
    document.getElementById('rating-boxoffice-right').textContent = rightMovieImdbRating;
  }
}

function showWatchlistPage() {
  document.getElementById('game-page').classList.add('hidden');
  document.getElementById('watchlist-page').classList.remove('hidden');
  localStorage.setItem('final-score', score);
  score = 0; // Reset the score when showing the page
  document.getElementById('score-counter').textContent = score; // Update score on the interface
showscores ();
}



document.getElementById('higher-button').addEventListener('click', () => compareRatings(true));
document.getElementById('lower-button').addEventListener('click', () => compareRatings(false));

function showWatchlistPage() {
  document.getElementById('game-page').classList.add('hidden');
  document.getElementById('watchlist-page').classList.remove('hidden');
  // Encuentra o crea el elemento para mostrar el puntaje
  let scoreElement = document.getElementById('session-scores-list');
  let scoreContent = document.getElementById('score-content');
  if (!scoreContent) {
    // Si no existe, lo creamos
    scoreContent = document.createElement('h4');
    scoreContent.id = 'score-content'; // Asignamos el ID
    scoreElement.appendChild(scoreContent);
  }
  // Actualiza el puntaje y el estilo del texto
  scoreContent.textContent = `Score: ${score}`; // Actualiza el texto con el último puntaje
  scoreContent.style.color = 'white'; // Asegura que el texto sea blanco
  // Guarda el puntaje final en localStorage y lo resetea
  localStorage.setItem('final-score', score);
  score = 0; // Resetea el score para el próximo juego
  document.getElementById('score-counter').textContent = score; // Actualiza el score en la interfaz
}