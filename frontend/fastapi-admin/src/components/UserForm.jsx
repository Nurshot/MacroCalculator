// src/components/UserForm.jsx
import React, { useState, useEffect } from 'react';
import { createUser, updateUser } from '../api/api';

const UserForm = ({ user, onSubmit }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    registration_date: '',
    age: '',
    gender: '',
    weight: '',
    height: '',
    is_superadmin: false,
  });

  useEffect(() => {
    if (user) {
      setFormData(user);
    } else {
      setFormData({
        username: '',
        email: '',
        password: '',
        registration_date: '',
        age: '',
        gender: '',
        weight: '',
        height: '',
        is_superadmin: false,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      await updateUser(user.user_id, formData);
    } else {
      await createUser(formData);
    }
    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{user ? 'Edit User' : 'Create User'}</h3>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="registration_date"
        value={formData.registration_date}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="age"
        placeholder="Age"
        value={formData.age}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="gender"
        placeholder="Gender"
        value={formData.gender}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="weight"
        placeholder="Weight"
        value={formData.weight}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="height"
        placeholder="Height"
        value={formData.height}
        onChange={handleChange}
        required
      />
      <label>
        <input
          type="checkbox"
          name="is_superadmin"
          checked={formData.is_superadmin}
          onChange={handleChange}
        />
        Is Superadmin
      </label>
      <button type="submit">{user ? 'Update' : 'Create'}</button>
    </form>
  );
};

export default UserForm;
