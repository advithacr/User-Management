import React from 'react';

function Sidebar({ setPage }) {
  return (
    <aside className="sidebar">
      <h2>User Management</h2>
      <button onClick={() => setPage('dashboard')}>Dashboard</button>
      <button onClick={() => setPage('users')}>Users</button>
    </aside>
  );
}

export default Sidebar;
