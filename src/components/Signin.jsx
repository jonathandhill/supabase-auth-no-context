import React, { useState } from 'react';

const Signin = ({ setCurrentPage, signInUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signInUser(email, password);

      if (result.success) {
        // The session will be updated automatically by the auth state change listener
        console.log('Sign in successful, session should update automatically');
      } else {
        setError(result.error);
        setTimeout(() => {
          setError('');
        }, 3000);
      }
    } catch (err) {
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSignIn}>
        <h2 className="form-title">Sign in</h2>
        <p>
          Don't have an account yet?{' '}
          <span onClick={() => setCurrentPage('signup')} className="form-link">
            Sign up
          </span>
        </p>
        <div className="form-group">
          {/* <label htmlFor="Email">Email</label> */}
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="form-input"
            type="email"
            name="email"
            id="email"
            placeholder="Email"
          />
        </div>
        <div className="form-group">
          {/* <label htmlFor="Password">Password</label> */}
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="form-input"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          />
        </div>
        <button type="submit" disabled={loading} className="form-button">
          Sign In
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default Signin;
