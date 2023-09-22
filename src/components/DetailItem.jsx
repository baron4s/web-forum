import React from 'react';
import { Link } from 'react-router-dom';
import DOMPurify from 'dompurify';
import PropTypes from 'prop-types';
import {
  AiFillDislike,
  AiOutlineLike,
  AiFillLike,
  AiOutlineDislike,
} from 'react-icons/ai';
import ListComments, { commentsShape } from './ListComments';
import postetAt from '../utils/postedAt';
import useInput from '../hooks/useInput';

function DetailItem({
  id,
  title,
  body,
  createdAt,
  owner,
  category,
  comments,
  upVotesBy,
  downVotesBy,
  authUser,
  upVoteThread,
  downVoteThread,
  commentsHandlers,
  upVoteCommentHandlers,
  downVoteCommentHandlers,
}) {
  const [valueComments, setValueComments] = useInput();
  const isUpVoteThread = upVotesBy.includes(authUser);
  const isDownVoteThread = downVotesBy.includes(authUser);
  const htmlContent = body;
  const sanitizedHtmlContent = DOMPurify.sanitize(htmlContent);

  return (
    <div className="detail-item">
      <section className="user-detail">
        <div className="user">
          <div className="avatar-user">
            <img src={owner.avatar} alt={owner.name} />
          </div>
          <div className="user-profile">
            <p>{owner.name}</p>
            <div className="meta">
              <span className="time-made">{postetAt(createdAt)}</span>
              <span className="category">{`#${category}`}</span>
            </div>
          </div>
        </div>
        <section className="discussion-detail">
          <h2 className="title-discussion">{title}</h2>
          <p
            className="body-discussion"
            dangerouslySetInnerHTML={{ __html: sanitizedHtmlContent }}
          />
          <div className="vote">
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
              <span className="up-vote-amount">{upVotesBy.length}</span>
            </div>
            <div className="down-vote">
              <button
                type="button"
                aria-label="dislike-thread"
                onClick={() => downVoteThread(id)}
              >
                {isDownVoteThread ? (
                  <AiFillDislike className="vote-icon liked" />
                ) : (
                  <AiOutlineDislike className="vote-icon" />
                )}
              </button>
              <span className="up-vote-amount">{downVotesBy.length}</span>
            </div>
          </div>
        </section>
      </section>
      <section className="comment">
        <h3>Comment</h3>
        {authUser ? (
          <>
            <textarea
              placeholder="Comment here...."
              value={valueComments}
              onChange={setValueComments}
            />
            <button
              type="button"
              className="btn-comment"
              onClick={() => commentsHandlers(valueComments)}
            >
              Kirim
            </button>
          </>
        ) : (
          <p className="notify-line-notauth">
            <Link to="/login">Login</Link> untuk menambah komentar
          </p>
        )}
      </section>
      <section className="list-comments">
        <h3>List Comments ({comments.length})</h3>
        <ListComments
          comments={comments}
          upVoteCommentHandlers={upVoteCommentHandlers}
          downVoteCommentHandlers={downVoteCommentHandlers}
          authUser={authUser}
        />
      </section>
    </div>
  );
}

DetailItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  category: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      ...commentsShape,
    }),
  ).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  upVoteThread: PropTypes.func.isRequired,
  downVoteThread: PropTypes.func.isRequired,
  commentsHandlers: PropTypes.func.isRequired,
  authUser: PropTypes.string,
  upVoteCommentHandlers: PropTypes.func.isRequired,
  downVoteCommentHandlers: PropTypes.func.isRequired,
};

export default DetailItem;
