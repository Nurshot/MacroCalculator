import React from 'react';

const RecipeTable = ({ recipes, onEdit, onDelete }) => {
if (!recipes || recipes.length === 0) {
    return <p>No recipes available</p>;
    }
  return (
    <table>
      <thead>
        <tr>
          <th>Recipe Name</th>
          <th>Recipe Description</th>
          <th>Calories</th>
          <th>Protein</th>
          <th>Carbohydrates</th>
          <th>Fat</th>
          <th>Preparation Time</th>
          <th>Cooking Time</th>
          <th>Recipe Image</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {recipes.map(recipe => (
          <tr key={recipe.recipe_id}>
            <td>{recipe.recipe_name}</td>
            <td>{recipe.recipe_description}</td>
            <td>{recipe.calories}</td>
            <td>{recipe.protein}</td>
            <td>{recipe.carbonhidrats}</td>
            <td>{recipe.fat}</td>
            <td>{recipe.preparation_time}</td>
            <td>{recipe.cooking_time}</td>
            <td>{recipe.recipe_image}</td>
            <td>
              <button onClick={() => onEdit(recipe)}>Edit</button>
              <button onClick={() => onDelete(recipe.recipe_id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RecipeTable;
