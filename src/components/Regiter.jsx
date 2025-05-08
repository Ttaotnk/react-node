import React, { useState } from 'react';


const Register = ({ onFormSwitch }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password
        })
      });

      const data = await response.json();
      
      if (data.success) {
        alert('Registration successful! Please login.');
        onFormSwitch('login');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred during registration');
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Register</h2>

      <form className="register-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Full Name</label>
        <input 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          type="text" 
          placeholder="Your Name" 
          id="name" 
          name="name" 
          required
        />
        
        <label htmlFor="email">Email</label>
        <input 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          type="email" 
          placeholder="your@email.com" 
          id="email" 
          name="email" 
          required
        />
        
        <label htmlFor="password">Password</label>
        <input 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          type="password" 
          placeholder="********" 
          id="password" 
          name="password" 
          required
        />
        
        <button type="submit">Register</button>
      </form>
      <button className="link-btn" onClick={() => onFormSwitch('login')}>
        Already have an account? Login here.
      </button>
    </div>
  );
};

export default Register;