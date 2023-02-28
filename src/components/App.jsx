import React, { useRef } from 'react';
import { CssBaseline } from '@mui/material';
import { Routes, Route } from 'react-router-dom';

import useStyles from './styles';
import useAlan from './Alan/Alan';

import { Actors, MovieInformation, Movies, NavBar, Profile } from './index';

const App = () => {
  const classes = useStyles();
  useAlan();
  const alanBtnContainer = useRef();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Routes>
          <Route
            exact
            path="/movie/:id"
            element={<MovieInformation />}
          />
          <Route
            exact
            path="/actors/:id"
            element={<Actors />}
          />
          <Route
            exact
            path="/"
            element={<Movies />}
          />
          <Route
            path="/approved"
            element={<Movies />}
          />

          <Route
            exact
            path="/profile/:id"
            element={<Profile />}
          />
        </Routes>
      </main>
      <div ref={alanBtnContainer} />
    </div>
  );
};

export default App;
