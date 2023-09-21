import forum from '../../utils/api';

const ActionType = {
  ALL_THREADS: 'ALL_THREAD',
  RECEIVE_DETAIL_THREAD: 'RECEIVE_DETAIL_THREAD',
  TOGGLE_UP_VOTE_THREAD: 'TOGGLE_UP_VOTE_THREAD',
  TOGGLE_DOWN_VOTE_THREAD: 'TOGGLE_DOWN_VOTE_THREAD',
};

function receiveAllThreadsActionCreator(threads) {
  return {
    type: ActionType.ALL_THREADS,
    payload: {
      threads,
    },
  };
}

function toggleUpVoteThreadActionCreator(id, userId) {
  return {
    type: ActionType.TOGGLE_UP_VOTE_THREAD,
    payload: {
      id,
      userId,
    },
  };
}

function toggleDownVoteThreadActionCreator(id, userId) {
  return {
    type: ActionType.TOGGLE_DOWN_VOTE_THREAD,
    payload: {
      id,
      userId,
    },
  };
}

function asyncCreateThreadProcess(title, body, category) {
  return async () => {
    try {
      const message = await forum.createThread(title, body, category);
      alert(message);
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncToggleUpVoteThreadProcess(id) {
  return async (dispatch, getState) => {
    const { threads, authUser } = getState();

    if (authUser) {
      dispatch(toggleUpVoteThreadActionCreator(id, authUser.id));
      try {
        threads.forEach(async (thread) => {
          if (thread.upVotesBy.includes(authUser.id)) {
            await forum.neutraLizeVoteThread(id);
          } else {
            await forum.upVoteThread(id);
          }
        });
      } catch (error) {
        alert(error);
        dispatch(toggleUpVoteThreadActionCreator(id, authUser.id));
      }
    } else {
      alert('Login terlebih dahulu');
    }
  };
}

function asyncToggleDownVoteThreadProcess(id) {
  return async (dispatch, getState) => {
    const { threads, authUser } = getState();
    if (authUser) {
      dispatch(toggleDownVoteThreadActionCreator(id, authUser.id));
      try {
        threads.forEach(async (thread) => {
          if (thread.downVotesBy.includes(authUser.id)) {
            await forum.neutraLizeVoteThread(id);
          } else {
            await forum.downVoteThread(id);
          }
        });
      } catch (error) {
        alert(error);
        dispatch(toggleDownVoteThreadActionCreator(id, authUser.id));
      }
    } else {
      alert('Login terlebih dahulu');
    }
  };
}

export {
  ActionType,
  receiveAllThreadsActionCreator,
  asyncCreateThreadProcess,
  asyncToggleUpVoteThreadProcess,
  asyncToggleDownVoteThreadProcess,
};
