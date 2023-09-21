import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DetailItem from '../components/DetailItem';
import {
  asyncCreateCommentProcess,
  asyncReceiveDetailTheread,
  asyncToggleDownVoteComment,
  asyncToggleDownVoteDetailThreadProcess,
  asyncToggleUpVoteComment,
  asyncToggleUpVoteDetailThreadProcess,
} from '../states/detailThread/action';

function DetailPage() {
  const { detailThread = null, authUser } = useSelector((states) => states);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(asyncReceiveDetailTheread(id));
  }, [id, dispatch]);

  const onUpVoteThread = () => {
    dispatch(asyncToggleUpVoteDetailThreadProcess());
  };

  const onDownVoteThread = () => {
    dispatch(asyncToggleDownVoteDetailThreadProcess(id));
  };

  const onComments = (comments) => {
    dispatch(asyncCreateCommentProcess(id, comments));
  };

  const onUpVoteComment = (commentId) => {
    dispatch(asyncToggleUpVoteComment(commentId));
  };

  const onDownVoteComment = (commentId) => {
    dispatch(asyncToggleDownVoteComment(commentId));
  };

  if (!detailThread) {
    return null;
  }

  return (
    <DetailItem
      {...detailThread}
      authUser={authUser ? authUser.id : null}
      upVoteThread={onUpVoteThread}
      downVoteThread={onDownVoteThread}
      commentsHandlers={onComments}
      upVoteCommentHandlers={onUpVoteComment}
      downVoteCommentHandlers={onDownVoteComment}
    />
  );
}

export default DetailPage;
