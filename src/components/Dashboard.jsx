import React, { useState } from 'react';

const Dashboard = ({ setCurrentPage, signOut, session }) => {
  const [error, setError] = useState(null);

  const handleSignOut = async (e) => {
    e.preventDefault();

    try {
      await signOut();
      setCurrentPage('signin');
    } catch (err) {
      setError('An unexpected error occurred.');
    }
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>
      <h2 className="dashboard-welcome">Welcome, {session?.user?.email}</h2>
      <div>
        <p onClick={handleSignOut} className="signout-button">
          Sign out
        </p>
      </div>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Dashboard;
