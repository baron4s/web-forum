import React from 'react';
import DOMPurify from 'dompurify';
import PropTypes from 'prop-types';
import {
  AiFillDislike,
  AiOutlineLike,
  AiFillLike,
  AiOutlineDislike,
} from 'react-icons/ai';
import postetAt from '../utils/postedAt';

function DetailComment({
  id,
  content,
  createdAt,
  owner,
  upVotesBy,
  downVotesBy,
  authUser,
  upVoteCommentHandlers,
  downVoteCommentHandlers,
}) {
  const isUpvoteComment = upVotesBy.includes(authUser);
  const isDownVoteComment = downVotesBy.includes(authUser);
  const htmlContent = content;
  const sanitizedHtmlContent = DOMPurify.sanitize(htmlContent);

  return (
    <div className="detail-comment-user">
      <section className="detail-user-profile">
        <div className="profile-avatar">
          <img
            src={owner.avatar}
            alt={owner.name}
            className="avatar-user-image"
          />
        </div>
        <div className="user-details">
          <p className="user-name">{owner.name}</p>
          <span className="time-made">{postetAt(createdAt)}</span>
        </div>
      </section>
      <section className="body-comment">
        <p dangerouslySetInnerHTML={{ __html: sanitizedHtmlContent }} />
        <div className="vote">
          <div className="up-vote">
            <button
              type="button"
              aria-label="like-thread"
              onClick={() => upVoteCommentHandlers(id)}
            >
              {isUpvoteComment ? (
                <AiFillLike className="vote-icon clicked" />
              ) : (
                <AiOutlineLike className="vote-icon" />
              )}
            </button>
            <span className="up-vote-amount">{upVotesBy.length}</span>
          </div>
          <div className="down-vote">
            <button
              type="button"
              aria-label="dislike-thread"
              onClick={() => downVoteCommentHandlers(id)}
            >
              {isDownVoteComment ? (
                <AiFillDislike className="vote-icon liked" />
              ) : (
                <AiOutlineDislike className="vote-icon" />
              )}
            </button>
            <span className="up-vote-amount">{downVotesBy.length}</span>
          </div>
        </div>
      </section>
    </div>
  );
}

DetailComment.propTypes = {
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
  authUser: PropTypes.string,
  upVoteCommentHandlers: PropTypes.func.isRequired,
  downVoteCommentHandlers: PropTypes.func.isRequired,
};

export default DetailComment;
