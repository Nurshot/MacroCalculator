import React, { useState, useEffect } from 'react';
import { fetchFoods,deleteFood, fetchRecipes, deleteRecipe } from '../api/api';
import RecipeTable from './RecipeTable';
import RecipeForm from './RecipeForm';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [editingRecipe, setEditingRecipe] = useState(null);

  const loadRecipes = async () => {
    const recipesData = await fetchRecipes();
    setRecipes(recipesData);
  };

  useEffect(() => {
    loadRecipes();
  }, []);

  const handleDelete = async (recipe_id) => {
    await deleteRecipe(recipe_id);
    loadRecipes();
  };

  const handleEdit = (recipe) => {
    setEditingRecipe(recipe);
  };

  const handleFormSubmit = () => {
    setEditingRecipe(null);
    loadRecipes();
  };

  return (
    <div>
      <h2>Food List</h2>
      <RecipeForm recipe={editingRecipe} onSubmit={handleFormSubmit} />
      <RecipeTable recipes={recipes} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default RecipeList;