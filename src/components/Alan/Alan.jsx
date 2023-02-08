import alanBtn from '@alan-ai/alan-sdk-web';
import React, { useEffect, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ColorModeContext } from '../../utils/ToggleColorMode';
import { fetchToken } from '../../utils';

import {
  selectGenreOrCategory,
  searchMovie,
} from '../../features/currentGenreOrCategory';

const useAlan = () => {
  const { setMode } = useContext(ColorModeContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    alanBtn({
      key: 'e52f9e4fa275ee7fe16a8322a110753e2e956eca572e1d8b807a3e2338fdd0dc/stage',
      onCommand: ({ command, mode, genres, genreOrCategory, query }) => {
        console.log('cmd', command);
        console.log('mode', mode);
        console.log('gorcate', genreOrCategory);
        console.log('dd', genres);

        if (command === 'chooseGenre') {
          const foundGenre = genres.find(
            (g) => g.name.toLowerCase() === genreOrCategory.toLowerCase()
          );
          if (foundGenre) {
            navigate('/');
            dispatch(selectGenreOrCategory(foundGenre.id));
          } else {
            const category = genreOrCategory.startsWith('top')
              ? 'top_rate'
              : genreOrCategory;

            navigate('/');
            dispatch(selectGenreOrCategory(category));
          }
        } else if (command === 'changeMode') {
          if (mode === 'light') {
            setMode('light');
          } else {
            setMode('dark');
          }
        } else if (command === 'login') {
          fetchToken();
        } else if (command === 'logout') {
          localStorage.clear();
          window.location.href = '/';
        } else if (command === 'search') {
          dispatch(searchMovie(query));
        }
      },
    });
  }, []);
};

export default useAlan;
