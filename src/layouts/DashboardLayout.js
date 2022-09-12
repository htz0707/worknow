import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Topbar from '../components/Topbar';

export default function DashboardLayout() {
  const path = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [path]);
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
