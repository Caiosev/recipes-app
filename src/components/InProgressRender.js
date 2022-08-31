import React, { useState } from 'react';
import Copy from 'clipboard-copy';
import { useLocation, useHistory } from 'react-router-dom';
import ShareIcon from '../images/shareIcon.svg';

import {
  DRINK_RENDER_CHECKBOX, FOOD_RENDER_CHECKBOX,
  PATHNAME_SLICE_FOOD, PATHNAME_SLICE_DRINK,
} from '../helpers/magicNumbers';
import { removeLocalStorage, saveLocalStorage } from '../helpers/localStorage';

function InProgressRender(params) {
  const { id, fetchedRecipe } = params;
  const type = id[0] === '1' ? 'drinks' : 'foods';
  const data = new Date();
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const history = useHistory();
  const location = useLocation();
  const [buttonState, setbuttonState] = useState(true);

  const handleDone = () => {
    const obj = {
      id,
      type: type === 'foods' ? 'food' : 'drink',
      nationality: type === 'foods' ? fetchedRecipe.meals[0].strArea : '',
      category: type === 'foods'
        ? fetchedRecipe.meals[0].strCategory : fetchedRecipe.drinks[0].strCategory,
      alcoholicOrNot: type === 'foods' ? '' : 'Alcoholic',
      name: type === 'foods'
        ? fetchedRecipe.meals[0].strMeal : fetchedRecipe.drinks[0].strDrink,
      image: type === 'foods'
        ? fetchedRecipe.meals[0].strMealThumb : fetchedRecipe.drinks[0].strDrinkThumb,
      doneData: `${data.getDay()}/${data.getMonth()}/${data.getFullYear()}`,
      tags: type === 'foods' ? [fetchedRecipe.meals[0].strCategory]
        : [fetchedRecipe.drinks[0].strCategory],
    };
    const newArr = Object.keys(doneRecipes[0]).length === 0
      ? [obj] : [...doneRecipes, obj];
    localStorage.setItem('doneRecipes', JSON.stringify(newArr));
    history.push('/done-recipes');
  };

  const handleChecked = () => {
    if (id[0] === '5' && fetchedRecipe) {
      const allCheckeds = document.querySelectorAll('input[type="checkbox"]').length;
      const food = JSON.parse(localStorage.getItem('inProgressRecipes')).meals[id].length;
      if (food === allCheckeds) {
        setbuttonState(false);
      } else {
        setbuttonState(true);
      }
    } else if (id[0] === '1' && fetchedRecipe) {
      const allCheckeds = document.querySelectorAll('input[type="checkbox"]').length;
      const drinks = JSON.parse(localStorage
        .getItem('inProgressRecipes')).cocktails[id].length;
      if (drinks === allCheckeds) {
        setbuttonState(false);
      } else {
        setbuttonState(true);
      }
    }
  };

  const checkboxClick = ({ target }, ingredient) => {
    if (target.checked) {
      saveLocalStorage(id, ingredient);
    }
    if (!target.checked) {
      removeLocalStorage(id, ingredient);
    }
    handleChecked();
  };

  const handleShareButton = ({ target }) => {
    if (id[0] === '5') {
      const pathname = location.pathname.slice(0, PATHNAME_SLICE_FOOD);
      Copy(`http://localhost:3000${pathname}`);
    }
    if (id[0] === '1') {
      const pathname = location.pathname.slice(0, PATHNAME_SLICE_DRINK);
      Copy(`http://localhost:3000${pathname}`);
    }
    target.innerHTML = 'Link copied!';
  };

  const renderRecipe = () => {
    if (id[0] === '5' && fetchedRecipe) {
      const food = fetchedRecipe.meals[0];

      return (
        <div id="recipe-in-progress-card">
          <div
            className="recipe-header-img"
            style={ {
              backgroundImage: `url(${food.strMealThumb})`,
            } }
          />
          <h3 data-testid="recipe-title" className="recipe-title-page">{food.strMeal}</h3>
          <div className="wrapper-info">
            <h4
              data-testid="recipe-category"
              className="recipe-category-page"
            >
              {food.strCategory}

            </h4>
            <button
              type="button"
              data-testid="share-btn"
              onClick={ (button) => handleShareButton(button) }
            >
              <img src={ ShareIcon } alt="" srcSet="" />
            </button>
          </div>
          {
            Array.from({ length: FOOD_RENDER_CHECKBOX }, (i, index) => {
              const ing = `strIngredient${JSON.stringify(index + 1)}`;
              if (food[ing] !== '' && food[ing] !== null) {
                return (
                  <div key={ index } className="ingredient-card-page">
                    <label
                      htmlFor={ `${food[ing]}-ingredient-step` }
                      data-testid={ `${index}-ingredient-step` }
                    >
                      <input
                        type="checkbox"
                        id={ `${food[ing]}-ingredient-step` }
                        onClick={ (button) => {
                          checkboxClick(button, food[ing]);
                        } }
                      />
                      {food[ing]}
                    </label>
                  </div>
                );
              }
              return null;
            })
          }
          <p
            data-testid="instructions"
            className="instructions-page"
          >
            {food.strInstructions}

          </p>
          <div className="btn-finish">
            <button
              type="button"
              data-testid="finish-recipe-btn"
              disabled={ buttonState }
              onClick={ () => {
                history.push('/done-recipes');
                handleDone();
              } }

            >
              Finish Recipe
            </button>
          </div>
        </div>
      );
    }
    if (id[0] === '1' && fetchedRecipe) {
      const drink = fetchedRecipe.drinks[0];

      return (
        <div id="recipe-in-progress-card">
          <div
            className="recipe-header-img"
            style={ {
              backgroundImage: `url(${drink.strDrinkThumb})`,
            } }
          />
          <h3
            data-testid="recipe-title"
            className="recipe-title-page"
          >
            {drink.strDrink}
          </h3>
          <div className="wrapper-info">
            <h4
              data-testid="recipe-category"
              className="recipe-category-page"
            >
              {drink.strCategory}
            </h4>
            <button
              type="button"
              data-testid="share-btn"
              onClick={ (button) => handleShareButton(button) }
            >
              <img src={ ShareIcon } alt="" srcSet="" />
            </button>
          </div>
          {Array.from({ length: DRINK_RENDER_CHECKBOX }, (i, index) => {
            const ing = `strIngredient${JSON.stringify(index + 1)}`;
            if (drink[ing] !== null && drink[ing] !== '') {
              return (
                <div key={ index } className="ingredient-card-page">
                  <label
                    htmlFor={ `${drink[ing]}-ingredient-step` }
                    data-testid={ `${index}-ingredient-step` }
                  >
                    <input
                      type="checkbox"
                      id={ `${drink[ing]}-ingredient-step` }
                      onClick={ (button) => checkboxClick(button, drink[ing]) }
                    />
                    {drink[ing]}
                  </label>
                </div>
              );
            }
            return null;
          })}
          <p
            data-testid="instructions"
            className="instructions-page"
          >
            {drink.strInstructions}
          </p>
          <div className="btn-finish">
            <button
              type="button"
              data-testid="finish-recipe-btn"
              disabled={ buttonState }
              onClick={ () => {
                history.push('/done-recipes');
                handleDone();
              } }
            >
              Finish Recipe
            </button>
          </div>
        </div>
      );
    }
    return (
      <p>Carregando...</p>
    );
  };
  return (
    <div>
      {renderRecipe()}
    </div>
  );
}

export default InProgressRender;
