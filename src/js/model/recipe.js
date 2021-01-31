import SimpleRecipe from './simpleRecipe';

class Recipe extends SimpleRecipe {
  constructor(
    recipe,
    ingredients,
    servings,
    sourceUrl,
    cookingTime,
  ) {
    super(recipe);
    this.ingredients = ingredients;
    this.servings = servings;
    this.sourceUrl = sourceUrl;
    this.cookingTime = cookingTime;
  }
}

export default Recipe;
