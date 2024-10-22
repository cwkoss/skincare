import React from 'react';
import { useUser } from './UserContext';
import { Navigate } from 'react-router-dom';

const Admin = () => {
  const { user } = useUser();

  if (!user || user.email !== 'chris@mckoss.com') {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      <h1>Admin Page</h1>
      <p>You're allowed to see this!</p>
    </div>
  );
};

export default Admin;
