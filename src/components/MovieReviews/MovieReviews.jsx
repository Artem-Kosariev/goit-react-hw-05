import { useEffect, useRef, useState } from 'react';
import { fetchMovieReview } from '../../api/movies-api';
import { useParams } from 'react-router-dom';
import css from './MovieReviews.module.css';
import Loader from '../Loader/Loader';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState('');

  const firstReviewRef = useRef(null);

  useEffect(() => {
    if (reviews.length > 0 && firstReviewRef.current) {
      const { height } = firstReviewRef.current.getBoundingClientRect();
      window.scrollBy({ top: height, behavior: 'smooth' });
    }
  }, [reviews]);

  useEffect(() => {
    const getMovieDetails = async () => {
      setLoading(true);
      try {
        const { results } = await fetchMovieReview(movieId);
        setReviews(results);
      } catch (error) {
        console.error(error.message);
        setError("Failed to load reviews. Please try again later.");
        setIsError(true);
      } finally {
        setLoading(false);
      }
    };
    getMovieDetails();
  }, [movieId]);

  return (
    <section className={css.reviews}>
      {isError && <div className={css.error}>Error: {error}</div>}
      {loading && <Loader />}
      {reviews.length === 0 && !loading && <p>Reviews not found</p>}
      {reviews.length > 0 && (
        <ul className={css.listReviews}>
          {reviews.map((review, index) => (
            <li
              key={review.id}
              className={css.reviewItem}
              ref={index === 0 ? firstReviewRef : null}
            >
              <div className={css.textReview}>
                <h3 className={css.name}>{review.author}</h3>
                <p>{review.content}</p>
              </div>
              
              <div className={css.dateList}>
                <p className={css.dateItem}>Make: {review.created_at}</p>
                <p className={css.dateItem}>Update: {review.updated_at}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default MovieReviews;
