import React from 'react';

const FoodTable = ({ foods, onEdit, onDelete }) => {
if (!foods || foods.length === 0) {
    return <p>No foods available</p>;
    }
  return (
    <table>
      <thead>
        <tr>
          <th>Food Name</th>
          <th>Food Type</th>
          <th>Calories</th>
          <th>Protein</th>
          <th>Carbohydrates</th>
          <th>Fat</th>
          <th>Food Image</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {foods.map(food => (
          <tr key={food.food_id}>
            <td>{food.food_name}</td>
            <td>{food.food_type}</td>
            <td>{food.calories}</td>
            <td>{food.protein}</td>
            <td>{food.carbonhidrats}</td>
            <td>{food.fat}</td>
            <td>{food.food_image}</td>
            <td>
              <button onClick={() => onEdit(food)}>Edit</button>
              <button onClick={() => onDelete(food.food_id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FoodTable;
