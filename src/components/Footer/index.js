import React from 'react';
import { useHistory } from 'react-router-dom';
import DrinkIcon from '../../images/drinkIcon.svg';
import MealIcon from '../../images/mealIcon.svg';
import './style.css';

export default function Footer() {
  const history = useHistory();
  return (
    <footer data-testid="footer" className="footer">
      <div
        className="drink"
        onClick={ () => history.push('/drinks') }
        onKeyDown={ () => history.push('/drinks') }
        role="button"
        tabIndex={ 0 }
      >
        <img
          src={ DrinkIcon }
          data-testid="drinks-bottom-btn"
          alt="drink-icon"
        />
      </div>
      <div
        className="meal"
        onClick={ () => history.push('/foods') }
        onKeyDown={ () => history.push('/foods') }
        role="button"
        tabIndex={ 0 }
      >
        <img
          src={ MealIcon }
          data-testid="food-bottom-btn"
          alt="meal-icon"
        />
      </div>
    </footer>
  );
}
