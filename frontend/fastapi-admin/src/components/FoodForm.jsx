// src/components/UserForm.jsx
import React, { useState, useEffect } from 'react';
import { createFood, updateFood } from '../api/api';

const FoodForm = ({ food, onSubmit }) => {
  const [formData, setFormData] = useState({
    food_name: '',
    food_type: '',
    calories: '',
    protein: '',
    carbonhidrats: '',
    fat: '',
    food_image: '',
  });

  useEffect(() => {
    if (food) {
      setFormData(food);
    } else {
      setFormData({
        food_name: '',
        food_type: '',
        calories: '',
        protein: '',
        carbonhidrats: '',
        fat: '',
        food_image: '',
      });
    }
  }, [food]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (food) {
      await updateFood(food.food_id, formData);
    } else {
      await createFood(formData);
    }
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{food ? 'Edit Food' : 'Create Food'}</h3>
      <input
        type="text"
        name="food_name"
        placeholder="Food Name"
        value={formData.food_name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="food_type"
        placeholder="Food Type"
        value={formData.food_type}
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
        type="text"
        name="food_image"
        placeholder="Food İmage"
        value={formData.food_image}
        onChange={handleChange}
        required
      />
      <button type="submit">{food ? 'Update' : 'Create'}</button>
    </form>
  );
};

export default FoodForm;
