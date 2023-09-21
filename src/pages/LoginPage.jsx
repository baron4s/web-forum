import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginInput from '../components/LoginInput';
import { asyncSetAuthUser } from '../states/auth/action';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogin = (email, password) => {
    dispatch(asyncSetAuthUser(email, password));

    navigate('/');
  };

  return (
    <div className="login-page">
      <section className="login-hero">
        <Link to="/">SkuyForum</Link>
      </section>
      <article className="login-main">
        <h2>Selamat Datang Kembali !</h2>
        <LoginInput login={onLogin} />
        <p>
          Don&apos;t have an account ?<Link to="/register">Register</Link>
        </p>
      </article>
    </div>
  );
}

export default LoginPage;
