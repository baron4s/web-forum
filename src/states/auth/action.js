import { hideLoading, showLoading } from 'react-redux-loading-bar';
import forum from '../../utils/api';

const ActionType = {
  SET_AUTH_USER: 'SET_AUTH_USER',
  UNSET_AUTH_USER: 'UNSET_AUTH_USER',
};

function setAuthUserActionCreator(authUser) {
  return {
    type: ActionType.SET_AUTH_USER,
    payload: {
      authUser,
    },
  };
}

function unsetAuthUserActionCreator() {
  return {
    type: ActionType.UNSET_AUTH_USER,
    payload: {
      authUser: null,
    },
  };
}

function asyncSetAuthUser(email, password) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const { status, token } = await forum.login(email, password);
      forum.setUserToken(token);
      const authUser = await forum.getOwnProfile();
      dispatch(setAuthUserActionCreator(authUser));
      alert(`${status} login`);
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncUnsetAuthUserProcess() {
  return (dispatch) => {
    dispatch(unsetAuthUserActionCreator());
    forum.setUserToken('');
  };
}

export {
  ActionType,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
  asyncSetAuthUser,
  asyncUnsetAuthUserProcess,
};
