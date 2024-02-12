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
