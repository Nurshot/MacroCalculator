// src/components/UserForm.jsx
import React, { useState, useEffect } from 'react';
import { createRecipe, updateRecipe} from '../api/api';

const RecipeForm = ({ recipe, onSubmit }) => {
  const [formData, setFormData] = useState({
    recipe_name: '',
    recipe_description: '',
    calories: '',
    protein: '',
    carbonhidrats: '',
    fat: '',
    preparation_time: '',
    cooking_time: '',
    recipe_image: '',
  });

  useEffect(() => {
    if (recipe) {
      setFormData(recipe);
    } else {
      setFormData({
        recipe_name: '',
        recipe_description: '',
        calories: '',
        protein: '',
        carbonhidrats: '',
        fat: '',
        preparation_time: '',
        cooking_time: '',
        recipe_image: '',
      });
    }
  }, [recipe]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (recipe) {
      await updateRecipe(recipe.recipe_id, formData);
    } else {
      await createRecipe(formData);
    }
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{recipe ? 'Edit Recipe' : 'Create Recipe'}</h3>
      <input
        type="text"
        name="recipe_name"
        placeholder="Recipe Name"
        value={formData.recipe_name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="recipe_description"
        placeholder="Recipe Description"
        value={formData.recipe_description}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="calories"
        placeholder="Calories"
        value={formData.calories}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="protein"
        placeholder="protein"
        value={formData.protein}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="carbonhidrats"
        placeholder="Carbonhidrats"
        value={formData.carbonhidrats}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="fat"
        placeholder="Fat"
        value={formData.fat}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="preparation_time"
        placeholder="Preparation Time"
        value={formData.preparation_time}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="cooking_time"
        placeholder="Cooking Time"
        value={formData.cooking_time}
        onChange={handleChange}
        required
      />
      <input
        type="string"
        name="recipe_image"
        placeholder="Recipe İmage"
        value={formData.recipe_image}
        onChange={handleChange}
        required
      />
      <button type="submit">{recipe ? 'Update' : 'Create'}</button>
    </form>
  );
};

export default RecipeForm;
