import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Leaderboard from '../components/Leaderboard';
import { asyncReceiveLeaderboardsProcess } from '../states/leaderboards/action';

function PageLeaderboard() {
  const { leaderboards = [] } = useSelector((states) => states);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveLeaderboardsProcess());
  }, [dispatch]);

  return <Leaderboard leaderboards={leaderboards} />;
}

export default PageLeaderboard;
