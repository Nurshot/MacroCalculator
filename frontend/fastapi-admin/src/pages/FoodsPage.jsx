import React, { useState, useEffect } from 'react';
import { fetchFoods } from '../api/api';
import FoodList from '../components/FoodList';

const FoodsPage = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getFoods = async () => {
      try {
        const data = await fetchFoods();
        setFoods(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getFoods();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Admin Panel</h1>
      <FoodList foods={foods} />
    </div>
  );
};

export default FoodsPage;