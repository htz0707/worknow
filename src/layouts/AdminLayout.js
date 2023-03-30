import React, { useEffect, useMemo, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Leftbar from '../components/Leftbar';
import '../assets/styles/AdminLayout.scss';
import { gql, useLazyQuery, useMutation } from '@apollo/client';
import { useAuthContext } from '../context/auth';
import notificationSound from '../assets/sounds/notification2.mp3';
import useSound from 'use-sound';
import { notification } from 'antd';
import { BsFillBagCheckFill } from 'react-icons/bs';
import moment from 'moment';
import 'moment/locale/vi';

export default function DashboardLayout() {
  moment.locale('vi');
  const { orderCount, getOrderCount } = useAuthContext();
  const path = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [path]);
  const GET_ORDERS = gql`
    query GetOrders($status: [OrderStatus!]) {
      orders(params: { status: $status }) {
        pageInfo {
          count
        }
      }
    }
  `;
  const [getOrders] = useLazyQuery(GET_ORDERS, {
    fetchPolicy: 'no-cache',
  });
  const handleGetOrders = async () => {
    let res = await getOrders({
      variables: {
        status: ['confirmed'],
      },
    });
    if (res.data) {
      console.log(orderCount);
      let count = res.data.orders.pageInfo.count;
      let prev_amount = orderCount.amount;
      let triggerNewOrder = orderCount.triggerNewOrder;
      if (count > prev_amount) {
        triggerNewOrder = triggerNewOrder + 1;
      }
      getOrderCount({
        amount: count,
        triggerNewOrder: triggerNewOrder,
      });
    }
  };
  const [play] = useSound(notificationSound);
  let interval;
  // useEffect(() => {
  //   interval = setInterval(() => {
  //     handleGetOrders();
  //   }, process.env.REACT_APP_ORDER_POLLING_INTERVAL || 5000);
  //   return () => clearInterval(interval);
  // }, [orderCount]);
  const navigate = useNavigate();
  useEffect(() => {
    if (orderCount?.triggerNewOrder) {
      play();
      console.log('hav a order');
      notification.open({
        message: (
          <div className='w-100 d-flex justify-content-between align-items-center'>
            <div className='d-flex align-items-center'>
              <BsFillBagCheckFill size={20} className='me-2 text-primary' />
              <span className='me-auto fw-bold text-black'>Đơn đặt mới</span>
            </div>
            <small>{moment().fromNow()}</small>
          </div>
        ),
        description: (
          <p>
            Bạn có đơn mới đang chờ xét duyệt.
            <span
              className='text-primary text-decoration-underline ms-1'
              style={{ cursor: 'pointer' }}
              onClick={() => navigate('/bookings')}
            >
              Xem đơn
            </span>
          </p>
        ),
        duration: 0,
      });
    }
  }, [orderCount?.triggerNewOrder]);
  return (
    <div className='admin-layout'>
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
