import React, { useState } from 'react';


const Login = ({ onFormSwitch }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      const data = await response.json();
      
      if (data.success) {
        // Login successful
        alert('Login successful!');
        // Redirect or store token here
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred during login');
    }
  };

  return (
    <div className="auth-form-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
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
        
        <button type="submit">Log In</button>
      </form>
      <button className="link-btn" onClick={() => onFormSwitch('register')}>
        Don't have an account? Register here.
      </button>
    </div>
  );
};

export default Login;