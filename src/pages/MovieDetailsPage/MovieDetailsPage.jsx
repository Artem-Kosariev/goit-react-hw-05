import { NavLink, Outlet, useLocation, useParams, useNavigate } from 'react-router-dom';
import css from './MovieDetailsPage.module.css'; 
import { fetchMovieDetails } from '../../api/movies-api';
import Loader from '../../components/Loader/Loader';
import { Suspense, useEffect, useState } from 'react';

const defaultImg = 'https://img.icons8.com/?size=100&id=hKfRfqpe39Qf&format=png&color=000000';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setIsError(true);
      } finally {
        setLoading(false);
      }
    };
    getMovieDetails();
  }, [movieId]);

  const handleBackClick = () => {
    navigate(location.state?.from ?? '/movies');
  };

  return (
    <div className={css.wrapper}>
      <button onClick={handleBackClick} className={css.btnBack} aria-label="Go back">
        <span className={css.span}>Go back</span>
      </button>
      {loading && <Loader />}
      {isError && <p className={css.error}>Something went wrong. Please try again later.</p>}
      {!loading && movie && (
        <div className={css.movieDetails}>
          <div className={css.poster}>
            <img
              src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : defaultImg}
              width={300}
              alt={movie.title}
            />
          </div>
          <div className={css.description}>
            <h1 className={css.title}>{movie.title}</h1>
            <p className={css.overview}>{movie.overview}</p>
            <div className={css.info}>
              <p>
                Release Date: <span className={css.span}>{movie.release_date}</span>
              </p>
              <p>
                Rating: <span className={css.span}>{movie.vote_average}</span>
              </p>
            </div>
            <div className={css.navList}>
              <NavLink to="cast" state={location.state} className={css.details}>
                <div className={css.btn}>Cast</div>
              </NavLink>
              <NavLink to="reviews" state={location.state} className={css.details}>
                <div className={css.btn}>Reviews</div>
              </NavLink>
            </div>
          </div>
        </div>
      )}
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MovieDetailsPage;
