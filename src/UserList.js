import React from 'react';
import './UserList.css';

function UserList({ users, onEdit, onDelete }) {
  return (
    <div className="user-list">
      {users.map(user => (
        <div className="user-card" key={user.id}>
          <div>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <p>{user.phone}</p>
            <p>{user.role}</p>
          </div>

          <div className="actions">
            <button onClick={() => onEdit(user)}>Edit</button>
            <button onClick={() => onDelete(user.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserList;
