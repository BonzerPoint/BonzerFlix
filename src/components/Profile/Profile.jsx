import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Typography, Button, Box } from '@mui/material';
import { ExitToApp } from '@mui/icons-material';

import { useGetListQuery } from '../../services/TMDB';
import { MovieList } from '..';

const Profile = () => {
  const user = useSelector((state) => state.user);
  const { data: favoriteMovies, refetch: refetchFavorites } = useGetListQuery({
    accountId: user.id,
    listName: 'favorite/movies',
    page: 1,
    sessionId: localStorage.getItem('session_id'),
  });
  const { data: watchlistMovies, refetch: refetchWatchlisted } =
    useGetListQuery({
      accountId: user.id,
      listName: 'watchlist/movies',
      page: 1,
      sessionId: localStorage.getItem('session_id'),
    });

  useEffect(() => {
    refetchFavorites();
    refetchWatchlisted();
  }, []);

  const logout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
      >
        <Typography
          variant="h4"
          gutterBottom
        >
          My Profile
        </Typography>
        <Button
          color="inherit"
          onClick={logout}
        >
          Logout &nbsp; <ExitToApp />
        </Button>
      </Box>
      {!favoriteMovies?.results?.length ? (
        <Typography variant="h5">
          Add favorites some movies to see them here
        </Typography>
      ) : (
        <Box>
          Favorite Movies
          <MovieList movies={favoriteMovies} />
        </Box>
      )}

      {!watchlistMovies?.results?.length ? (
        <Typography variant="h5">
          Add watchlist some movies to see them here
        </Typography>
      ) : (
        <Box>
          Waltchlist Movies
          <MovieList movies={watchlistMovies} />
        </Box>
      )}
    </Box>
  );
};

export default Profile;
