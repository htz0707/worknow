import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Topbar from '../components/Topbar';
import BottomBar from '../components/BottomBar';

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
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        <Outlet />
      </div>
      <BottomBar />
    </>
  );
}
