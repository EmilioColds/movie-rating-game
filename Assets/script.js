////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//YOUTUBE API TRAILER LOGIC

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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 

const moviesAPIKey = "722da20b";
 var movieTitleOne = "The Matrix";
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
    const apiKey = '722da20b';
    const apiUrl = `http://www.omdbapi.com/?s=movie&apikey=` + apiKey; // Example API URL to search for movies in general.

    let allMovieTitles = [];
    let page = 1;

    try {
        while (true) {
            const response = await fetch(apiUrl + "&page=" + page);
            const data = await response.json();

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
    const moviesAPIKey = "722da20b";
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