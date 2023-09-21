import React from 'react';
import PropTypes from 'prop-types';
import DetailComment from './DetailComment';

function ListComments({
  comments,
  upVoteCommentHandlers,
  downVoteCommentHandlers,
  authUser,
}) {
  return comments.length <= 0 ? (
    <p className="placeholder-notlistcomment">Tidak ada komentar</p>
  ) : (
    <>
      {comments.map((comment) => {
        return (
          <DetailComment
            key={comment.id}
            id={comment.id}
            content={comment.content}
            owner={comment.owner}
            createdAt={comment.createdAt}
            upVotesBy={comment.upVotesBy}
            downVotesBy={comment.downVotesBy}
            authUser={authUser}
            upVoteCommentHandlers={upVoteCommentHandlers}
            downVoteCommentHandlers={downVoteCommentHandlers}
          />
        );
      })}
    </>
  );
}

const commentsShape = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

ListComments.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      ...commentsShape,
    }),
  ).isRequired,
  authUser: PropTypes.string,
  upVoteCommentHandlers: PropTypes.func.isRequired,
  downVoteCommentHandlers: PropTypes.func.isRequired,
};

export { commentsShape };

export default ListComments;
