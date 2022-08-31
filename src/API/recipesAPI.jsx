export const fetchContent = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export const fetchRecipes = async (type) => {
  if (type === 'Food') {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    return data;
  }
  if (type === 'Drink') {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    return data;
  }
};

export const fetchCategory = async (type) => {
  if (type === 'Food') {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
    const data = await response.json();
    return data;
  }
  if (type === 'Drink') {
    const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
    const data = await response.json();
    return data;
  }
};

export const fetchContentWithCategory = async (type, item) => {
  if (type === 'Food') {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${item}`);
    const data = await response.json();
    return data;
  }
  if (type === 'Drink') {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${item}`);
    const data = await response.json();
    return data;
  }
};

export const fetchRecipeInProgress = async (type, item) => {
  if (type === 'Food') {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${item}`);
    const data = await response.json();
    return data;
  }
  if (type === 'Drink') {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${item}`);
    const data = await response.json();
    return data;
  }
};
