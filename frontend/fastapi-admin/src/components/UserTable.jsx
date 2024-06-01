// src/components/UserTable.jsx
import React from 'react';

const UserTable = ({ users, onEdit, onDelete }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Username</th>
          <th>Email</th>
          <th>Registration Date</th>
          <th>Age</th>
          <th>Gender</th>
          <th>Weight</th>
          <th>Height</th>
          <th>Is Superadmin</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.user_id}>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.registration_date}</td>
            <td>{user.age}</td>
            <td>{user.gender}</td>
            <td>{user.weight}</td>
            <td>{user.height}</td>
            <td>{user.is_superadmin ? 'Yes' : 'No'}</td>
            <td>
              <button onClick={() => onEdit(user)}>Edit</button>
              <button onClick={() => onDelete(user.user_id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;
