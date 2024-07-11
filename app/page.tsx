import React, { useState, useEffect } from 'react';

interface Ingredient {
  name: string;
  quantity: number | string; // Quantity can be a number or a string like 'to taste'
  unit: string;
}

interface Recipe {
  ingredients: Ingredient[];
  servings: number;
}

const adjustRecipe = (recipe: Recipe, desiredServings: number): Recipe => {
  const factor = desiredServings / recipe.servings;

  const adjustedIngredients = recipe.ingredients.map((ingredient) => {
    if (typeof ingredient.quantity === 'number') {
      return {
        ...ingredient,
        quantity: ingredient.quantity * factor,
      };
    }
    return ingredient; // For ingredients like 'to taste' that don't need adjustment
  });

  return {
    ...recipe,
    ingredients: adjustedIngredients,
    servings: desiredServings,
  };
};

const RecipeComponent: React.FC = () => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [servings, setServings] = useState<number>(4); // Default to 4 servings
  const [adjustedRecipe, setAdjustedRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    // Fetch recipe data from API
    const fetchRecipe = async () => {
      // Mocked recipe data
      const fetchedRecipe: Recipe = {
        ingredients: [
          { name: 'Penne pasta', quantity: 8, unit: 'oz' },
          { name: 'Asparagus, chopped', quantity: 1, unit: 'lb' },
          { name: 'Bell peppers, chopped', quantity: 2, unit: '' },
          { name: 'Zucchini, chopped', quantity: 2, unit: '' },
          { name: 'Olive oil', quantity: 2, unit: 'tbsp' },
          { name: 'Garlic, minced', quantity: 3, unit: 'cloves' },
          { name: 'Parmesan cheese, grated', quantity: 0.5, unit: 'cup' },
          { name: 'Salt and pepper', quantity: 'to taste', unit: '' },
        ],
        servings: 4,
      };
      setRecipe(fetchedRecipe);
      setAdjustedRecipe(fetchedRecipe);
    };

    fetchRecipe();
  }, []);

  useEffect(() => {
    if (recipe) {
      setAdjustedRecipe(adjustRecipe(recipe, servings));
    }
  }, [servings, recipe]);

  const handleServingsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setServings(Number(event.target.value));
  };

  return (
    <div>
      <h1>Recipe</h1>
      <div>
        <label>
          Number of Servings:
          <input
            type='number'
            value={servings}
            onChange={handleServingsChange}
          />
        </label>
      </div>
      {adjustedRecipe && (
        <div>
          <h2>Ingredients</h2>
          <ul>
            {adjustedRecipe.ingredients.map((ingredient, index) => (
              <li key={index}>
                {ingredient.quantity} {ingredient.unit} {ingredient.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RecipeComponent;
