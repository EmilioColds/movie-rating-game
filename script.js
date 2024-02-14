// START GAME BUTTON//

document.addEventListener("DOMContentLoaded", function () {
  const startGameButton = document.getElementById("start-button");
  const categoryIcons = document.querySelectorAll(".category-icons");
  const typeIcons = document.querySelectorAll(".type-icons");
  let categorySelected = false;
  let gameTypeSelected = false;

  function handleSelection(event) {
    if (event.target.closest(".category-icons")) {
      categorySelected = true;
    } else if (event.target.closest(".type-icons")) {
      gameTypeSelected = true;
    }

    startGameButton.disabled = !(categorySelected && gameTypeSelected);
  }

  categoryIcons.forEach((icon) =>
    icon.addEventListener("click", handleSelection)
  );
  typeIcons.forEach((icon) => icon.addEventListener("click", handleSelection));

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
    document.getElementById("highscores-page").classList.remove("hidden");
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

// WATCHLIST

document.addEventListener("DOMContentLoaded", function () {
  var watchlistButtonLeft = document.getElementById("watchlist-button-left");
  var watchlistButtonRight = document.getElementById("watchlist-button-right");

  function addToWatchlist(movieTitle) {
    var li = document.createElement("li");
    li.textContent = movieTitle;
    li.classList.add("p-2");
    document.getElementById("watchlist-elements").appendChild(li);
  }

  watchlistButtonLeft.addEventListener("click", function () {
    var movieTitleLeft =
      document.getElementById("movie-title-left").textContent;
    addToWatchlist(movieTitleLeft);
  });

  watchlistButtonRight.addEventListener("click", function () {
    var movieTitleRight =
      document.getElementById("movie-title-right").textContent;
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
    .then((response) => response.json()) //extracts the Json data from the response received form the API.
    .then((data) => {
      if (data.items && data.items.length > 0) {
        const videoId = data.items[0].id.videoId; //Extract the Id of the youtube video with the title of the searchQuery.
        const videoUrl = `https://www.youtube.com/watch?v=${videoId}`; //Defines the url of the FIRST video found in the search result.
        window.open(videoUrl); //Opens the link in a new browser window.
      } else {
        alert("No trailer found."); //CAMBIAR A ALGO FISICO GENERADO EN EL HTML!!!
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred while searching for the video."); //CAMBIAR A ALGO FISICO GENERADO EN EL HTML!!!
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

//////////////////////////////////////SCORE COUNTER/////////////////////////////////////


const scoreCounterElement = document.getElementById('score-counter'); // Contador de puntuación

let score = 0; // Inicializa la puntuación en 0

function updateScoreCounter() {
    scoreCounterElement.textContent = score; // Función para actualizar y mostrar la puntuación en el contador
}

function handleCorrectAnswer() { 
    score += 1;                // Función para manejar la lógica cuando se selecciona una respuesta correcta // Incrementa la puntuación por cada respuesta correcta 1 por 1
 
    updateScoreCounter();  // Actualiza y muestra la puntuación

    localStorage.setItem('userScore', score); // Guarda la puntuación en el localStorage
}

function getStoredScore() {  // Función para obtener la puntuación almacenada en localStorage
    return parseInt(localStorage.getItem('userScore')) || 0;
}

function showFinalScore() {  // Función para mostrar la puntuación final en la última página
    const finalScoreElements = document.querySelectorAll('.final-score'); 

    finalScoreElements.forEach((element) => {
        element.textContent = getStoredScore();   //Establece la puntuación final
  });
}
showFinalScore(); // Al cargar la última página se muestra la puntuación final



///////////////////////////////////////////////TOP SCORES/////////////////////////////////

document.addEventListener('DOMContentLoaded', function () {
    // Se espera a que el contenido del DOM esté cargado

    const scoreCounterElement = document.getElementById('score-counter');
    const categoryIcons = document.querySelectorAll('.category-icons');
    let categorySelected = false;
    let gameTypeSelected = false;

    // Función para manejar la selección de categoría y tipo de juego
    function handleSelection(event) {
        if (event.target.closest('.category-icons')) {
            categorySelected = true;
        } else if (event.target.closest('.type-icons')) {
            gameTypeSelected = true;
        }

        // Deshabilita el botón de inicio 
        startGameButton.disabled = !(categorySelected && gameTypeSelected);
    }

    // Agrega el evento de clic para cada icono de categoría
    categoryIcons.forEach(icon => icon.addEventListener('click', handleSelection));

    // Agrega el evento de clic para el botón de inicio del juego
    startGameButton.addEventListener('click', function () {
        // Obtiene la categoría seleccionada y la almacena en localStorage
        const selectedCategory = document.querySelector('.category-selected').getAttribute('data-category');
        localStorage.setItem('currentCategory', selectedCategory);
        
        // Oculta la página de inicio y muestra la página del juego
        document.getElementById('home-page').classList.add('hidden');
        document.getElementById('game-page').classList.remove('hidden');
    });

    // Función para manejar la respuesta correcta
    function handleCorrectAnswer() {
        // Incrementa la puntuación y actualiza el contador
        score += 1;
        updateScoreCounter();

        // Almacena la puntuación en localStorage para la categoría actual
        localStorage.setItem(`userScore_${localStorage.getItem('currentCategory')}`, score);
    }

    // Función para mostrar la puntuación final en la última página
    function showFinalScore() {
        const finalScoreElements = document.querySelectorAll('.final-score');
        const currentCategory = localStorage.getItem('currentCategory');
        const storedScore = getStoredScore(currentCategory);

        // Actualiza los elementos de la página final con la puntuación almacenada
        finalScoreElements.forEach((element) => {
            element.textContent = storedScore;
        });
    }

    // Función para obtener la puntuación almacenada en localStorage para cada categoría
    function getStoredScore(category) {
        return parseInt(localStorage.getItem(`userScore_${category}`)) || 0;
    }

    // Muestra la puntuación final al cargar la ultima página
    showFinalScore();
});