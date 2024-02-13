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



/////////////////////////TOP SCORES///////////////////////////////////////////////////////////

let currentCategory = '';  //Categoria actual en la que el usuario esrá jugando

function increaseScore() {
    scoreCounter++;
    updateScoreDisplay();     //Incrementa la puntuación cada vez que el usuario responde correctamente
  }

  function updateScoreDisplay() {
    const scoreDisplay = document.getElementById('score-counter');
    if (scoreDisplay) {
      scoreDisplay.textContent = scoreCounter;          //Actualiza la visualización de la puntuación
    }
  }
  
  function handleCorrectAnswer() {
    increaseScore();                     //Logica para cuando se muestra una respuesta correcta
  }


  function initializeGame(category) {
    scoreCounter = 0;
    currentCategory = category;
    updateScoreDisplay();                 //Restablece la puntuación del juego
  }
  

  //Función para guardar la puntuación final en el Local Storage
  function saveFinalScore() {
    if (currentCategory) {
      const categoryScores = JSON.parse(localStorage.getItem('categoryScores')) || {};
      categoryScores[currentCategory] = scoreCounter;
      localStorage.setItem('categoryScores', JSON.stringify(categoryScores));
    }
  }


  //Función para mostrar los scores de la categoría
  function showCategoryScores() {
    const categoryScoresElement = document.getElementById('category-scores');
    if (categoryScoresElement && currentCategory) {
      const categoryScores = JSON.parse(localStorage.getItem('categoryScores')) || {};
      const currentScore = categoryScores[currentCategory];
      categoryScoresElement.textContent = `Your score in ${currentCategory}: ${currentScore || 0}`;
    }
  }
   
  window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    initializeGame(categoryParam);
  };

  
//////////////////////////////////ScoreCounter///////////////////////////////////////////////////////

// Variable para almacenar el contador de puntuación SIEMPRE INICIA EN 0
let scoreCounter = 0;

// Función para incrementar la puntuación, SE INCREMENTA LA PUNTUACION EN 1 POR 1 
function increaseScore() {
  scoreCounter++;
  updateScoreDisplay();
}

// Función para actualizar la visualización de la puntuación
function updateScoreDisplay() {
  const scoreDisplay = document.getElementById('score-counter');
  if (scoreDisplay) {
    scoreDisplay.textContent = scoreCounter;
  }
}

// Función para manejar la lógica cuando se muestra una respuesta correcta
function handleCorrectAnswer() {
  // Lógica para cuando la respuesta es correcta
  increaseScore();
  // DUDA Aquí habría que poner algo si la respuesta es incorrecta?????
}

function initializeGame() {
  // Restablecer la puntuación al inicio del juego y empezar la puntuacuón en 0 
  scoreCounter = 0;
  updateScoreDisplay();

}

// Evento clic para el botón "HIGHER"
document.getElementById('higher-button').addEventListener('click', function () {
  // Lógica para verificar si la respuesta es correcta y actualizar la puntuación
  handleCorrectAnswer();
});

// Evento clic para el botón "LOWER"
document.getElementById('lower-button').addEventListener('click', function () {
  // Lógica para verificar si la respuesta es correcta y actualizar la puntuación
  handleCorrectAnswer();
});

// Evento para el botón "Play Again"
document.getElementById('play-again-button').addEventListener('click', function () {
  // Lógica para reiniciar el juego
  initializeGame();
});

// Llama a la función de iniciar el juego al cargar la página
window.onload = initializeGame;

// Guarda la puntuación final en el Local Storage
function saveFinalScore() {
    localStorage.setItem('finalScore', scoreCounter.toString());
  }
  


  //Start Button/////////////////////////////////////////////////////////////////////////////////////////////

document.addEventListener('DOMContentLoaded', function () {
  // Referencia al botón de inicio del juego
  const startButton = document.getElementById('start-button');

  // Referencia a las secciones de la página
  const homePage = document.getElementById('home-page');
  const gamePage = document.getElementById('game-page');

  // Evento de click al botón de inicio del juego
  startButton.addEventListener('click', function () {
      // Oculta la página de inicio
      homePage.classList.add('hidden');

      // Muestra la página de juego
      gamePage.classList.remove('hidden');
  });
});


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