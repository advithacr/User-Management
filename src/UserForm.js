import React, { useState, useEffect } from 'react';

function UserForm({ onSave, editingUser, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingUser) {
      setFormData(editingUser);
    } else {
      setFormData({ name: '', email: '', phone: '', role: '' });
    }
    setErrors({});
  }, [editingUser]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Phone must be 10 digits';
    if (!formData.role) newErrors.role = 'Role is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSave(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 style={{ marginBottom: '20px' }}>{editingUser ? 'Edit User' : 'Add New User'}</h2>
      
      <div style={{ marginBottom: '15px' }}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '8px',
            marginTop: '5px',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />
        {errors.name && <span style={{ color: 'red', fontSize: '12px' }}>{errors.name}</span>}
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '8px',
            marginTop: '5px',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />
        {errors.email && <span style={{ color: 'red', fontSize: '12px' }}>{errors.email}</span>}
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label>Phone Number:</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '8px',
            marginTop: '5px',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />
        {errors.phone && <span style={{ color: 'red', fontSize: '12px' }}>{errors.phone}</span>}
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label>Role:</label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '8px',
            marginTop: '5px',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        >
          <option value="">Select Role</option>
          <option value="Admin">Admin</option>
          <option value="Teacher">Teacher</option>
          <option value="Student">Student</option>
        </select>
        {errors.role && <span style={{ color: 'red', fontSize: '12px' }}>{errors.role}</span>}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button
          type="button"
          onClick={onClose}
          style={{
            background: '#6c757d',
            color: '#ffffff',
            border: 'none',
            padding: '20px 20px',
            borderRadius: '60px',
            cursor: 'pointer'
          }}
        >
          Cancel
        </button>
        <button
          type="submit"
          style={{
            background: '#007bff',
            color: '#ffffff',
            border: 'none',
            padding: '20px 20px',
            borderRadius: '50px',
            cursor: 'pointer'
          }}
        >
          {editingUser ? 'Update' : 'Add'}
        </button>
      </div>
    </form>
  );
}

export default UserForm;
