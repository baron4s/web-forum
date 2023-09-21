import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  AiFillDislike,
  AiOutlineLike,
  AiFillLike,
  AiOutlineDislike,
} from 'react-icons/ai';
import { FaRegCommentDots } from 'react-icons/fa';
import postetAt from '../utils/postedAt';

function ItemDiscussion({
  id,
  avatar,
  name,
  title,
  text,
  category,
  upVotes,
  downVotes,
  createdAt,
  totalComments,
  authUser,
  upVoteThread,
  downVoteThread,
}) {
  const isUpVoteThread = upVotes.includes(authUser);
  const isDownVoteThread = downVotes.includes(authUser);

  return (
    <div className="item-discussion">
      <div className="user">
        <div className="avatar-user">
          <img src={avatar} alt="avatar" />
        </div>
        <div className="user-profile">
          <p>{name}</p>
          <span className="time-made">{postetAt(createdAt)}</span>
        </div>
      </div>
      <div className="item-discussion-content">
        <Link to={`/detail/${id}`}>{title}</Link>
        <p dangerouslySetInnerHTML={{ __html: text }} />
        <div className="item-discussion-content-category">
          <p>{`#${category}`}</p>
        </div>
        <div className="vote-and-comment">
          <div className="up-vote">
            <button
              type="button"
              aria-label="like-thread"
              onClick={() => upVoteThread(id)}
            >
              {isUpVoteThread ? (
                <AiFillLike className="vote-icon clicked" />
              ) : (
                <AiOutlineLike className="vote-icon" />
              )}
            </button>
            <span className="up-vote-amount">{upVotes.length}</span>
          </div>
          <div className="down-vote">
            <button
              type="button"
              aria-label="downVote-thread"
              onClick={() => downVoteThread(id)}
            >
              {isDownVoteThread ? (
                <AiFillDislike className="vote-icon liked" />
              ) : (
                <AiOutlineDislike className="vote-icon" />
              )}
            </button>
            <span className="up-vote-amount">{downVotes.length}</span>
          </div>
          <div className="comment-thread">
            <FaRegCommentDots className="comment-icon" />
            <span className="comment-amount">{totalComments}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

ItemDiscussion.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  upVotes: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  downVotes: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  totalComments: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  authUser: PropTypes.string,
  upVoteThread: PropTypes.func.isRequired,
  downVoteThread: PropTypes.func.isRequired,
};

export default ItemDiscussion;
