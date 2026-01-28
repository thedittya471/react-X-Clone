import { useState } from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './App.css';

function App() {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <div>
      {isSignup ? (
        <Signup onToggle={() => setIsSignup(false)} />
      ) : (
        <Login onToggle={() => setIsSignup(true)} />
      )}
    </div>
  );
}

export default App;
