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

  
