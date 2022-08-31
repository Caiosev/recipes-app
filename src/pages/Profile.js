import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../CSS/Profile.css';

function Profile() {
  const { email } = JSON.parse(localStorage.getItem('user'));
  const history = useHistory();
  return (
    <div>
      <Header title="Profile" />
      <p
        data-testid="profile-email"
        className="profile-email"
      >
        Você esta logado como:
        {' '}
        {' '}
        {email}
      </p>
      <div className="wrapper-buttons">
        <button
          onClick={ () => history.push('/favorite-recipes') }
          data-testid="profile-favorite-btn"
          type="button"
          className="btns-profile"
        >
          Favorite Recipes
        </button>
        <button
          onClick={ () => history.push('/done-recipes') }
          data-testid="profile-done-btn"
          type="button"
          className="btns-profile"
        >
          Done Recipes
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => {
            history.push('/');
            localStorage.clear();
          } }
          className="btns-profile"
        >
          Logout
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
