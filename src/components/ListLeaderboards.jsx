import React from 'react';
import PropTypes from 'prop-types';
import ItemLeaderboard from './ItemLeaderboard';

function ListLeaderboards({ leaderboards }) {
  return (
    <div className="list-leaderboards">
      <div className="title-item">
        <h3>Pengguna</h3>
        <h3 style={{ marginLeft: 'auto' }}>Skor</h3>
      </div>
      {leaderboards.length < 0
        ? null
        : leaderboards.map((leaderboard) => {
            return (
              <ItemLeaderboard key={leaderboard.user.id} {...leaderboard} />
            );
          })}
    </div>
  );
}

const leaderboardsShape = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }),
  score: PropTypes.number.isRequired,
};

ListLeaderboards.propTypes = {
  leaderboards: PropTypes.arrayOf(
    PropTypes.shape({
      ...leaderboardsShape,
    }).isRequired,
  ).isRequired,
};

export { leaderboardsShape };

export default ListLeaderboards;
