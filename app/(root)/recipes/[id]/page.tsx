'use client';
import RecipeComponent from '@/components/RecipeComponent';
import { Recipe } from '@/utils/utils';
import React, { useEffect, useState } from 'react';

const App: React.FC = () => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);

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
    };

    fetchRecipe();
  }, []);

  return (
    <div>
      {recipe ? <RecipeComponent initialRecipe={recipe} /> : <p>Loading...</p>}
    </div>
  );
};

export default App;
