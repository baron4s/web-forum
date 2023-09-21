import React from 'react';
import PropTypes from 'prop-types';
import ItemDiscussion from './ItemDiscussion';

function ListDiscussions({ threads, upVoteThread, downVoteThread }) {
  return threads.length <= 0 ? (
    <div className="list-discussion">
      <p className="placeholder-notdiscussion">Tidak ada diskusi tersedia</p>
    </div>
  ) : (
    <div className="list-discussions">
      {threads.map((thread) => {
        return (
          <ItemDiscussion
            key={thread.id}
            id={thread.id}
            authUser={thread.authUser}
            name={thread.user.name}
            createdAt={thread.createdAt}
            avatar={thread.user.avatar}
            title={thread.title}
            text={thread.body}
            totalComments={thread.totalComments}
            upVotes={thread.upVotesBy}
            downVotes={thread.downVotesBy}
            category={thread.category}
            upVoteThread={upVoteThread}
            downVoteThread={downVoteThread}
          />
        );
      })}
    </div>
  );
}

const threadsShape = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  ownerId: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  totalComments: PropTypes.number.isRequired,
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  authUser: PropTypes.string,
};

ListDiscussions.propTypes = {
  threads: PropTypes.arrayOf(
    PropTypes.shape({
      ...threadsShape,
    }).isRequired,
  ).isRequired,
  upVoteThread: PropTypes.func.isRequired,
  downVoteThread: PropTypes.func.isRequired,
};

export { threadsShape };

export default ListDiscussions;
