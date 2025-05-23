import React, { useState } from 'react';
import Login from './components/Login';
import Register from './components/Regiter';

function Web() {
  const [currentForm, setCurrentForm] = useState('login');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };

  return (
    <div className="App">
      {
        currentForm === 'login' ? 
        <Login onFormSwitch={toggleForm} /> : 
        <Register onFormSwitch={toggleForm} />
      }
    </div>
  );
}

export default Web;