import { Link, useLocation } from "react-router-dom";
import css from './MovieList.module.css';

const defaultImg = "https://img.icons8.com/?size=100&id=hKfRfqpe39Qf&format=png&color=000000"; 

export default function MovieList({ movies }) {
    const location = useLocation();
    
  if (!Array.isArray(movies)) {
        return <p>Error: Movies data is not available.</p>;
    }

    if (movies.length === 0) {
        return <p>No movies available.</p>;
    }
    
    console.log(movies); 
    
    return (
        <ul className={css.movieList}>
            {movies.map(movie => {
                console.log(movie); 
                return (
                    <li key={movie.id} className={css.movie}>
                        <Link to={`/movies/${movie.id}`} state={{ from: location }}>
                            <img
                                src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : defaultImg}
                                alt={typeof movie.title === 'string' ? movie.title : "Movie poster"}
                                className={css.moviePoster} 
                            />
                            <p className={css.movieTitle}>
                                {typeof movie.title === 'string' ? movie.title : "Untitled Movie"}
                            </p>
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
}
