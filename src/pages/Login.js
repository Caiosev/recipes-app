import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { MIN_PASSWORD_LENGTH } from '../helpers/magicNumbers';
import '../CSS/Login.css';
import Ilustration from '../images/loginImage.svg';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function check() {
    const regexEmail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const ok = regexEmail.test(email) && password.length > MIN_PASSWORD_LENGTH;
    return !ok;
  }

  function handleClick() {
    const obj = { email };
    localStorage.setItem('user', JSON.stringify(obj));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
  }
  return (
    <main id="login-page">
      <div className="image-head">
        <img src={ Ilustration } alt="" />
      </div>
      <div className="text">
        <h1>Faltando pouco para matar sua fome!</h1>
        <h2>Faça o Login</h2>
      </div>
      <form id="login-form">
        <label htmlFor="email">
          {' '}
          <br />
          <input
            id="email"
            placeholder="Email"
            value={ email }
            type="email"
            required
            onChange={ (e) => setEmail(e.target.value) }
            data-testid="email-input"
          />
        </label>
        <label htmlFor="password">
          {' '}
          <br />
          <input
            type="password"
            value={ password }
            placeholder="Senha"
            onChange={ (e) => setPassword(e.target.value) }
            data-testid="password-input"
            required
          />
        </label>
        <Link to="/foods">
          <button
            type="button"
            disabled={ check() }
            data-testid="login-submit-btn"
            onClick={ handleClick }
            className="btnLogin"
          >
            <AiOutlineCheckCircle
              size={ 32 }
              color={ !check() && '#269A70' }
            />
          </button>
        </Link>
      </form>
    </main>
  );
}

export default Login;
