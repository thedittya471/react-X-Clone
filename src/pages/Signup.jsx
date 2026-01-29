import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    // validation
    if (!username || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (username.length < 3) {
      setError('Username must be at least 3 characters');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Getting existing users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Checking if email already exists in the local storage
    if (users.find(u => u.email === email)) {
      setError('Email already registered');
      return;
    }
    
    // Adding new user to the local storage
    users.push({ username, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    
    // And save current user information
    localStorage.setItem('currentUser', JSON.stringify({ email, username }));
    
    setSuccess('✓ Signup successful!');
    
    // Clearing form
    setUsername('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    
    // Redirect to feed after showing success message
    setTimeout(() => {
      navigate('/feed');
    }, 1500);
  };

  return (
    <div className="page">
      <div className="card">
        <div className="logo-mark">X</div>
        <h1>Create your account</h1>
        <p className="subtext">Join us today and start connecting.</p>

        <form className="form" onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}
          
          <label className="field">
            <span>Username</span>
            <input
              type="text"
              placeholder="johndoe"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>

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
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <label className="field">
            <span>Confirm Password</span>
            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </label>

          <button className="btn primary" type="submit">
            Create account
          </button>
          
          <Link to="/">
            <button className="btn ghost" type="button">
              Already have an account?
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Signup;
