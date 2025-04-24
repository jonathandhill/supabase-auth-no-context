import { useState, useEffect } from 'react';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import { supabase } from './supabaseClient';
import './styles.css';

function App() {
  const [session, setSession] = useState(undefined);
  const [currentPage, setCurrentPage] = useState('signin');

  // Initialize session
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  // Sign up function
  const signUpNewUser = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email: email.toLowerCase(),
      password: password,
    });

    if (error) {
      console.error('Error signing up: ', error);
      return { success: false, error };
    }

    return { success: true, data };
  };

  // Sign in function
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

  // Sign out function
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error);
    }
  };

  const renderPage = () => {
    if (!session) {
      if (currentPage === 'signin') {
        return (
          <Signin setCurrentPage={setCurrentPage} signInUser={signInUser} />
        );
      }
      return (
        <Signup
          setCurrentPage={setCurrentPage}
          signUpNewUser={signUpNewUser}
          signInUser={signInUser}
        />
      );
    }
    return (
      <Dashboard
        setCurrentPage={setCurrentPage}
        signOut={signOut}
        session={session}
      />
    );
  };

  return (
    <div>
      <h1 className="app-header">Supabase Auth</h1>
      {renderPage()}
    </div>
  );
}

export default App;
