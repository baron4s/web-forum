import { describe, vi, it, beforeEach, afterEach, expect } from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import asyncPopulateUsersAndThreads from './action';
import forum from '../../utils/api';
import { receiveUsersActionCreator } from '../users/action';
import { receiveAllThreadsActionCreator } from '../threads/action';

const fakeAllUsersResponse = [
  {
    id: 'john_doe',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://generated-image-url.jpg',
  },
];

const fakeAllThreadsResponse = [
  {
    id: 'thread-1',
    title: 'Thread Pertama',
    body: 'Ini adalah thread pertama',
    category: 'General',
    createdAt: '2021-06-21T07:00:00.000Z',
    ownerId: 'users-1',
    upVotesBy: [],
    downVotesBy: [],
    totalComments: 0,
  },
];

const fakeErrorResponse = new Error('Ups ,shomething went wrong');

describe('asyncPopulateUsersAndThreads thunk', () => {
  beforeEach(() => {
    forum._getAllUsers = forum.getAllUsers;
    forum._getAllThreads = forum.getAllThreads;
  });
  afterEach(() => {
    forum.getAllUsers = forum._getAllUsers;
    forum.getAllThreads = forum._getAllThreads;

    delete forum._getAllUsers;
    delete forum._getAllThreads;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arange
    forum.getAllUsers = () => Promise.resolve(fakeAllUsersResponse);
    forum.getAllThreads = () => Promise.resolve(fakeAllThreadsResponse);

    const dispatch = vi.fn();

    // action
    await asyncPopulateUsersAndThreads()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      receiveUsersActionCreator(fakeAllUsersResponse),
    );
    expect(dispatch).toHaveBeenCalledWith(
      receiveAllThreadsActionCreator(fakeAllThreadsResponse),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action correctly when data fetching failed', async () => {
    // arange
    forum.getAllUsers = () => Promise.reject(fakeErrorResponse);
    forum.getAllThreads = () => Promise.reject(fakeErrorResponse);

    const dispatch = vi.fn();
    window.alert = vi.fn();

    // action
    await asyncPopulateUsersAndThreads()(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
