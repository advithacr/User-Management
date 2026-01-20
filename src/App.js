import React, { useState } from 'react';
import UserForm from './UserForm';
import UserList from './UserList';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [activePage, setActivePage] = useState('users');
  const [lastUpdated, setLastUpdated] = useState(null);

  const [sidebarOpen, setSidebarOpen] = useState(true); 

  const handleSaveUser = (user) => {
    if (editingUser) {
      setUsers(users.map(u => u.id === editingUser.id ? { ...user, id: u.id } : u));
    } else {
      setUsers([...users, { ...user, id: Date.now() }]);
    }
    setEditingUser(null);
    setShowModal(false);
    setLastUpdated(new Date());
  };

  const handleDeleteUser = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(u => u.id !== id));
      setLastUpdated(new Date());
    }
  };

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const admins = users.filter(u => u.role === 'Admin').length;
  const teachers = users.filter(u => u.role === 'Teacher').length;
  const students = users.filter(u => u.role === 'Student').length;
  const total = users.length || 1;

  return (
    <div className="app">
      
      <aside className={`sidebar ${sidebarOpen ? 'open' : 'collapsed'}`}>
        
        <div className="menu-icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
          ☰
        </div>
        {sidebarOpen && (
          <nav>
            <p className={activePage === 'dashboard' ? 'active' : ''} onClick={() => setActivePage('dashboard')}>
              Dashboard
            </p>
            <p className={activePage === 'users' ? 'active' : ''} onClick={() => setActivePage('users')}>
              Users
            </p>
          </nav>
        )}
      </aside>

      
      <main className="content">
        <h1>User Management Portal</h1>

        {/* Dashboard */}
        {activePage === 'dashboard' && (
          <>
            <h2>Quick Status</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-row">
                  <span>Total Users</span>
                  <strong>{users.length}</strong>
                </div>
                <div className="bar">
                  <div className="fill" style={{ width: '100%' }} />
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-row">
                  <span>Admins</span>
                  <strong>{admins}</strong>
                </div>
                <div className="bar">
                  <div className="fill" style={{ width: `${(admins / total) * 100}%` }} />
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-row">
                  <span>Teachers</span>
                  <strong>{teachers}</strong>
                </div>
                <div className="bar">
                  <div className="fill" style={{ width: `${(teachers / total) * 100}%` }} />
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-row">
                  <span>Students</span>
                  <strong>{students}</strong>
                </div>
                <div className="bar">
                  <div className="fill" style={{ width: `${(students / total) * 100}%` }} />
                </div>
              </div>
            </div>

            {lastUpdated && (
              <p className="updated">Last updated: {lastUpdated.toLocaleString()}</p>
            )}
          </>
        )}

        {/* Users */}
        {activePage === 'users' && (
          <>
            <div className="top-controls">
              <input
                className="search"
                placeholder="Search users....."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="create-btn" onClick={() => setShowModal(true)}>
                Create User
              </button>
            </div>

            <h2>User List ({filteredUsers.length})</h2>

            <UserList
              users={filteredUsers}
              onEdit={(u) => { setEditingUser(u); setShowModal(true); }}
              onDelete={handleDeleteUser}
            />
          </>
        )}
      </main>

      
      {showModal && (
        <div className="modal" onClick={() => setShowModal(false)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <UserForm
              editingUser={editingUser}
              onSave={handleSaveUser}
              onClose={() => setShowModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
