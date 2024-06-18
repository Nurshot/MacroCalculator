import axios from 'axios';

const API_URL = 'https://nurshot.net';

export const fetchFoods = async () => {
  try {
    const response = await axios.get(`${API_URL}/foods`);
    return response.data;
  } catch (error) {
    console.error('Error fetching foods:', error);
    throw error;
  }
};

export const fetchFoodById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/foods/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching food with id ${id}:`, error);
    throw error;
  }
};
