export const retrieveLocalStorage = () => {
  const prevStorage = localStorage.getItem('inProgressRecipes');

  if (prevStorage === null) {
    return { cocktails: {}, meals: {} };
  }

  return JSON.parse(prevStorage);
};

export const saveLocalStorage = (id, ingredient) => {
  const prevStorage = localStorage.getItem('inProgressRecipes');
  const type = id[0] === '5' ? 'meals' : 'cocktails';

  if (prevStorage === null) {
    const recipe = { [id]: [ingredient] };
    const createStorage = { cocktails: {}, meals: {} };
    const startStorage = { ...createStorage, [type]: recipe };

    localStorage.setItem('inProgressRecipes', JSON.stringify(startStorage));
  } else {
    const storage = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const ingredientList = storage[type][id];

    if (ingredientList === undefined) {
      const newStorage = {
        ...storage,
        [type]: {
          ...storage[type],
          [id]: [ingredient],
        },
      };

      localStorage.setItem('inProgressRecipes', JSON.stringify(newStorage));
    }

    if (ingredientList !== undefined && !ingredientList.includes(ingredient)) {
      ingredientList.push(ingredient);

      const newStorage = {
        ...storage,
        [type]: {
          ...storage[type],
          [id]: [...ingredientList],
        },
      };

      localStorage.setItem('inProgressRecipes', JSON.stringify(newStorage));
    }
  }
};

export const removeLocalStorage = (id, ingredient) => {
  const prevStorage = JSON.parse(localStorage.getItem('inProgressRecipes'));

  if (prevStorage === null) {
    return null;
  }

  const type = id[0] === '5' ? 'meals' : 'cocktails';

  const removedStorage = prevStorage[type][id].filter((ing) => ing !== ingredient);

  const newStorage = {
    ...prevStorage,
    [type]: {
      ...prevStorage[type],
      [id]: [...removedStorage],
    },
  };

  localStorage.setItem('inProgressRecipes', JSON.stringify(newStorage));
};
