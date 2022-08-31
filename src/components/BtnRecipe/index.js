import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import '../../CSS/Details.css';

export default function BtnRecipe({ doneRecipes, id, isInProgress }) {
  const history = useHistory();
  console.log(doneRecipes);
  return (
    <div className="btn-recipe">
      {doneRecipes !== null && !doneRecipes.some((e) => e.id === id)
        && (
          <button
            data-testid="start-recipe-btn"
            type="button"
            onClick={ () => history.push(`${id}/in-progress`) }
          >
            {isInProgress === true ? 'Continue Recipe' : 'Start Recipe'}
          </button>
        )}
    </div>
  );
}

BtnRecipe.propTypes = {
  doneRecipes: PropTypes.array,
  id: PropTypes.number,
  isInProgress: PropTypes.bool,
}.isRequired;
