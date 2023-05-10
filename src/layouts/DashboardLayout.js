import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useSearchParams } from 'react-router-dom';
import Topbar from '../components/Topbar';
import BottomBar from '../components/BottomBar';
import { fetchToken, onMessageListener } from '../firebase';
import '../firebase';

export default function DashboardLayout() {
  const [searchParams] = useSearchParams();
  const referenceCode = searchParams.get('referenceCode');
  useEffect(() => {
    if (referenceCode) {
      localStorage.setItem('referenceCode', referenceCode);
    }
  }, [referenceCode]);
  //
  const path = useLocation();
  const [isTokenFound, setTokenFound] = useState(false);
  fetchToken(setTokenFound);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [path]);
  onMessageListener()
    .then((payload) => {
      console.log(payload);
    })
    .catch((err) => console.log('failed: ', err));

  const getBottomBarWidth = () => {
    let element = document.getElementById('bottom-bar');
    return `${element?.offsetHeight}px`;
  };
  return (
    <>
      <Topbar />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          minHeight: `calc(100vh - ${getBottomBarWidth()})`,
        }}
      >
        <Outlet />
      </div>
      <BottomBar />
    </>
  );
}
