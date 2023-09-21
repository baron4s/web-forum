import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import forum from '../../utils/api';
import {
  asyncToggleUpVoteDetailThreadProcess,
  upVoteDetailThreadActionCreator,
} from './action';

const detailThread = {
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
};

const authUser = {
  id: 'john_doe',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://generated-image-url.jpg',
};

const fakeNeutrallizeResponse = {
  vote: {
    id: 'vote-1',
    userId: 'users-1',
    threadId: 'thread-1',
    voteType: 0,
  },
};

const fakeUpVoteThreadResponse = {
  vote: {
    id: 'vote-1',
    userId: 'users-1',
    threadId: 'thread-1',
    voteType: 1,
  },
};

const fakeErrorResponse = new Error('Ups ,shomething went wrong');

describe('asyncToggleUpVoteDetailThreadProcess', () => {
  beforeEach(() => {
    forum._upVoteThread = forum.upVoteThread;
    forum._neutraLizeVoteThread = forum.neutraLizeVoteThread;
  });
  afterEach(() => {
    forum.upVoteThread = forum._upVoteThread;
    forum.neutraLizeVoteThread = forum._neutraLizeVoteThread;

    delete forum._upVoteThread;
    delete forum._neutraLizeVoteThread;
  });

  it('should dispatch upVoteDetailThreadActionCreator when user is authenticated', async () => {
    //   arrange
    const getState = vi.fn(() => ({
      detailThread,
      authUser,
    }));

    const dispatch = vi.fn();

    forum.upVoteThread = () => Promise.resolve(fakeUpVoteThreadResponse);
    forum.neutraLizeVoteThread = () => Promise.resolve(fakeNeutrallizeResponse);

    // action
    await asyncToggleUpVoteDetailThreadProcess()(dispatch, getState);

    // assert
    expect(dispatch).toBeCalledWith(
      upVoteDetailThreadActionCreator(authUser.id),
    );
  });

  it('should dispatch action correctly when data fetching failed ', async () => {
    const getState = vi.fn(() => ({
      detailThread,
      authUser,
    }));

    const dispatch = vi.fn();
    window.alert = vi.fn();

    forum.upVoteThread = () => Promise.reject(fakeErrorResponse);
    forum.neutraLizeVoteThread = () => Promise.reject(fakeErrorResponse);

    // action
    await asyncToggleUpVoteDetailThreadProcess()(dispatch, getState);

    // assert
    expect(window.alert).toBeCalledWith(fakeErrorResponse);
    expect(dispatch).toBeCalledWith(
      upVoteDetailThreadActionCreator(authUser.id),
    );
  });

  it('should display an alert when user is not authenticated ', async () => {
    //   arrange
    const getState = vi.fn(() => ({
      detailThread,
      authUser: null,
    }));

    const dispatch = vi.fn();

    window.alert = vi.fn();

    // action
    await asyncToggleUpVoteDetailThreadProcess()(dispatch, getState);

    // assert
    expect(window.alert).toBeCalledWith('Login terlebih dahulu');
  });
});
