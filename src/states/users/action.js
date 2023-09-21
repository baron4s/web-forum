import forum from '../../utils/api';

const ActionType = {
  RECEIVE_USERS: 'RECEIVE_USERS',
};

function receiveUsersActionCreator(users) {
  return {
    type: ActionType.RECEIVE_USERS,
    payload: {
      users,
    },
  };
}

function asyncRegisterUser(name, email, password) {
  return async () => {
    try {
      const { message } = await forum.register(name, email, password);
      alert(message);
    } catch (error) {
      alert(error);
    }
  };
}

export { ActionType, receiveUsersActionCreator, asyncRegisterUser };
