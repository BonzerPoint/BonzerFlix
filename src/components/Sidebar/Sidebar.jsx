import React, { useEffect } from 'react';
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  ListItemIcon,
  Box,
  CircularProgress,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/styles';
import { useDispatch, useSelector } from 'react-redux';

import { useGetGenresQuery } from '../../services/TMDB';
import useStyles from './styles';
import genreIcons from '../../assets/genres';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';

// const blueLogo =
//   'https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png';
// const redLogo =
//   'https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png';

const blueLogo = 'BonzerFlixBlue.png';

const redLogo = 'BonzerFlixRed.png';

const categories = [
  { label: 'Popular', value: 'popular' },
  { label: 'Top Rated', value: 'top_rated' },
  { label: 'Upcoming', value: 'upcoming' },
];

const Sidebar = ({ setMobileOpen }) => {
  const theme = useTheme();
  const classes = useStyles();
  const { data, isFetching } = useGetGenresQuery();
  const dispatch = useDispatch();
  const { genreIdOrCategoryName } = useSelector(
    (state) => state.currentGenreOrCategory
  );

  useEffect(() => {
    setMobileOpen(false);
  }, [genreIdOrCategoryName]);
  {
    console.log(theme.palette.mode);
  }
  return (
    <>
      <Link
        to="/"
        className={classes.imageLink}
      >
        <img
          className={classes.image}
          src={theme.palette.mode === 'light' ? blueLogo : redLogo}
          alt="Bonzerflix logo"
        />
      </Link>
      <Divider />
      <List>
        <ListSubheader>Categories</ListSubheader>
        {categories.map(({ label, value }) => (
          <Link
            key={value}
            className={classes.links}
            to="/"
          >
            <ListItem
              onClick={() => dispatch(selectGenreOrCategory(value))}
              button
              selected={genreIdOrCategoryName === value}
            >
              <ListItemIcon>
                <img
                  src={genreIcons[label.toLowerCase()]}
                  className={classes.genreImage}
                  height={30}
                />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader>Genre</ListSubheader>
        {isFetching ? (
          <Box
            display="flex"
            justifyContent="center"
          >
            <CircularProgress />
          </Box>
        ) : (
          data.genres.map(({ name, id }) => (
            <Link
              key={id}
              className={classes.links}
              to="/"
            >
              <ListItem
                onClick={() => dispatch(selectGenreOrCategory(id))}
                button
                selected={genreIdOrCategoryName === id}
              >
                <ListItemIcon>
                  <img
                    src={genreIcons[name.toLowerCase()]}
                    className={classes.genreImage}
                    height={30}
                  />
                </ListItemIcon>
                <ListItemText primary={name} />
              </ListItem>
            </Link>
          ))
        )}
      </List>
    </>
  );
};

export default Sidebar;
