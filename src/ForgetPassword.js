import React, { useState } from 'react';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic email validation
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    // Your password reset logic goes here
    // For simplicity, let's just show success message
    
    setEmail('');
    setError('');
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '5px', width: '300px' }}>
      <h2>Forget Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ForgetPassword;