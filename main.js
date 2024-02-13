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
  function hasRequiredDetails(movie) {
    return (
      movie.imdbRating &&
      movie.imdbRating !== "N/A"
    );
  }
  
  // Función principal para obtener una película con la info solicitada
  async function getValidMovieWithDetails() {
    const movieTitles = await getAllMovieTitles();
    let attempts = 0;
    while (attempts < movieTitles.length) {
      const randomIndex = Math.floor(Math.random() * movieTitles.length);
      const title = movieTitles[randomIndex];
      console.log(`Trying: ${title}`);
      const movieDetails = await fetchMovieDetails(title);
  
      if (
        movieDetails &&
        movieDetails.Response === "True" &&
        hasRequiredDetails(movieDetails)
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
  getValidMovieWithDetails()
    .then((movie) => {
      console.log(movie);
      // Aquí puede actualizar el DOM con los detalles de la movie found
    })
    .catch((error) => {
      console.error(error);
    });