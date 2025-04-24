import React, { useState } from 'react';
import { supabase } from '../supabaseClient';

const Signin = ({ setCurrentPage }) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const signInUser = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase(),
        password: password,
      });

      if (error) {
        console.error('Sign-in error:', error.message);
        return { success: false, error: error.message };
      }

      console.log('Sign-in success:', data);
      return { success: true, data };
    } catch (error) {
      console.error('Unexpected error during sign-in:', error.message);
      return {
        success: false,
        error: 'An unexpected error occurred. Please try again.',
      };
    }
  };

  const handleSignIn = async (formData) => {
    setLoading(true);
    const email = formData.get('email');
    const password = formData.get('password');

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
    <form action={handleSignIn}>
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
          className="form-input"
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          required
        />
      </div>
      <div className="form-group">
        {/* <label htmlFor="Password">Password</label> */}
        <input
          className="form-input"
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          required
        />
      </div>
      <button type="submit" disabled={loading} className="form-button">
        Sign In
      </button>
      {error && <p className="error-message">{error}</p>}
    </form>
  );
};

export default Signin;
