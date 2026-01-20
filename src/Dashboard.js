import React from 'react';

function Dashboard({ users }) {
  const admin = users.filter(u => u.role === 'Admin').length;
  const teacher = users.filter(u => u.role === 'Teacher').length;
  const student = users.filter(u => u.role === 'Student').length;

  return (
    <>
      <h1>Dashboard</h1>
      <div className="stats">
        <div className="card">Total Users: {users.length}</div>
        <div className="card">Admins: {admin}</div>
        <div className="card">Teachers: {teacher}</div>
        <div className="card">Students: {student}</div>
      </div>
    </>
  );
}

export default Dashboard;
