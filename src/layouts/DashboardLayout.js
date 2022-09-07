import React from 'react';
import { Outlet } from 'react-router-dom';
import Topbar from '../components/Topbar';

export default function DashboardLayout() {
  return (
    <>
      <Topbar />
      <div
        style={{
          marginTop: '80px',
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <Outlet />
      </div>
    </>
  );
}
