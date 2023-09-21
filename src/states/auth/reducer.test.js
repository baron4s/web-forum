import { describe, expect, it } from 'vitest';
import authUserReducer from './reducer';

// test scenario auth useReducer

// -autUser function
// -should return the initial state when given by unknown action
// -should return the authUser when given by SET_AUTH_USER action
// -should return the authUser when given by UNSET_AUTH_USER action

describe('authUserReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    //   arange
    const initialState = null;
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = authUserReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });
  it('should return the authUser when give by SET_AUTH_USER action ', () => {
    //   arange
    const initialState = null;
    const action = {
      type: 'SET_AUTH_USER',
      payload: {
        authUser: {
          id: 'john_doe',
          name: 'John Doe',
          email: 'john@example.com',
          avatar: 'https://generated-image-url.jpg',
        },
      },
    };

    // action
    const nextState = authUserReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.authUser);
  });
  it('should return the authUser when give by UNSET_AUTH_USER action ', () => {
    //   arange
    const initialState = null;
    const action = {
      type: 'UNSET_AUTH_USER',
      payload: {
        authUser: null,
      },
    };

    // action
    const nextState = authUserReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.authUser);
  });
});
