import 'core-js/stable';
import 'regenerator-runtime/runtime';

import SimpleRecipe from './models/SimpleRecipe';
import Recipe from './models/Recipe';
import RecipeView from './views/RecipeView';
import RecipesView from './views/RecipesView';
import PaginationView from './views/PaginationView';
import { API_URL, RECIPES_PER_PAGE } from './config';
import { getHash, getJSON } from './helpers';

const state = {
  recipe: {},
  search: {
    recipes: [],
    page: 1,
  },
};

const loadRecipes = async () => {
  const search = document.querySelector('.search__field').value;
  const data = await getJSON(`${API_URL}?search=${search}`);
  state.search.recipes = Array.from(
    data.data.recipes, (recipe) => new SimpleRecipe(recipe),
  );
  state.search.page = 1;
};

const renderRecipesPage = (page = state.search.page) => {
  const start = (page - 1) * RECIPES_PER_PAGE;
  const end = page * RECIPES_PER_PAGE;
  state.search.page = page;
  RecipesView.render(state.search.recipes.slice(start, end));
  PaginationView.render(state.search);
};

const controlRecipes = async (event) => {
  event.preventDefault();

  try {
    RecipesView.renderSpinner();
    await loadRecipes();
    renderRecipesPage();
  } catch (e) {
    RecipesView.renderError();
  }
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
    const id = getHash();
    if (id) {
      RecipeView.renderSpinner();
      state.recipe = await getRecipe(id);
      RecipeView.render(state.recipe);
    }
  } catch (e) {
    RecipeView.renderError();
  }
};

(() => {
  RecipesView.addHandler(controlRecipes);
  PaginationView.addHandler(renderRecipesPage);
  RecipeView.addHandler(controlRecipe);
})();
