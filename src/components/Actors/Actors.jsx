import React, { useState } from 'react';
import {
  Modal,
  Typography,
  Button,
  ButtonGroup,
  Grid,
  Box,
  CircularProgress,
  useMediaQuery,
  Rating,
} from '@mui/material';
import {
  Movie as MovieIcon,
  Theaters,
  Language,
  PlusOne,
  Favorite,
  FavoriteBorderOutlined,
  Remove,
  ArrowBack,
} from '@mui/icons-material';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import {
  useGetActorDetailsQuery,
  useGetMoviesByActorIdQuery,
} from '../../services/TMDB';
import useStyles from './styles';
import { MovieList, Pagination } from '..';

const Actors = () => {
  const [page, setPage] = useState(1);
  const classes = useStyles();
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isFetching, error } = useGetActorDetailsQuery(id);

  const {
    data: recommendations,
    isFetching: isRecommendationsFetching,
    error: errorRecommendations,
  } = useGetMoviesByActorIdQuery({
    id,
    page,
  });
  if (isFetching) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Link to="/">Something has gone wrong - Go back</Link>
      </Box>
    );
  }

  console.log(data);
  return (
    <>
      <Grid
        container
        className={classes.containerSpaceAround}
      >
        <Grid
          item
          sm={12}
          lg={4}
        >
          <img
            className={classes.poster}
            src={`https://image.tmdb.org/t/p/w500/${data?.profile_path}`}
            alt={data?.title}
          />
        </Grid>
        <Grid
          item
          container
          direction="column"
          lg={7}
        >
          <Typography
            variant="h2"
            align="left"
            gutterBottom
          >
            {data?.name}
          </Typography>
          <Typography
            variant="h5"
            align="left"
            gutterBottom
          >
            Born: {new Date(data?.birthday).toDateString()}
          </Typography>
          <Typography
            variant="body1"
            align="left"
            gutterBottom
          >
            {data?.biography || 'Sorry, no biography yet ...'}
          </Typography>
        </Grid>
        <Box
          marginTop="2rem"
          display="flex"
          justifyContent="space-around"
        >
          <Button
            align="center"
            variant="contained"
            target="_blank"
            rel="noopener noreferrer"
            href={`https://www.imdb.com/name/${data?.imdb_id}`}
            endIcon={<MovieIcon />}
          >
            IMDB
          </Button>
          <Button
            startIcon=<ArrowBack />
            sx={{ borderColor: 'primary.main' }}
            onClick={() => navigate(-1)}
          >
            <Typography
              component={Link}
              color="inherit"
              variant="subtitle2"
              style={{ textDecoration: 'none' }}
            >
              Back
            </Typography>
          </Button>
        </Box>
      </Grid>
      <Box
        marginTop="5rem"
        width="100%"
      >
        <Typography
          variant="h3"
          gutterBottom
          align="center"
        >
          Movies
        </Typography>
        {/* loop through recommended movies */}
        {recommendations ? (
          <>
            <MovieList
              movies={recommendations}
              numberOfMovies={12}
            />
            <Pagination
              currentPage={page}
              totalPages={recommendations.total_pages}
              setPage={setPage}
            />
          </>
        ) : (
          <Box> Sorry nothing was found</Box>
        )}
      </Box>
    </>
  );
};

export default Actors;
