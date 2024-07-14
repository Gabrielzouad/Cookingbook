interface Ingredient {
    name: string;
    quantity: number | string;
    unit: string;
}

interface Recipe {
    ingredients: Ingredient[];
    servings: number;
}

const adjustRecipe = (recipe: Recipe, desiredServings: number): Recipe => {
    const factor = desiredServings / recipe.servings;

    const adjustedIngredients = recipe.ingredients.map(ingredient => {
        if (typeof ingredient.quantity === 'number') {
            return {
                ...ingredient,
                quantity: ingredient.quantity * factor
            };
        }
        return ingredient;
    });

    return {
        ...recipe,
        ingredients: adjustedIngredients,
        servings: desiredServings
    };
};

export { adjustRecipe, Ingredient, Recipe };
