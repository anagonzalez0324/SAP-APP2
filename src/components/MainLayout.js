// src/components/MainLayout.js
import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import AuthContext from '../context/AuthContext';

const MainLayout = () => {
  const { user, logout } = useContext(AuthContext); // Access the logout function

  const handleLogout = () => {
    logout(); // Call the logout function from AuthContext
  };

  return (
    <div className="d-flex">
      {user && <Sidebar />} 
      <main className="flex-grow-1 p-3" id="main">
        <Outlet />
        {user && (
          <button onClick={handleLogout}>Logout</button>
        )}
      </main>
    </div>
  );
};

export default MainLayout;
