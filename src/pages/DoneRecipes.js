import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import ShareIcon from '../images/shareIcon.svg';
import '../CSS/Done.css';

const copy = require('clipboard-copy');

function DoneRecipes() {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const history = useHistory();
  const [copyLink, setCopyLink] = useState(false);
  const [filter, setFilter] = useState('All');
  const [filtredArray, setFiltredArray] = useState([...doneRecipes]);

  useEffect(() => {
    switch (filter) {
    case 'All':
      setFiltredArray([...doneRecipes]);
      break;
    case 'Food':
      setFiltredArray(doneRecipes.filter((e) => e.type === 'food'));
      break;
    case 'Drink':
      setFiltredArray(doneRecipes.filter((e) => e.type === 'drink'));
      break;
    default:
      break;
    }
  }, [filter]);

  const redirect = (id, category) => {
    history.push(`/${category}s/${id}`);
  };
  return (
    <div>
      <Header title="Done Recipes" />
      <div className="wrapper-done-btn">
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setFilter('All') }
        >
          All

        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => setFilter('Food') }
        >
          Food

        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => setFilter('Drink') }
        >
          Drinks
        </button>
      </div>
      <div className="cards-wrapper">
        {filtredArray.length > 0 && filtredArray.map((recipe, i) => (
          <div className="" key={ recipe.id } className="card-done">
            <div
              className=""
              onClick={ () => redirect(recipe.id, recipe.type) }
              role="button"
              onKeyDown={ () => redirect(recipe.id, recipe.type) }
              tabIndex={ 0 }
            >
              <img
                src={ recipe.image }
                style={ { width: '250px' } }
                alt=""
                className="card-image-done"
                data-testid={ `${i}-horizontal-image` }
              />
            </div>
            {recipe.type === 'food'
              ? (
                <h3
                  data-testid={ `${i}-horizontal-top-text` }
                >
                  {`${recipe.nationality} ${recipe.category}`}

                </h3>)
              : (
                <h3
                  data-testid={ `${i}-horizontal-top-text` }
                >
                  {`${recipe.alcoholicOrNot}`}
                </h3>)}
            <div
              className="done-name"
              onClick={ () => redirect(recipe.id, recipe.type) }
              role="button"
              onKeyDown={ () => redirect(recipe.id, recipe.type) }
              tabIndex={ 0 }
            >
              <h1
                data-testid={ `${i}-horizontal-name` }

              >
                {recipe.name}
              </h1>

            </div>
            {recipe.tags.map(
              (tag, index) => index <= 2 && (
                <p
                  data-testid={ `${i}-${tag}-horizontal-tag` }
                  key={ tag }
                  className="recipe-category-page"
                >
                  {tag}
                </p>),
            )}
            <h5 data-testid={ `${i}-horizontal-done-date` }>{recipe.doneData}</h5>
            <button
              type="button"
              onClick={ () => { setCopyLink(true); copy(`http://localhost:3000/${recipe.type === 'food' ? 'foods' : 'drinks'}/${recipe.id}`); } }
            >
              <img
                src={ ShareIcon }
                data-testid={ `${i}-horizontal-share-btn` }
                alt=""
                srcSet=""
              />
            </button>
            {copyLink && <p>Link copied!</p>}
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
}

export default DoneRecipes;
