import { useEffect, useState } from 'react';
import MovieList from '../../components/MovieList/MovieList';
import css from './HomePage.module.css';
import { fetchTrendMovies } from '../../movies-api';
import Loader from '../../components/Loader/Loader';

const Error = ({ errorType }) => {
  return <p className={css.error}>Error: {errorType}</p>;
};

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function getTrendMovies() {
      setLoading(true);
      try {
        const { results } = await fetchTrendMovies();
        setMovies(results);
      } catch (error) {
        console.error('Error in App:', error);
        setError("Failed to load movies. Please try again later.");
        setIsError(true);
      } finally {
        setLoading(false);
      }
    }
    getTrendMovies();
  }, []);

  return (
    <main className={css.main}>
      <h2 className={css.title}>Trending movies</h2>
      {loading && <Loader />}
      {isError && <Error errorType={error} />}
      {!loading && !isError && <MovieList movies={movies} />}
    </main>
  );
};

export default HomePage;
