// src/api/api.js
const API_URL = 'http://127.0.0.1:8000';

export const fetchUsers = async () => {
  const response = await fetch(`${API_URL}/users`);
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return response.json();
};

export const createUser = async (user) => {
  const response = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  if (!response.ok) {
    throw new Error('Failed to create user');
  }
  return response.json();
};

export const updateUser = async (user_id, user) => {
  const response = await fetch(`${API_URL}/users/${user_id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  if (!response.ok) {
    throw new Error('Failed to update user');
  }
  return response.json();
};

export const deleteUser = async (user_id) => {
  const response = await fetch(`${API_URL}/users/${user_id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete user');
  }
  return response.json();
};


//foods api

export const fetchFoods = async () => {
  const response = await fetch('http://127.0.0.1:8000/foods');
  if (!response.ok) {
      throw new Error('Failed to fetch foods');
  }
  return response.json();
};

export const createFood = async (foodData) => {
  const response = await fetch('http://127.0.0.1:8000/foods', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(foodData),
  });
  if (!response.ok) {
      throw new Error('Failed to create food');
  }
  return response.json();
};

export const updateFood = async (foodId, foodData) => {
  const response = await fetch(`http://127.0.0.1:8000/foods/${foodId}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(foodData),
  });
  if (!response.ok) {
      throw new Error('Failed to update food');
  }
  return response.json();
};

export const deleteFood = async (foodId) => {
  const response = await fetch(`http://127.0.0.1:8000/foods/${foodId}`, {
      method: 'DELETE',
  });
  if (!response.ok) {
      throw new Error('Failed to delete food');
  }
  return response.json();
};


export const fetchRecipes = async () => {
  const response = await fetch(`${API_URL}/recipes`);
  if (!response.ok) {
    throw new Error('Failed to fetch recipes');
  }
  return response.json();
};

export const createRecipe = async (recipeData) => {
  const response = await fetch(`${API_URL}/recipes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(recipeData),
  });
  if (!response.ok) {
    throw new Error('Failed to create food');
  }
  return response.json();
};

export const updateRecipe = async (recipeId, recipeData) => {
  const response = await fetch(`${API_URL}/recipes/${recipeId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(recipeData),
  });
  if (!response.ok) {
    throw new Error('Failed to update food');
  }
  return response.json();
};

export const deleteRecipe = async (recipeId) => {
  const response = await fetch(`${API_URL}/recipes/${recipeId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete food');
  }
  return response.json();
};
