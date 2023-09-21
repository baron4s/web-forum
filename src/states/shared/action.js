import { hideLoading, showLoading } from 'react-redux-loading-bar';
import forum from '../../utils/api';
import { receiveAllThreadsActionCreator } from '../threads/action';
import { receiveUsersActionCreator } from '../users/action';

function asyncPopulateUsersAndThreads() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const users = await forum.getAllUsers();
      const threads = await forum.getAllThreads();

      dispatch(receiveUsersActionCreator(users));
      dispatch(receiveAllThreadsActionCreator(threads));
    } catch (error) {
      window.alert(error);
    }
    dispatch(hideLoading());
  };
}

export default asyncPopulateUsersAndThreads;
