// -CreateDiscussion component
//   -should handle title typing correctly
//   -should handle category typing correctly
//   -should handle discussion typing correctly
//   -should call function handlerOnSubmit when create-button is clicked

import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import CreateDiscussion from './CreateDiscussion';

expect.extend(matchers);
afterEach(() => {
  cleanup();
});
describe('CreateDiscussion component', () => {
  it('should handle title typing correctly', async () => {
    // arrange
    render(
      <Router>
        <CreateDiscussion createThread={() => {}} />
      </Router>,
    );
    const titleInput = await screen.getByPlaceholderText('title discussion');

    // action
    await userEvent.type(titleInput, 'redux');

    // assert
    expect(titleInput).toHaveValue('redux');
  });
  it('should handle category typing correctly', async () => {
    // arrange
    render(
      <Router>
        <CreateDiscussion createThread={() => {}} />
      </Router>,
    );
    const categoryInput = await screen.getByPlaceholderText('category');

    // action
    await userEvent.type(categoryInput, 'redux');

    // assert
    expect(categoryInput).toHaveValue('redux');
  });

  it('should handle discussion typing correctly', async () => {
    // arrange
    render(
      <Router>
        <CreateDiscussion createThread={() => {}} />
      </Router>,
    );
    const discussionInput = await screen.getByPlaceholderText(
      'Type discussion here',
    );

    // action
    await userEvent.type(
      discussionInput,
      'bagaimana pendapat kamu tentang redux?',
    );

    // assert
    expect(discussionInput).toHaveValue(
      'bagaimana pendapat kamu tentang redux?',
    );
  });
  it('should call function handlerOnSubmit when create-button is clicked', async () => {
    // arrange
    const mockCreateThread = vi.fn();
    render(
      <Router>
        <CreateDiscussion createThread={mockCreateThread} />
      </Router>,
    );
    const titleInput = await screen.getByPlaceholderText('title discussion');
    await userEvent.type(titleInput, 'redux');
    const categoryInput = await screen.getByPlaceholderText('category');
    await userEvent.type(categoryInput, 'redux');
    const discussionInput = await screen.getByPlaceholderText(
      'Type discussion here',
    );
    await userEvent.type(
      discussionInput,
      'bagaimana pendapat kamu tentang redux?',
    );
    const buttonCreate = await screen.getByRole('button', { name: 'Create' });

    // action
    await userEvent.click(buttonCreate);
    // assert
    expect(mockCreateThread).toHaveBeenCalledWith(
      'redux',
      'bagaimana pendapat kamu tentang redux?',
      'redux',
    );
  });
});
