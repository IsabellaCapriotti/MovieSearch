import React, {useState} from 'react';

export default function SearchMovies(){

    //Returns array containing state and function to update the state
    const [query, setQuery] = useState(""); 
    const [movies, setMovies] = useState([]);

    const searchMovies = async (event) =>{
        event.preventDefault();  
        
        try{
            //Check for empty query 
            if(query === ""){
                setMovies([]);
            }

            else{
                //API request
                const url = `https://api.themoviedb.org/3/search/movie?api_key=ae56a9641e23b5c218dc69a46d5c0c41&language=en-US&query=${query}&page=1&include_adult=false`;

                //Get raw data back from API
                const res = await fetch(url);

                //Convert that data into JSON format
                const data = await res.json(); 
                
                console.log(data.results);

                //Update movies state 
                setMovies(data.results);
            }

        }
        catch(error){
            console.log(error); 
        }
        
    }

    return (
        <>

        {/* Search Form */}
        <form className="form" onSubmit={searchMovies}>
            <label className="label" htmlFor="query">Enter movie: </label>
            <input className="input" type="text" name="query" placeholder="Ex: Birds of Prey"
            value={query} onChange={(event) => setQuery(event.target.value)}/>
            <button className="button" type="submit">Search</button>
        </form>

        {/* List of Movies */}
        <MovieCards movies={movies}/>
            
        </>
    );
}


function MovieCards(props){

    // Return list of movies
      return(
        
        <div className="card-list">
           
        {props.movies.filter(movie => movie.poster_path).map( movie => (
            <div key={movie.id} className="card">

                {/* Movie Image */}
                <img className="card-image" src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`}
                alt={movie.title + " poster"}/>
            
                 {/* Movie Info */}
                <div className="card-content">
                    <h3 className="card-title">{movie.title}</h3>
                    
                    {movie.release_date === "" ? " ": <p><small>Release Date: {movie.release_date}</small></p>}
                    <p><small>Rating: {movie.vote_average}</small></p>

                    <p className="card-desc">{movie.overview}</p>
                </div>
            </div>

           
        ))};

        
    </div>
      );
}