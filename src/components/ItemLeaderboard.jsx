import React from 'react';
import PropTypes from 'prop-types';

function ItemLeaderboard({ user, score }) {
  return (
    <div className="item-leaderboard">
      <div className="user-leaderboard">
        <div className="avatar-username">
          <div className="avatar-user">
            <img src={user.avatar} alt="test" />
          </div>
          <p>{user.name}</p>
          <div className="score" style={{ marginLeft: 'auto' }}>
            <p>{score}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

ItemLeaderboard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }),
  score: PropTypes.number.isRequired,
};

export default ItemLeaderboard;
