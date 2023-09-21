// test scenario detailThread useReducer

// -detailThreadReducer function
// -should return inital state when given by unknown action
// -should handle RECEIVE_DETAIL_THREAD action
// -should handle UP_VOTE_THREAD_DETAIL action
// -should handle DOWN_VOTE_THREAD_DETAIL action
// -should handle UP_VOTE_THEAD_DETAIL_COMMENTS action
// -should handle DOWN_VOTE_THEAD_DETAIL_COMMENTS action

import { describe, it, expect } from 'vitest';
import detailThreadReducer from './reducer';

describe('detailThreadReducer function', () => {
  it('should return inital state when given by unknown action', () => {
    // arange
    const initalState = null;
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = detailThreadReducer(initalState, action);

    // assert
    expect(nextState).toEqual(initalState);
  });
  it('should handle RECEIVE_DETAIL_THREAD action', () => {
    // arange
    const initalState = null;
    const action = {
      type: 'RECEIVE_DETAIL_THREAD',
      payload: {
        detailThread: {
          id: 'thread-1',
          title: 'Thread Pertama',
          body: 'Ini adalah thread pertama',
          category: 'General',
          createdAt: '2021-06-21T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
          comments: [
            {
              id: 'comment-1',
              content: 'Ini adalah komentar pertama',
              createdAt: '2021-06-21T07:00:00.000Z',
              owner: {
                id: 'users-1',
                name: 'John Doe',
                avatar: 'https://generated-image-url.jpg',
              },
              upVotesBy: [],
              downVotesBy: [],
            },
          ],
        },
      },
    };

    // action
    const nextState = detailThreadReducer(initalState, action);

    // assert
    expect(nextState).toEqual(action.payload.detailThread);
  });

  it('should handle UP_VOTE_THREAD_DETAIL action', () => {
    //   arange
    const initalState = {
      upVotesBy: ['john_doe'],
      downVotesBy: ['bud_i'],
    };
    const action = {
      type: 'UP_VOTE_THREAD_DETAIL',
      payload: {
        userId: 'john_doe',
      },
    };

    // action
    const nextState = detailThreadReducer(initalState, action);

    // assert
    expect(nextState.upVotesBy).not.toContain(action.payload.userId);
    expect(nextState.downVotesBy).not.toContain(action.payload.userId);
  });

  it('should handle DOWN_VOTE_THREAD_DETAIL action', () => {
    //   arange
    const initalState = {
      upVotesBy: ['bud_i'],
      downVotesBy: ['john_doe'],
    };
    const action = {
      type: 'DOWN_VOTE_THREAD_DETAIL',
      payload: {
        userId: 'john_doe',
      },
    };

    // action
    const nextState = detailThreadReducer(initalState, action);

    // assert
    expect(nextState.downVotesBy).not.toContain(action.payload.userId);
    expect(nextState.upVotesBy).not.toContain(action.payload.userId);
  });

  it('should handle UP_VOTE_THEAD_DETAIL_COMMENTS action', () => {
    //   arange
    const initialState = {
      comments: [
        {
          id: 'comment-1',
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    };
    const action = {
      type: 'UP_VOTE_THEAD_DETAIL_COMMENTS',
      payload: {
        commentId: 'comment-1',
        userId: 'john_doe',
      },
    };

    // action
    const nextState = detailThreadReducer(initialState, action);
    const updatedComment = nextState.comments.find(
      (comment) => comment.id === action.payload.commentId,
    );

    // assert
    expect(updatedComment.upVotesBy).not.toContain(action.payload.userId);
    expect(updatedComment.downVotesBy).not.toContain(action.payload.userId);
  });
  it('should handle DOWN_VOTE_THEAD_DETAIL_COMMENTS action', () => {
    //   arange
    const initialState = {
      comments: [
        {
          id: 'comment-1',
          upVotesBy: [],
          downVotesBy: [],
        },
      ],
    };
    const action = {
      type: 'DOWN_VOTE_THEAD_DETAIL_COMMENTS',
      payload: {
        commentId: 'comment-1',
        userId: 'john_doe',
      },
    };

    // action
    const nextState = detailThreadReducer(initialState, action);
    const updatedComment = nextState.comments.find(
      (comment) => comment.id === action.payload.commentId,
    );

    // assert
    expect(updatedComment.downVotesBy).not.toContain(action.payload.userId);
    expect(updatedComment.upVotesBy).not.toContain(action.payload.userId);
  });
});
