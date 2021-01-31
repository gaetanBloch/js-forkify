const recipeContainer = document.querySelector('.recipe');

const timeout = (seconds) => new Promise((_, reject) => {
  setTimeout(() => {
    reject(new Error(`Request took too long! Timeout after ${seconds} seconds`));
  }, seconds * 1000);
});

// https://forkify-api.herokuapp.com/v2

const getRecipes = async (search) => {
  const res = await fetch(
    `https://forkify-api.herokuapp.com/api/v2/recipes?search=${search}`,
  );
  const data = await res.json();
  if (!res.ok) throw new Error(`${data.message} (${res.status})`);
  return Array.from(data.data.recipes, (recipe) => ({
    publisher: recipe.publisher,
    title: recipe.title,
    id: recipe.id,
    imageUrl: recipe.image_url,
  }));
};

getRecipes('pizza').then(console.log);
