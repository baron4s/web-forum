import React from 'react';
import PropTypes from 'prop-types';
import ListLeaderboards, { leaderboardsShape } from './ListLeaderboards';

function Leaderboard({ leaderboards }) {
  return (
    <div className="leaderboard">
      <h2>Klasmen Pengguna Aktif</h2>
      <ListLeaderboards leaderboards={leaderboards} />
    </div>
  );
}

Leaderboard.propTypes = {
  leaderboards: PropTypes.arrayOf(
    PropTypes.shape({
      ...leaderboardsShape,
    }).isRequired,
  ).isRequired,
};

export default Leaderboard;
