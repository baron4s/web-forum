import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

function LoginInput({ login }) {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  return (
    <div className="login-input">
      <form>
        <div className="email-input">
          <p>Email</p>
          <input
            type="email"
            onChange={onEmailChange}
            placeholder="example@gmail.com"
            value={email}
            required
          />
        </div>
        <div className="password-input">
          <p>Password</p>
          <input
            type="password"
            onChange={onPasswordChange}
            placeholder="Your password"
            value={password}
            required
          />
        </div>
        <button type="button" onClick={() => login(email, password)}>
          Login
        </button>
      </form>
    </div>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;
