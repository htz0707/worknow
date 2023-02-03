import React from 'react';
import { Outlet } from 'react-router-dom';
import Leftbar from '../components/Leftbar';
import '../assets/styles/AdminLayout.scss';

export default function AdminLayout() {

  return (
    <div className='dashboard-layout'>
      <Leftbar />
      <div
        style={{
          height: '100vh',
          overflow: 'auto',
          flex: 1,
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}
