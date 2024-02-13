async function getAllMovieTitlesLeft() {
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
  
  async function fetchMovieDetailsLeft(title) {
    //   
    const apiUrl = `https://www.omdbapi.com/?apikey=ea016259&t=${encodeURIComponent(
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
  
  // Función para verificar si la película tiene los detalles necesarios
  // si estan las dos condiciones tarda más, no hay tantas movies con BO
  function hasRequiredDetailsLeft(movie) {
    return (
      movie.imdbRating &&
      movie.imdbRating !== "N/A"
    );
  }
  
  // Función principal para obtener una película con la info solicitada
  async function getValidMovieWithDetailsLeft() {
    const movieTitles = await getAllMovieTitlesLeft();
    let attempts = 0;
    while (attempts < movieTitles.length) {
      const randomIndex = Math.floor(Math.random() * movieTitles.length);
      const title = movieTitles[randomIndex];
      console.log(`Trying: ${title}`);
      const movieDetails = await fetchMovieDetailsLeft(title);
  
      if (
        movieDetails &&
        movieDetails.Response === "True" &&
        hasRequiredDetailsLeft(movieDetails)
      ) {
        console.log(
          "Movie found:",
          movieDetails
        );
        
        return movieDetails; // este es el argumento movie de la linea 75, then(movie) 
      } else {
        console.log(`Not enough details for: ${title}, trying a new movie (attempt: ${attempts})...`);
      }
      attempts++;
    }
    throw new Error(
      "No valid film with sufficient detail was found after several attempts."
    );
  }
  
  // Ejemplo de uso
  getValidMovieWithDetailsLeft()
    .then((movie) => {
      console.log(movie);
      // Aquí puede actualizar el DOM con los detalles de la movie found
      updateMovieDetailsLeft(movie);
      return getValidMovieWithDetailsLeft();
    })
    .catch((error) => {
      console.error(error);
    });

    function updateMovieDetailsLeft(movie) {
        var posterLeftEl = document.getElementById(`poster-left`);
        var movieTitleLeftEl = document.getElementById(`movie-title-left`);
        var ratingBoxofficeLeftEl = document.getElementById(`rating-boxoffice-left`);
        var gameTypeEl = document.getElementById('game-type');

        posterLeftEl.setAttribute('src', movie.Poster);
        movieTitleLeftEl.textContent = movie.Title;
        ratingBoxofficeLeftEl.textContent = movie.imdbRating;
        gameTypeEl.textContent = 'IMDb Rating';
    };

    async function getAllMovieTitlesLeft() {
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
  
  async function fetchMovieDetailsLeft(title) {
    //   
    const apiUrl = `https://www.omdbapi.com/?apikey=ea016259&t=${encodeURIComponent(
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
  
  // Función para verificar si la película tiene los detalles necesarios
  // si estan las dos condiciones tarda más, no hay tantas movies con BO
  function hasRequiredDetailsLeft(movie) {
    return (
      movie.imdbRating &&
      movie.imdbRating !== "N/A"
    );
  }
  
  // Función principal para obtener una película con la info solicitada
  async function getValidMovieWithDetailsLeft() {
    const movieTitles = await getAllMovieTitlesLeft();
    let attempts = 0;
    while (attempts < movieTitles.length) {
      const randomIndex = Math.floor(Math.random() * movieTitles.length);
      const title = movieTitles[randomIndex];
      console.log(`Trying: ${title}`);
      const movieDetails = await fetchMovieDetailsLeft(title);
  
      if (
        movieDetails &&
        movieDetails.Response === "True" &&
        hasRequiredDetailsLeft(movieDetails)
      ) {
        console.log(
          "Movie found:",
          movieDetails
        );
        
        return movieDetails; // este es el argumento movie de la linea 75, then(movie) 
      } else {
        console.log(`Not enough details for: ${title}, trying a new movie (attempt: ${attempts})...`);
      }
      attempts++;
    }
    throw new Error(
      "No valid film with sufficient detail was found after several attempts."
    );
  }
  
  // Ejemplo de uso
  getValidMovieWithDetailsLeft()
    .then((movie) => {
      console.log(movie);
      // Aquí puede actualizar el DOM con los detalles de la movie found
      updateMovieDetailsLeft(movie);
      return getValidMovieWithDetailsLeft();
    })
    .catch((error) => {
      console.error(error);
    });

    function updateMovieDetailsLeft(movie) {
        var posterLeftEl = document.getElementById(`poster-left`);
        var movieTitleLeftEl = document.getElementById(`movie-title-left`);
        var ratingBoxofficeLeftEl = document.getElementById(`rating-boxoffice-left`);
        var gameTypeEl = document.getElementById('game-type');

        posterLeftEl.setAttribute('src', movie.Poster);
        movieTitleLeftEl.textContent = movie.Title;
        ratingBoxofficeLeftEl.textContent = movie.imdbRating;
        gameTypeEl.textContent = 'IMDb Rating';
    };

    //////////

    // Logic for second section (RIGHT CARD IN GAME PAGE)

    async function getAllMovieTitlesRight() {
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
      
      async function fetchMovieDetailsRight(title) {
        //   
        const apiUrl = `https://www.omdbapi.com/?apikey=ea016259&t=${encodeURIComponent(
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
      
      // Función para verificar si la película tiene los detalles necesarios
      // si estan las dos condiciones tarda más, no hay tantas movies con BO
      function hasRequiredDetailsRight(movie) {
        return (
          movie.imdbRating &&
          movie.imdbRating !== "N/A"
        );
      }
      
      // Función principal para obtener una película con la info solicitada
      async function getValidMovieWithDetailsRight() {
        const movieTitles = await getAllMovieTitlesRight();
        let attempts = 0;
        while (attempts < movieTitles.length) {
          const randomIndex = Math.floor(Math.random() * movieTitles.length);
          const title = movieTitles[randomIndex];
          console.log(`Trying: ${title}`);
          const movieDetails = await fetchMovieDetailsRight(title);
      
          if (
            movieDetails &&
            movieDetails.Response === "True" &&
            hasRequiredDetailsRight(movieDetails)
          ) {
            console.log(
              "Movie found:",
              movieDetails
            );
            
            return movieDetails; // este es el argumento movie de la linea 75, then(movie) 
          } else {
            console.log(`Not enough details for: ${title}, trying a new movie (attempt: ${attempts})...`);
          }
          attempts++;
        }
        throw new Error(
          "No valid film with sufficient detail was found after several attempts."
        );
      }
      
      // Ejemplo de uso
      getValidMovieWithDetailsRight()
        .then((movie) => {
          console.log(movie);
          // Aquí puede actualizar el DOM con los detalles de la movie found
          updateMovieDetailsRight(movie);
          return getValidMovieWithDetailsRight();
        })
        .catch((error) => {
          console.error(error);
        });
    
        function updateMovieDetailsRight(movie) {
            var posterRightEl = document.getElementById(`poster-right`);
            var movieTitleRightEl = document.getElementById(`movie-title-right`);
            var ratingBoxofficeRightEl = document.getElementById(`rating-boxoffice-right`);
            var gameTypeEl = document.getElementById('game-type-right');
    
            posterRightEl.setAttribute('src', movie.Poster);
            movieTitleRightEl.textContent = movie.Title;
            ratingBoxofficeRightEl.textContent = movie.imdbRating;
            gameTypeEl.textContent = 'IMDb Rating';
        };