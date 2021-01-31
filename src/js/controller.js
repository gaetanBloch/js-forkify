// eslint-disable-next-line import/no-unresolved
import icons from 'url:../img/icons.svg';
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

const renderIngredient = (ingredient) => `
  <li class="recipe__ingredient">
    <svg class="recipe__icon">
      <use href="${icons}#icon-check"></use>
    </svg>
    <div class="recipe__quantity">${ingredient.quantity}</div>
    <div class="recipe__description">
      <span class="recipe__unit">${ingredient.unit}</span>
      ${ingredient.description}
    </div>
  </li>
`;

const renderRecipe = async (id) => {
  const recipe = await getRecipe(id);
  const html = `
  <figure class="recipe__fig">
    <img src="${recipe.imageUrl}" alt="Tomato" class="recipe__img" />
    <h1 class="recipe__title">
      <span>${recipe.title}</span>
    </h1>
  </figure>

  <div class="recipe__details">
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-clock"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--minutes">
        ${recipe.cookingTime}
      </span>
      <span class="recipe__info-text">minutes</span>
    </div>
    <div class="recipe__info">
      <svg class="recipe__info-icon">
        <use href="${icons}#icon-users"></use>
      </svg>
      <span class="recipe__info-data recipe__info-data--people">
        ${recipe.servings}
      </span>
      <span class="recipe__info-text">servings</span>

      <div class="recipe__info-buttons">
        <button class="btn--tiny btn--increase-servings">
          <svg>
            <use href="${icons}#icon-minus-circle"></use>
          </svg>
        </button>
        <button class="btn--tiny btn--increase-servings">
          <svg>
            <use href="${icons}#icon-plus-circle"></use>
          </svg>
        </button>
      </div>
    </div>
    <div class="recipe__user-generated">
      <svg>
        <use href="${icons}#icon-user"></use>
      </svg>
    </div>
    <button class="btn--round">
      <svg class="">
        <use href="${icons}#icon-bookmark-fill"></use>
      </svg>
    </button>
  </div>
  
  <div class="recipe__ingredients">
    <h2 class="heading--2">Recipe ingredients</h2>
    <ul class="recipe__ingredient-list">
      ${recipe.ingredients.map(renderIngredient).join('')}
    </ul>
  </div>
  
  <div class="recipe__directions">
    <h2 class="heading--2">How to cook it</h2>
    <p class="recipe__directions-text">
      This recipe was carefully designed and tested by
      <span class="recipe__publisher">${recipe.publisher}</span>.
      Please check out directions at their website.
    </p>
    <a
      class="btn--small recipe__btn"
      href="${recipe.sourceUrl}"
      target="_blank"
    >
      <span>Directions</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </a>
    </div>
  `;
  recipeContainer.innerHTML = '';
  recipeContainer.insertAdjacentHTML('afterbegin', html);
};

const renderSpinner = () => {
  const html = `
  <div class="spinner">
    <svg>
      <use href="${icons}#icon-loader"></use>
    </svg>
  </div> 
  `;
  recipeContainer.innerHTML = '';
  recipeContainer.insertAdjacentHTML('afterbegin', html);
};

renderSpinner();
getRecipes('pizza')
  .then((recipes) => renderRecipe(recipes[12].id));
