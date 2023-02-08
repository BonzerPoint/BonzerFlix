import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const tmpdbApiKey = process.env.REACT_APP_TMDB_KEY;
// https://api.themoviedb.org/3/movie/popular?api_key=<<api_key>>&language=en-US&page=1

export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.themoviedb.org/3',
  }),
  endpoints: (builder) => ({
    // Get Genres
    getGenres: builder.query({
      query: () => `genre/movie/list?api_key=${tmpdbApiKey}`,
    }),

    //* Get movies by [Type]
    getMovies: builder.query({
      query: ({ genreIdOrCategoryName, page, searchQuery }) => {
        // Get Movies by Search
        if (searchQuery) {
          return `/search/movie?query=${searchQuery}&page=${page}&api_key=${tmpdbApiKey}`;
        }

        // Get Movies by Category
        if (
          genreIdOrCategoryName &&
          typeof genreIdOrCategoryName === 'string'
        ) {
          return `movie/${genreIdOrCategoryName}?page=${page}&api_key=${tmpdbApiKey}`;
        }

        // Get Movies by Genre
        if (
          genreIdOrCategoryName &&
          typeof genreIdOrCategoryName === 'number'
        ) {
          return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${tmpdbApiKey}`;
        }

        // Get Popular movies
        return `movie/popular?page=${page}&api_key=${tmpdbApiKey}`;
      },
    }),
    // Get Movie
    getMovie: builder.query({
      query: (id) =>
        `/movie/${id}?append_to_response=videos,credits&api_key=${tmpdbApiKey}`,
    }),

    // Get user specific list
    getRecommendations: builder.query({
      query: ({ movie_id, list }) =>
        `/movie/${movie_id}/${list}?api_key=${tmpdbApiKey}`,
    }),
    // Get Actor Details
    getActorDetails: builder.query({
      query: (id) => `/person/${id}?api_key=${tmpdbApiKey}&language=en-US`,
    }),
    // Get Movie by Actor
    getMoviesByActorId: builder.query({
      query: ({ id, page }) =>
        `/discover/movie?withcast=${id}&page=${page}&api_key=${tmpdbApiKey}`,
    }),

    // GetList of Favorite and watchlisted Movies for user
    getList: builder.query({
      query: ({ listName, accountId, sessionId, page }) =>
        `/account/${accountId}/${listName}?page=${page}&api_key=${tmpdbApiKey}&session_id=${sessionId}`,
    }),
  }),
});

export const {
  useGetGenresQuery,
  useGetMoviesQuery,
  useGetMovieQuery,
  useGetRecommendationsQuery,
  useGetActorDetailsQuery,
  useGetMoviesByActorIdQuery,
  useGetListQuery,
} = tmdbApi;
