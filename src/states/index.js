import { configureStore } from '@reduxjs/toolkit';
import { loadingBarReducer } from 'react-redux-loading-bar';
import threadReducer from './threads/reducer';
import usersReducer from './users/reducer';
import detailThreadReducer from './detailThread/reducer';
import authUserReducer from './auth/reducer';
import isPreloadReducer from './preLoad.js/reducer';
import leaderboardReducer from './leaderboards/reducer';

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    isPreload: isPreloadReducer,
    threads: threadReducer,
    users: usersReducer,
    detailThread: detailThreadReducer,
    leaderboards: leaderboardReducer,
    loadingBar: loadingBarReducer,
  },
});

export default store;
