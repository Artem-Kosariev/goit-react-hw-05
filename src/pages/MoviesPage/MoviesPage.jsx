import { useEffect, useState } from 'react';
import MovieList from '../../components/MovieList/MovieList';
import SearchForm from '../../components/SearchForm/SearchForm';
import css from './MoviesPage.module.css';
import { fetchSearchMovie } from '../../movies-api';
import Loader from '../../components/Loader/Loader';
import { useSearchParams } from 'react-router-dom';

const Error = ({ errorType }) => {
  return <p className={css.error}>Error: {errorType}</p>;
};


const MoviesPage = () => {
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const text = searchParams.get('text');

  useEffect(() => {
    if (!text) {
      setMovies([]); 
      return;
    }

    const getSearchMovies = async () => {
      setLoading(true);
      setError(null); 
      try {
        const { results } = await fetchSearchMovie(text);
        setMovies(results);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setError("Failed to load movies. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    getSearchMovies();
  }, [text]);

  const searchMovie = (textInput) => {
    setSearchParams({ text: textInput });
  };

  return (
    <div className={css.page}>
      <SearchForm submit={searchMovie} />
      {loading && <Loader />}
      {error && <Error errorType={error} />}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
};

export default MoviesPage;
