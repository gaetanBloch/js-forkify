import 'core-js/stable';
import 'regenerator-runtime/runtime';

import SimpleRecipe from './models/SimpleRecipe';
import Recipe from './models/Recipe';
import RecipeView from './views/RecipeView';

const API_URL = 'https://forkify-api.herokuapp.com/api/v2/recipes';

const timeout = (seconds) => new Promise((_, reject) => {
  setTimeout(() => {
    reject(new Error(`Request took too long! Timeout after ${seconds} seconds`));
  }, seconds * 1000);
});

// https://forkify-api.herokuapp.com/v2

const getJSON = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) throw new Error(`${data.message} (${res.status})`);
  return data;
};

const getRecipes = async (search) => {
  const data = await getJSON(`${API_URL}?search=${search}`);
  return Array.from(data.data.recipes, (recipe) => new SimpleRecipe(recipe));
};

const getRecipe = async (id) => {
  const data = await getJSON(`${API_URL}/${id}`);
  const { recipe } = data.data;
  return new Recipe(
    recipe,
    recipe.ingredients,
    recipe.servings,
    recipe.source_url,
    recipe.cooking_time,
  );
};

const controlRecipe = async () => {
  try {
    RecipeView.renderMessage();
    const id = window.location.hash?.slice(1) ?? null;
    if (id) {
      RecipeView.renderSpinner();
      const recipe = await getRecipe(id);
      RecipeView.render(recipe);
    }
  } catch (e) {
    RecipeView.renderError();
  }
};

(() => {
  RecipeView.addHandler(controlRecipe);
})();
