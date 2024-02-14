## Introduction
For this project we decided to create a fun and replayable game that will allow the user to guess which movie has a higher or lower rating AND be able to add movie titles to a watchlist that will allow them to see that movie's trailer with just one click. To achieve this, we, as a team, needed to create a dynamic page with appealing styling. This was achieved using a CSS style sheet and Tailwind CSS. To be able to compare two different movies, we used OMDb API to retrieve information about random movies, it's poster, title and IMDb Rating. With these values we were able to achieve all the logical operations in order to code the body of the game. Finally, for the watchlist, we used the movie title that was already retrieved from the OMDb API and used the YouTube API to automatically find that movie's trailer and open a new window in the browser.


## User Story

```
AS A movie enthusiast
I WANT TO play a game where I will guess a movie’s rating and create a watchlist
SO THAT I can test my movie knowledge and organize the next films I will see
```

## Acceptance Criteria

```
GIVEN a movie comparing game
WHEN I open the app
THEN I am presented with the instructions and a button to start the game
WHEN I start the game
THEN two different movies should start loading and only one should show me it's rating
WHEN I select the higher or lower button
THEN I am presented with feedback showing if my answer was correct or wrong
WHEN I guess the correct answer
THEN I should be prompted with two new movies and score 1 point
WHEN I click on the "Add to Watchlist" button and lose a game
THEN I am shown to the watchlist page and all the movies I added to my wacthlist should appear in a list format
ALSO I should see a table with my last score and past scores
WHEN I click on any of the movie titles in my watchlist
THEN I will be redirected to that movie's trailer in a new window
```

## Visual Web Application

![The Movie Rating Game app includes a page where two movies will be shown and the game will be played, a watchlist that will redirect you to a trailer in YouTube and a scoreboard.]()

## Link to app and repo

Repo link: https://github.com/EmilioColds/movie-rating-game

Web page link: https://emiliocolds.github.io/movie-rating-game/