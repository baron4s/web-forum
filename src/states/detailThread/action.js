import { hideLoading, showLoading } from 'react-redux-loading-bar';
import forum from '../../utils/api';

const ActionType = {
  RECEIVE_DETAIL_THREAD: 'RECEIVE_DETAIL_THREAD',
  UP_VOTE_THREAD_DETAIL: 'UP_VOTE_THREAD_DETAIL',
  DOWN_VOTE_THREAD_DETAIL: 'DOWN_VOTE_THREAD_DETAIL',
  UP_VOTE_THREAD_DETAIL_COMMENTS: 'UP_VOTE_THREAD_DETAIL_COMMENTS',
  DOWN_VOTE_THREAD_DETAIL_COMMENTS: 'DOWN_VOTE_THREAD_DETAIL_COMMENTS',
};

function receiveDetailThreadActionCreator(detailThread) {
  return {
    type: ActionType.RECEIVE_DETAIL_THREAD,
    payload: {
      detailThread,
    },
  };
}

function upVoteDetailThreadActionCreator(userId) {
  return {
    type: ActionType.UP_VOTE_THREAD_DETAIL,
    payload: {
      userId,
    },
  };
}

function downVoteThreadDetailActionCreator(userId) {
  return {
    type: ActionType.DOWN_VOTE_THREAD_DETAIL,
    payload: {
      userId,
    },
  };
}

function upVoteDetailThreadCommentsActionCreator(commentId, userId) {
  return {
    type: ActionType.UP_VOTE_THREAD_DETAIL_COMMENTS,
    payload: {
      commentId,
      userId,
    },
  };
}

function downVoteDetailThreadCommentsActionCreator(commentId, userId) {
  return {
    type: ActionType.DOWN_VOTE_THREAD_DETAIL_COMMENTS,
    payload: {
      commentId,
      userId,
    },
  };
}

function asyncReceiveDetailTheread(id) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const detailThread = await forum.getDetailThread(id);
      dispatch(receiveDetailThreadActionCreator(detailThread));
    } catch (error) {
      alert(error);
    }
    dispatch(hideLoading());
  };
}

function asyncToggleUpVoteDetailThreadProcess() {
  return async (dispatch, getState) => {
    const { detailThread, authUser } = getState();
    if (authUser) {
      dispatch(upVoteDetailThreadActionCreator(authUser.id));
      try {
        if (detailThread.upVotesBy.includes(authUser.id)) {
          await forum.neutraLizeVoteThread(detailThread.id);
        } else {
          await forum.upVoteThread(detailThread.id);
        }
      } catch (error) {
        alert(error);
        dispatch(upVoteDetailThreadActionCreator(authUser.id));
      }
    } else {
      alert('Login terlebih dahulu');
    }
  };
}

function asyncToggleDownVoteDetailThreadProcess() {
  return async (dispatch, getState) => {
    const { detailThread, authUser } = getState();
    if (authUser) {
      dispatch(downVoteThreadDetailActionCreator(authUser.id));
      try {
        if (detailThread.downVotesBy.includes(authUser.id)) {
          await forum.neutraLizeVoteThread(detailThread.id);
        } else {
          await forum.downVoteThread(detailThread.id);
        }
      } catch (error) {
        alert(error);
        dispatch(downVoteThreadDetailActionCreator(authUser.id));
      }
    } else {
      alert('Login terlebih dahulu');
    }
  };
}

function asyncCreateCommentProcess(id, comments) {
  return async (dispatch) => {
    try {
      const { status } = await forum.createComment(id, comments);
      const detailThread = await forum.getDetailThread(id);
      dispatch(receiveDetailThreadActionCreator(detailThread));
      alert(status);
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncToggleUpVoteComment(commentId) {
  return async (dispatch, getState) => {
    const { detailThread, authUser } = getState();
    const { comments } = detailThread;
    const findComments = comments.find((comment) => comment.id === commentId);

    if (authUser) {
      dispatch(
        upVoteDetailThreadCommentsActionCreator(findComments.id, authUser.id),
      );
      try {
        if (findComments.upVotesBy.includes(authUser.id)) {
          await forum.neutralizeComment(detailThread.id, findComments.id);
        } else {
          await forum.upVoteComment(detailThread.id, findComments.id);
        }
      } catch (error) {
        alert(error);
        dispatch(
          upVoteDetailThreadCommentsActionCreator(commentId, authUser.id),
        );
      }
    } else {
      alert('Login terlebih dahulu');
    }
  };
}

function asyncToggleDownVoteComment(commentId) {
  return async (dispatch, getState) => {
    const { detailThread, authUser } = getState();
    const { comments } = detailThread;
    const findComments = comments.find((comment) => comment.id === commentId);

    if (authUser) {
      dispatch(
        downVoteDetailThreadCommentsActionCreator(findComments.id, authUser.id),
      );
      try {
        if (findComments.downVotesBy.includes(authUser.id)) {
          await forum.neutralizeComment(detailThread.id, findComments.id);
        } else {
          await forum.downVoteComment(detailThread.id, findComments.id);
        }
      } catch (error) {
        alert(error);
        dispatch(
          downVoteDetailThreadCommentsActionCreator(commentId, authUser.id),
        );
      }
    } else {
      alert('Login terlebih dahulu');
    }
  };
}

export {
  ActionType,
  asyncReceiveDetailTheread,
  asyncToggleUpVoteDetailThreadProcess,
  asyncToggleDownVoteDetailThreadProcess,
  asyncCreateCommentProcess,
  asyncToggleUpVoteComment,
  asyncToggleDownVoteComment,
  upVoteDetailThreadActionCreator,
};
