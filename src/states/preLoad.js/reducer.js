import { ActionType } from './action';

function isPreloadReducer(isPreload = true, action = {}) {
  switch (ActionType.SET_IS_PRELOAD) {
    case action.type:
      return action.payload.isPreload;
    default:
      return isPreload;
  }
}

export default isPreloadReducer;
