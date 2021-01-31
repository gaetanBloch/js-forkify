import SimpleRecipe from './model/simpleRecipe';
import Recipe from './model/recipe';

const recipeContainer = document.querySelector('.recipe');

const URL = 'https://forkify-api.herokuapp.com/api/v2/recipes';

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
  const data = await getJSON(`${URL}?search=${search}`);
  return Array.from(data.data.recipes, (recipe) => new SimpleRecipe(recipe));
};

const getRecipe = async (id) => {
  const data = await getJSON(`${URL}/${id}`);
  const { recipe } = data.data;
  return new Recipe(
    recipe,
    recipe.ingredients,
    recipe.servings,
    recipe.source_url,
    recipe.cooking_time,
  );
};

getRecipes('pizza').then((recipes) => {
  getRecipe(recipes[0].id).then(console.log);
});
