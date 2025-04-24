import React, { useState } from 'react';

const Signup = ({ setCurrentPage, signUpNewUser, signInUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signUpNewUser(email, password);

      if (result.success) {
        // After successful signup, try to sign in using the provided function
        const signInResult = await signInUser(email, password);

        if (!signInResult.success) {
          setError(signInResult.error);
        }
        // The session will be updated automatically by the auth state change listener
      } else {
        setError(result.error.message);
      }
    } catch (err) {
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSignUp}>
        <h2 className="form-title">Sign up today!</h2>
        <p>
          Already have an account?{' '}
          <span onClick={() => setCurrentPage('signin')} className="form-link">
            Sign in
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
          Sign Up
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default Signup;
