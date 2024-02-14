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
  });

  