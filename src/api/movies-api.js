import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";

const user_Key =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZmY2ZjJhODlkYjZmOGU2MDM0YjVjNmE2OGZhZGVhYyIsIm5iZiI6MTczMDAzMTEwMC4wNjQ5NzYsInN1YiI6IjY3MWUyYzlkNWJlOWU4NzU5ZGE3OGJjMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.N-JhuLmAiYDu5ln0LOX4TH5_8YC35oQ8O5Md4jsyrgU";

axios.defaults.headers = {
  Authorization: `Bearer ${user_Key}`,
  Accept: "application/json",
};

export const fetchTrendMovies = async () => {
  try {
    const response = await axios.get("/trending/movie/day");
    return response.data;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    throw error;
  }
};

export const fetchMovieDetails = async (movie_id) => {
  try {
    const response = await axios.get(`/movie/${movie_id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching movie details for ID ${movie_id}:`, error);
    throw error;
  }
};

export const fetchMovieReview = async (movie_id) => {
  try {
    const response = await axios.get(`/movie/${movie_id}/reviews`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching reviews for movie ID ${movie_id}:`, error);
    throw error;
  }
};

export const fetchMovieCredits = async (movie_id) => {
  try {
    const response = await axios.get(`/movie/${movie_id}/credits`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching credits for movie ID ${movie_id}:`, error);
    throw error;
  }
};

export const fetchSearchMovie = async (query, page = 1) => {
  try {
    const response = await axios.get("/search/movie", {
      params: {
        query,
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error searching movies with query "${query}":`, error);
    throw error;
  }
};
