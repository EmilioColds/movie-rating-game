let foundMovies = 0;
let selectedMovies = [];

async function getAllMovieTitles() {
  try {
    const response = await fetch("movieTitles.json");
    if (!response.ok) {
      throw new Error("Error fetching movies.json");
    }
    const movieTitles = await response.json();
    return movieTitles;
  } catch (error) {
    console.error("error fetching movies:", error);
  }
}

async function fetchMovieDetails(title) {
  const apiUrl = `https://www.omdbapi.com/?apikey=309ccb54&t=${encodeURIComponent(
    title
  )}`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Error fetching movie details");
    }
    const movieDetails = await response.json();
    return movieDetails;
  } catch (error) {
    console.error("Error fetching movie details:", error);
  }
}

function hasRequiredDetails(movie) {
  return movie.imdbRating && movie.imdbRating !== "N/A";
}

async function updateTwoMovieDetails() {
  var movieTitles = await getAllMovieTitles();

  let foundMovies = 0;
  let attempts = 0;

  while (foundMovies < 2 && attempts < movieTitles.length) {
    var randomIndex = Math.floor(Math.random() * movieTitles.length);
    var title = movieTitles[randomIndex];

    if (!selectedMovies.includes(title)) {
      console.log(`Trying: ${title}`);
      var movieDetails = await fetchMovieDetails(title);

      if (
        movieDetails &&
        movieDetails.Response === "True" &&
        hasRequiredDetails(movieDetails)
      ) {
        console.log("Movie found:", movieDetails);
        var side = foundMovies === 0 ? "left" : "right";
        updateMovieDetails(side, movieDetails);

        selectedMovies.push(title);
        foundMovies++;
      } else {
        console.log(
          `Not enough details for: ${title}, trying a new movie (attempt: ${attempts})...`
        );
      }
    }
    attempts++;
  }
  if (foundMovies < 2) {
    throw new Error(
      "No valid films with sufficient detail were found after several attempts."
    );
  }
}

function updateMovieDetails(side, movie) {
  var posterUrl =
    movie.Poster !== "N/A" && movie.Poster
      ? movie.Poster
      : "./Assets/Images/MoviePosterExamples/Poster-Not-Available.jpeg";

  document.getElementById(`poster-${side}`).setAttribute("src", posterUrl);
  document.getElementById(`movie-title-${side}`).textContent = movie.Title;
  document.getElementById(`rating-boxoffice-${side}`).textContent =
    movie.imdbRating;
  document.getElementById(`game-type-${side}`).textContent = "IMDb Rating";
}

updateTwoMovieDetails()
  .then(() => {
    console.log("Movies updated.");
  })
  .catch((error) => {
    console.log("Failed to update.", error);
    if (side === "left") {
      currentMovieRating = parseFloat(movieDetails.imdbRating);
    } else {
      nextMovieRating = parseFloat(movieDetails.imdbRating);
    }
  });
///////////////////////////////////////////////////////7

// RATINGS // 

let moviesUpdated = false;

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
}

document.getElementById('higher-button').addEventListener('click', () => compareRatings(true));
document.getElementById('lower-button').addEventListener('click', () => compareRatings(false));



///////////////////////////////////////////////////////////////////////////////

// Función para mostrar la pantalla de watchlist
function showWatchlistPage() {
  // Aquí ocultarías la sección del juego y mostrarías la de watchlist
  document.getElementById('game-page').classList.add('hidden');
  document.getElementById('watchlist-page').classList.remove('hidden');
}

// Agregar eventos de clic a los botones "Higher" y "Lower"
document.getElementById('higher-button').addEventListener('click', function () {
  compareRatings(true);
});

document.getElementById('lower-button').addEventListener('click', function () {
  compareRatings(false);
});

window.onload = function () {
  loadWatchlist();
};
document.getElementById("watchlist-button-left").addEventListener("click", function () {
  var movieNameLeft = document.getElementById("movie-title-left").innerText;
  var watchlistListItem = document.createElement('h4');
  watchlistListItem.textContent = movieNameLeft;
  watchlistListItem.setAttribute('onclick', 'searchVideo(this)');
  var listItem = document.querySelector("#watchlist-elements li");
  listItem.appendChild(watchlistListItem);
  saveWatchlist();
});
document.getElementById("watchlist-button-right").addEventListener("click", function () {
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
  watchlistListItems.forEach(function (item) {
    watchlistArray.push(item.textContent);
  });
  localStorage.setItem("watchlist", JSON.stringify(watchlistArray));
};
//Loads watchlist from local storage.
function loadWatchlist() {
  var watchlist = localStorage.getItem("watchlist");
  if (watchlist) {
    var watchlistArray = JSON.parse(watchlist);
    watchlistArray.forEach(function (itemText) {
      var watchlistListItem = document.createElement("h4");
      watchlistListItem.textContent = itemText;
      watchlistListItem.setAttribute('onclick', 'searchVideo(this)');
      var listItem = document.querySelector("#watchlist-elements li");
      listItem.appendChild(watchlistListItem);
    });
  };
};