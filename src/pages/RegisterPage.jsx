import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import RegisterInput from '../components/RegisterInput';
import { asyncRegisterUser } from '../states/users/action';

function RegisterPage() {
  const dispatch = useDispatch();

  const onRegister = ({ name, email, password }) => {
    dispatch(asyncRegisterUser(name, email, password));
  };

  return (
    <div className="register-page">
      <section className="register-hero">
        <Link to="/">SkuyForum</Link>
      </section>
      <article className="register-main">
        <h2>Daftar Dan Bergabunglah Dengan Komintas Kami !</h2>
        <RegisterInput register={onRegister} />
        <p>
          Already have an account ? <Link to="/login">Login</Link>
        </p>
      </article>
    </div>
  );
}

export default RegisterPage;
