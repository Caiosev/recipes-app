import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchContent } from '../API/recipesAPI';
import { Context } from '../context/Provider';

const StringSearchIngredient = 'search-ingredient';
function SearchBar({ type, showSearch }) {
  const [searchValue, setSearchValue] = useState('');
  const [radioValue, setRadioValue] = useState(StringSearchIngredient);
  const { setContent, content } = useContext(Context);
  const history = useHistory();

  const submitFood = async () => {
    if (radioValue === StringSearchIngredient) {
      const API = await fetchContent(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchValue}`);
      setContent(API);
    }

    if (radioValue === 'search-name') {
      const API = await fetchContent(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`);
      setContent(API);
    }

    if (radioValue === 'search-first-letter') {
      if (searchValue.length > 1) {
        return global.alert('Your search must have only 1 (one) character');
      }
      const API = await fetchContent(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchValue}`);
      setContent(API);
    }
  };

  const submitDrinks = async () => {
    if (radioValue === StringSearchIngredient) {
      const API = await fetchContent(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchValue}`);
      setContent(API);
    }

    if (radioValue === 'search-name') {
      const API = await fetchContent(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchValue}`);
      setContent(API);
    }

    if (radioValue === 'search-first-letter') {
      if (searchValue.length > 1) {
        return global.alert('Your search must have only 1 (one) character');
      }
      const API = await fetchContent(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchValue}`);
      setContent(API);
    }
  };

  useEffect(() => {
    const handleOneContent = () => {
      if (type === 'Foods' && content.meals
        && content.meals !== null && content.meals.length === 1) {
        history.push(`/foods/${content.meals[0].idMeal}`);
        setContent({});
      }

      if (type === 'Drinks' && content.drinks
        && content.drinks !== null && content.drinks.length === 1) {
        history.push(`/drinks/${content.drinks[0].idDrink}`);
        setContent({});
      }

      console.log(content);
      console.log(content[Object.keys(content)]);

      if (content[Object.keys(content)[0]] === null) {
        global.alert('Sorry, we haven\'t found any recipes for these filters.');
      }
    };

    handleOneContent();
  }, [content, type]);

  const handleSearch = ({ target }) => {
    setSearchValue(target.value);
  };

  const handleRadio = ({ target }) => {
    setRadioValue(target.value);
  };

  const handleSubmit = async () => {
    if (type === 'Foods') {
      submitFood();
    }

    if (type === 'Drinks') {
      submitDrinks();
    }
  };

  return (
    <div className={ `searchbar ${showSearch && 'ativo'}` }>
      <form className="searchform">
        <input
          type="text"
          data-testid="search-input"
          onChange={ handleSearch }
          id="searchbar"
        />
        <div className="search-options">
          <label htmlFor="search-radio1">
            <input
              type="radio"
              id="search-radio1"
              name="search-radio"
              value={ StringSearchIngredient }
              data-testid="ingredient-search-radio"
              onClick={ handleRadio }
              defaultChecked
            />
            Ingredient
          </label>

          <br />

          <label htmlFor="search-radio2">
            <input
              type="radio"
              id="search-radio2"
              name="search-radio"
              value="search-name"
              data-testid="name-search-radio"
              onClick={ handleRadio }
            />
            Name
          </label>

          <br />

          <label htmlFor="search-radio3">
            <input
              type="radio"
              id="search-radio3"
              name="search-radio"
              value="search-first-letter"
              data-testid="first-letter-search-radio"
              onClick={ handleRadio }
            />
            Primeira Letra
          </label>

          <br />
        </div>
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ handleSubmit }
          id="btnsearch"
        >
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchBar;

SearchBar.propTypes = {
  type: PropTypes.string,
  showSearch: PropTypes.string,
}.isRequired;
