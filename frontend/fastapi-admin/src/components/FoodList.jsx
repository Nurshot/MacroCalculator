import React, { useState, useEffect } from 'react';
import { fetchFoods,deleteFood } from '../api/api';
import FoodTable from './FoodTable';
import FoodForm from './FoodForm';

const FoodList = () => {
  const [foods, setFoods] = useState([]);
  const [editingFood, setEditingFood] = useState(null);

  const loadFoods = async () => {
    const foodsData = await fetchFoods();
    setFoods(foodsData);
  };

  useEffect(() => {
    loadFoods();
  }, []);

  const handleDelete = async (food_id) => {
    await deleteFood(food_id);
    loadFoods();
  };

  const handleEdit = (food) => {
    setEditingFood(food);
  };

  const handleFormSubmit = () => {
    setEditingFood(null);
    loadFoods();
  };

  return (
    <div>
      <h2>Food List</h2>
      <FoodForm food={editingFood} onSubmit={handleFormSubmit} />
      <FoodTable foods={foods} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default FoodList;