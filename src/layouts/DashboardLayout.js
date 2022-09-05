import React from 'react';
import { Outlet } from 'react-router-dom';
import Topbar from '../components/Topbar';

export default function DashboardLayout() {
  return (
    <>
      <Topbar />
      <div style={{ marginTop: '80px' }}>
        <Outlet />
      </div>
    </>
  );
}
