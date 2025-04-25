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

  // Sign out function
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error);
    }
  };

  const renderPage = () => {
    if (!session) {
      return (
        <div
          className="form-container"
          style={{
            border: '1px solid #ccc',
            padding: '2rem',
            borderRadius: '8px',
          }}
        >
          {currentPage === 'signin' ? (
            <Signin setCurrentPage={setCurrentPage} />
          ) : (
            <Signup setCurrentPage={setCurrentPage} />
          )}
        </div>
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
      <h1 className="app-header">Paper Like A Boss</h1>
      {renderPage()}
    </div>
  );
}

export default App;
