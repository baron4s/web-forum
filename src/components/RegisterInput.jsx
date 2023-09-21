import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

function RegisterInput({ register }) {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  return (
    <div className="register-input">
      <form>
        <div className="name-input">
          <p>Name</p>
          <input
            type="text"
            value={name}
            onChange={onNameChange}
            required
            placeholder="name"
          />
        </div>
        <div className="email-input">
          <p>Email</p>
          <input
            type="email"
            value={email}
            onChange={onEmailChange}
            required
            placeholder="example@gmail.com"
          />
        </div>
        <div className="password-input">
          <p>Email</p>
          <input
            type="password"
            value={password}
            onChange={onPasswordChange}
            required
            placeholder="Password"
          />
        </div>
        <button
          type="button"
          onClick={() => register({ name, email, password })}
        >
          Register
        </button>
      </form>
    </div>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;
