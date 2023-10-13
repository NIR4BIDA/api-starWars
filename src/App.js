import React,{useState,useEffect,useCallback} from 'react';
import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies,setMovies]=useState([]);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState(null);
  const fetchMoviesHandler=useCallback(async ()=>
  {
    setError(null);
    setLoading(true);
    try{
    const response= await fetch('https://swapi.dev/api/films/');
    if(!response.ok){
      throw new Error('something weng wrong');
    }
    const data= await response.json();
    const fetchMovies= data.results.map( 
        (movie)=>
        {
          return ( 
          {
          id:movie.episode_id,
          title:movie.title,
          openingText:movie.opening_crawl,
          releaseDate:movie.release_date,
          }
          );
        }
      );
      setMovies(fetchMovies);
    }catch(error){
      setError(error.message);
    }
      setLoading(false);
  },[]);
  useEffect(()=>{
    fetchMoviesHandler();
  },[fetchMoviesHandler]);
  let content=<p>'Found no movies.'</p>;
  if(movies.length>0){
    content=<MoviesList movies={movies} />;
  }
  if(error){
    content=<p>{error}</p>;
  }
  if(loading){
    content=<p>'loading...'</p>;
  }
  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}


export default App;
