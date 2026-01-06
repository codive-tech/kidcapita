import React from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>This page is under development. Please use the standalone admin dashboard at /admin/index.html for now.</p>
        <a href="/admin/index.html" className="btn btn-gold-lg">
          Go to Admin Dashboard
        </a>
      </div>
    </div>
  );
};

export default AdminDashboard;

