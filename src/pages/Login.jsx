import { useState } from 'react';
import '../App.css';

function Login({ onToggle }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    // Email and Password validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    // Checking if user exists from local storage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      // Save current user information
      localStorage.setItem('currentUser', JSON.stringify({ email: user.email, username: user.username }));
      setSuccess('✓ Login successful!');
      
      // Clearing the form
      setEmail('');
      setPassword('');
      
      // Showing success message 
      setTimeout(() => {
        setSuccess('');
        setEmail('');
        setPassword('');
      }, 1500);
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="page">
      <div className="card">
        <div className="logo-mark">X</div>
        <h1>Welcome back</h1>
        <p className="subtext">Sign in with your email to continue.</p>

        <form className="form" onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          
          <label className="field">
            <span>Email</span>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label className="field">
            <span>Password</span>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <button className="btn primary" type="submit">
            Log in
          </button>
          
          <button className="btn ghost" type="button" onClick={onToggle}>
            Create account
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
