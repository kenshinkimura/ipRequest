import React, { useState, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {



const [movies, setMovies] = useState([]);
const [isLoading, setIsLoading] = useState(false)
const [error, setError] = useState(null)

const  fetchDataHandler = useCallback(async() => {


  setError(null);
  try{
const response = await fetch('https://swapi.dev/api/films/');

if(!response.ok) {
  throw new Error ('Something gets wrong ' + response.status)
}

const data = await response.json();

const dataMovies = data.results.map((data) => {
  return {id: data.episode_id,
            title: data.title,
            releaseDate: data.release_date,
            openingText: data.opening_crawl,}
})
    setIsLoading(false);
    setMovies(dataMovies);

  }catch(err) {
setError(err.message)
  }

 },[])

 useEffect(() => {
  fetchDataHandler();
},[fetchDataHandler])


// function fetchDataHandler  ()  {

//   setIsLoading(true);

//   fetch('https://swapi.dev/api/films/').then((response) => {
//       return response.json();
//   }).then((data) => {
//     const dataMovies = data.results.map((data) => {
//       return {
//         id: data.episode_id,
//           title: data.title,
//           releaseDate: data.release_date,
//           openingText: data.opening_crawl,
//       }     
//     })
//     setIsLoading(false);
//     setMovies(dataMovies);
//   })
// }

  
let content = <p>Find no movies</p>

if(movies.length > 0){
content = <MoviesList movies={movies} />
}

if(error) {
  content = <p>{error}</p>
}

if(isLoading) {
 content = <p>Loading...</p>
}

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchDataHandler}>Fetch Movies</button>
      </section>
      <section>
  {content}
      </section>
    </React.Fragment>
  );
}

export default App;


