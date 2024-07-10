import axios from 'axios';
import {MovieApiKey} from '../constants';

// endpoints
const apiBaseUrl = 'https://api.themoviedb.org/3';
const trendingMoviesEndPoint = `${apiBaseUrl}/trending/movie/day?api_key=${MovieApiKey}`;
const upcomingMoviesEndPoint = `${apiBaseUrl}/movie/upcoming?api_key=${MovieApiKey}`;
const topRatedMoviesEndPoint = `${apiBaseUrl}/movie/top_rated?api_key=${MovieApiKey}`;

// dynamic api call
const MovieDetailsEndPoint = id =>
  `${apiBaseUrl}/movie/${id}?api_key=${MovieApiKey}`;
const moviesCreditsEndPoint = id =>
  `${apiBaseUrl}/movie/${id}/credits?api_key=${MovieApiKey}`;
const similarMoviesEndPoint = id =>
  `${apiBaseUrl}/movie/${id}/similar?api_key=${MovieApiKey}`;

// person endpoints
const personEndPoint = id =>
  `${apiBaseUrl}/person/${id}?api_key=${MovieApiKey}`;
const personMoviesEndPoint = id =>
  `${apiBaseUrl}/person/${id}/movie_credits?api_key=${MovieApiKey}`;

// search endpoint
const searchEndPoint = `${apiBaseUrl}/search/movie?api_key=${MovieApiKey}`;

const apiCall = async (endpoint, params) => {
  const options = {
    method: 'GET',
    url: endpoint,
    params: params ? params : {},
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log(
      'error: ',
      error.response ? error.response.data : error.message,
    );
    return {};
  }
};

export const image500 = path =>
  path ? `https://image.tmdb.org/t/p/w500/${path}` : null;
export const image342 = path =>
  path ? `https://image.tmdb.org/t/p/w342/${path}` : null;
export const image185 = path =>
  path ? `https://image.tmdb.org/t/p/w185/${path}` : null;

export const fallbackMoviePoster =
  'https://via.placeholder.com/185x278.png?text=No+Image';
export const fallBackPersonImage =
  'https://via.placeholder.com/185x278.png?text=No+Image';

export const fetchTrendingMovies = () => {
  return apiCall(trendingMoviesEndPoint);
};
export const fetchTopRatedMovies = () => {
  return apiCall(topRatedMoviesEndPoint);
};
export const fetchUpcomingMovies = () => {
  return apiCall(upcomingMoviesEndPoint);
};

export const fetchMovieDetails = id => {
  return apiCall(MovieDetailsEndPoint(id));
};
export const fetchMovieCredits = id => {
  return apiCall(moviesCreditsEndPoint(id));
};
export const fetchSimilarMovies = id => {
  return apiCall(similarMoviesEndPoint(id));
};

export const fetchPersonDetails = id => {
  return apiCall(personEndPoint(id));
};
export const fetchPersonMovies = id => {
  return apiCall(personMoviesEndPoint(id));
};

export const searchMovies = params => {
  return apiCall(searchEndPoint, params);
};
