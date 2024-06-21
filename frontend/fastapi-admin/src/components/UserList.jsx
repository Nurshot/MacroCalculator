import React, { useState, useEffect } from 'react';
import { fetchUsers, deleteUser } from '../api/api';
import UserTable from './UserTable';
import UserForm from './UserForm';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  const loadUsers = async () => {
    const usersData = await fetchUsers();
    setUsers(usersData);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleDelete = async (user_id) => {
    await deleteUser(user_id);
    loadUsers();
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleFormSubmit = () => {
    setEditingUser(null);
    loadUsers();
  };

  return (
    <div>
      <h2>User List</h2>
      <UserForm user={editingUser} onSubmit={handleFormSubmit} />
      <UserTable users={users} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default UserList;