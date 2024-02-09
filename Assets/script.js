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
    var pastSelection = document.querySelector('.category-selected');
    if (pastSelection) {
        pastSelection.classList.remove('category-selected');
    }

    selectedElement.classList.add('category-selected');
}

function typeSelection(selectedElement) {
    var pastSelection = document.querySelector('.type-selected');
    if (pastSelection) {
        pastSelection.classList.remove('type-selected');
    }

    selectedElement.classList.add('type-selected');
}

