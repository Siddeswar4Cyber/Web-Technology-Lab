import React from 'react';
import { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })
  
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const validate = () => {
    let tempErrors = {};

    if (!formData.name) {
      tempErrors.name = 'Name is required';
    }
    
    if (!formData.email) {
      tempErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      tempErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      tempErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      alert('Form submitted successfully!');
      setFormData({
        name: '',
        email: '',
        password: '',
      });
      setErrors({});
    }
  }
  
  return (
    <div style = {{ width: '300px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', fontFamily: 'Arial, sans-serif' }}>
      <h2>User Registration</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
        {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
        
        <label>Email:</label>
        <input type="text" name="email" value={formData.email} onChange={handleChange} />
        {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}

        <label>Password:</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} />
        {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}

        <button type="submit" style={{ marginTop: '10px', padding: '5px 10px' }}>Register</button>
      </form>
    </div>
  );
}

export default App;