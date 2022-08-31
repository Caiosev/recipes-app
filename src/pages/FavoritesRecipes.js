import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import ShareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

function FavoritesRecipes() {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const history = useHistory();
  const [copyLink, setCopyLink] = useState(false);
  const [filter, setFilter] = useState('All');
  const [filtredArray, setFiltredArray] = useState([...favoriteRecipes]);

  console.log(favoriteRecipes);

  const notFav = (id) => {
    const newArr = favoriteRecipes.filter((e) => e.id !== id);
    if (newArr.length === 0) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
      setFiltredArray([...newArr]);
      return;
    }
    localStorage.setItem('favoriteRecipes', JSON.stringify(newArr));
    setFiltredArray([...newArr]);
  };

  const handleFav = (id) => {
    // if (!isFavorite) {
    //   const obj = {
    //     id,
    //     type: type === 'foods' ? 'food' : 'drink',
    //     nationality: type === 'foods' ? recipe.meals[0].strArea : '',
    //     category: type === 'foods'
    //       ? recipe.meals[0].strCategory : recipe.drinks[0].strCategory,
    //     alcoholicOrNot: type === 'foods' ? '' : 'Alcoholic',
    //     name: type === 'foods' ? recipe.meals[0].strMeal : recipe.drinks[0].strDrink,
    //     image: type === 'foods'
    //       ? recipe.meals[0].strMealThumb : recipe.drinks[0].strDrinkThumb,
    //   };
    //   const newArr = Object.keys(favoriteRecipes[0]).length === 0
    //     ? [obj] : [...favoriteRecipes, obj];
    //   localStorage.setItem('favoriteRecipes', JSON.stringify(newArr));
    //   setIsFavorite(true);
    //   return;
    // }
    notFav(id);
  };

  useEffect(() => {
    switch (filter) {
    case 'All':
      setFiltredArray([...favoriteRecipes]);
      break;
    case 'Food':
      setFiltredArray(favoriteRecipes.filter((e) => e.type === 'food'));
      break;
    case 'Drink':
      setFiltredArray(favoriteRecipes.filter((e) => e.type === 'drink'));
      break;
    default:
      break;
    }
  }, [filter]);

  console.log(filtredArray);

  const redirect = (id, category) => {
    history.push(`/${category}s/${id}`);
  };
  return (
    <div>
      <Header title="Done Recipes" />
      <div className="">
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
      {filtredArray.length > 0 && filtredArray.map((recipe, i) => (
        <div className="" key={ recipe.id }>
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
              data-testid={ `${i}-horizontal-image` }
            />
          </div>
          {recipe.type === 'food'
            ? (
              <h1
                data-testid={ `${i}-horizontal-top-text` }
              >
                {`${recipe.nationality} - ${recipe.category}`}

              </h1>)
            : (
              <h1
                data-testid={ `${i}-horizontal-top-text` }
              >
                {`${recipe.alcoholicOrNot}`}
              </h1>)}
          <div
            className=""
            onClick={ () => redirect(recipe.id, recipe.type) }
            role="button"
            onKeyDown={ () => redirect(recipe.id, recipe.type) }
            tabIndex={ 0 }
          >
            <h3
              data-testid={ `${i}-horizontal-name` }

            >
              {recipe.name}
            </h3>
          </div>
          <h5 data-testid={ `${i}-horizontal-done-date` }>{recipe.doneDate}</h5>
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
          {/* {recipe.tags.map(
            (tag, index) => index <= 2 && (
              <p
                data-testid={`${i}-${tag}-horizontal-tag`}
                key={tag}
              >
                {tag}
              </p>),
          )} */}
          {copyLink && <p>Link copied!</p>}
          <button type="button" onClick={ () => handleFav(recipe.id) }>
            <img
              data-testid={ `${i}-horizontal-favorite-btn` }
              src={ blackHeartIcon }
              alt=""
            />
          </button>
        </div>
      ))}
    </div>
  );
}

export default FavoritesRecipes;
