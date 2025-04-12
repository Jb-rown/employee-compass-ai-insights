import React from 'react';
import { UserRoleManager } from '../components/UserRoleManager';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

export default function UserManagement() {
  const { isAdmin } = useAuth();

  // Redirect non-admin users to the dashboard
  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">User Management</h1>
      <UserRoleManager />
    </div>
  );
} 