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
  return Array.from(data.data.recipes, (recipe) => ({
    publisher: recipe.publisher,
    title: recipe.title,
    id: recipe.id,
    imageUrl: recipe.image_url,
  }));
};

const getRecipe = async (id) => {
  const data = await getJSON(`${URL}/${id}`);
  const { recipe } = data.data;
  return {
    publisher: recipe.publisher,
    title: recipe.title,
    id: recipe.id,
    ingredients: recipe.ingredients,
    servings: recipe.servings,
    imageUrl: recipe.image_url,
    sourceUrl: recipe.source_url,
    cookingTime: recipe.cooking_time,
  };
};

getRecipes('pizza').then((recipes) => {
  getRecipe(recipes[0].id).then(console.log);
});
