// -RegisterInput
//   -should handle name typing correctly
//   -should handle email typing correctly
//   -should handle password typing correctly
//   -should call register function when submit button is clicked

import React from 'react';
import { describe, it, expect, afterEach, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import * as matchers from '@testing-library/jest-dom/matchers';
import RegisterInput from './RegisterInput';

expect.extend(matchers);

describe('RegisterInput Component', () => {
  afterEach(() => {
    cleanup();
  });
  it('should handle name typing correctly', async () => {
    // Arrange
    render(<RegisterInput register={() => {}} />);
    const nameInput = await screen.getByPlaceholderText('name');

    // Action
    await userEvent.type(nameInput, 'roni');

    // Assert
    expect(nameInput).toHaveValue('roni');
  });
  it('should handle email typing correctly', async () => {
    // arrange
    render(<RegisterInput register={() => {}} />);
    const emailInput = await screen.getByPlaceholderText('example@gmail.com');

    // Action
    await userEvent.type(emailInput, 'roni@gmail.com');

    // Assert
    expect(emailInput).toHaveValue('roni@gmail.com');
  });
  it('should handle password typing correctly', async () => {
    // arrange
    render(<RegisterInput register={() => {}} />);
    const passwordInput = await screen.getByPlaceholderText('Password');

    // Action
    await userEvent.type(passwordInput, 'test123');

    // Assert
    expect(passwordInput).toHaveValue('test123');
  });
  it('should call register function when submit button is clicked', async () => {
    // arrange
    const mockRegister = vi.fn();
    render(<RegisterInput register={mockRegister} />);
    const nameInput = await screen.getByPlaceholderText('name');
    await userEvent.type(nameInput, 'roni');
    const emailInput = await screen.getByPlaceholderText('example@gmail.com');
    await userEvent.type(emailInput, 'roni@gmail.com');
    const passwordInput = await screen.getByPlaceholderText('Password');
    await userEvent.type(passwordInput, 'test123');
    const registerButton = await screen.getByRole('button', {
      name: 'Register',
    });

    // action
    await userEvent.click(registerButton);

    // assert
    expect(mockRegister).toBeCalledWith({
      email: 'roni@gmail.com',
      name: 'roni',
      password: 'test123',
    });
  });
});
