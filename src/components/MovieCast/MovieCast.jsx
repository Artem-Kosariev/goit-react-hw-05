import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import css from "./MovieCast.module.css";
import { fetchMovieCredits } from "../../api/movies-api";
import Loader from "../Loader/Loader";

const defaultImg =
'https://img.icons8.com/?size=100&id=20750&format=png&color=000000'

const MovieCast = () => {
  const { movieId } = useParams();
  const [movieCast, setMovieCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const request = async () => {
      try {
        const response = await fetchMovieCredits(movieId);
        console.log("Response from API:", response);
        if (response && response.cast && Array.isArray(response.cast)) {
          setMovieCast(response.cast);
        } else {
          console.error("No cast data available", response);
          setError("No cast data available");
        }
      } catch (error) {
        setError("Error fetching cast data");
      } finally {
        setLoading(false);
      }
    };
 
    request();
  }, [movieId]);

  if (loading) return <Loader />;
  if (error) return <div>Error: {error}</div>;


  return (
    <ul className={css.castList}>
      {movieCast.length > 0 ? (
        movieCast.map((actor) => (
          <li key={actor.id} className={css.castItem}>
            <img
              className={css.avatar}
              src={actor.profile_path ? `https://image.tmdb.org/t/p/w500${actor.profile_path}` : defaultImg}
              alt={actor.name}
            />
            <p>{actor.name} as {actor.character}</p>
          </li>
        ))
      ) : (
          <p className={css.noCast}>No cast information available.</p>
      )}
    </ul>
  );
};

export default MovieCast;
