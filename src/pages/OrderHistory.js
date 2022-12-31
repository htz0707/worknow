import React, { useEffect, useState } from 'react';
import UserLayout from '../layouts/UserLayout';
import '../assets/styles/OrderHistory.scss';
import { ReactComponent as Calendar } from '../assets/icons/calendar_2.svg';
import { ReactComponent as Clock } from '../assets/icons/clock_2.svg';
import { Form, Button, Input, Select, Tabs } from 'antd';
import Room from '../assets/images/room.png';
import OrderCard from '../components/OrderCard';
import { gql, useLazyQuery } from '@apollo/client';
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import NoData from '../components/NoData';
const { TabPane } = Tabs;

export default function OrderHistory() {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get('tab');
  const navigate = useNavigate();
  useEffect(() => {
    if (tab) {
      handleChangeActiveTab(tab);
    } else {
      navigate({
        search: createSearchParams({
          tab: 'upcoming',
        }).toString(),
      });
      handleChangeActiveTab('upcoming');
    }
  }, [tab]);
  const [activeTab, setActiveTab] = useState('upcoming');
  const handleNavigateTab = (tab) => {
    navigate({
      search: createSearchParams({
        tab: tab,
      }).toString(),
    });
  };
  const handleChangeActiveTab = (key) => {
    setActiveTab(key);
    if (key === 'upcoming') {
      setStatusBooking(['booking_successfull']);
    }
    if (key === 'pending') {
      setStatusBooking(['booking', 'extended', 'confirming', 'confirmed']);
    }
    if (key === 'completed') {
      setStatusBooking(['checked_in', 'completed']);
    }
    if (key === 'cancelled') {
      setStatusBooking(['payment_fail', 'canceled']);
    }
  };
  const [statusBooking, setStatusBooking] = useState(['booking_successfull']);
  const GET_ORDERS = gql`
    query GetOrders($status: [OrderStatus!]) {
      orders(params: { status: $status }) {
        pageInfo {
          count
        }
        edges {
          orderId
          id
          status
          orderDetails {
            bookingType
            day
            endDate
            hour
            price
            startDate
            workingSpaces {
              locationId
              locationName
              name
              images {
                publicUrl
              }
            }
          }
        }
      }
    }
  `;
  const [total, setTotal] = useState(0);
  const [getOrders] = useLazyQuery(GET_ORDERS, {
    fetchPolicy: 'no-cache',
    onError(err) {
      console.log(err);
    },
  });
  const [orderList, setOrderList] = useState([]);
  const handleGetOrders = async () => {
    let res = await getOrders({
      variables: {
        status: statusBooking,
      },
    });
    if (res.data) {
      setOrderList(res.data.orders.edges);
      setTotal(res.data.orders.pageInfo.count);
    }
  };
  useEffect(() => {
    handleGetOrders();
  }, [statusBooking]);
  const renderTotal = () => {
    if (total == 0) {
      return;
    }
    if (activeTab === 'upcoming') {
      return `Bạn có ${total} đơn đã đặt`;
    }
    if (activeTab === 'pending') {
      return `Bạn có ${total} đơn trong hàng chờ xác thực`;
    }
    if (activeTab === 'completed') {
      return `Bạn có ${total} đơn đã hoàn tất`;
    }
    if (activeTab === 'cancelled') {
      return `Bạn có ${total} đơn đã hủy`;
    }
  };
  return (
    <UserLayout currentTab='history'>
      <div className='order-history p-4'>
        <h4 className='fw-bold'>GIAO DỊCH CỦA TÔI</h4>
        <Tabs activeKey={activeTab} onChange={handleNavigateTab}>
          <TabPane tab='Sắp Diễn Ra' key='upcoming'></TabPane>
          <TabPane tab='Hàng Chờ Xác Thực' key='pending'></TabPane>
          <TabPane tab='Đã Hoàn Tất' key='completed'></TabPane>
          <TabPane tab='Đã Hủy' key='cancelled'></TabPane>
        </Tabs>
        <div className='order-history-body'>
          <div className='title'>{renderTotal()}</div>
          {orderList.length > 0 ? (
            orderList.map((item, index) => {
              return (
                <div key={index}>
                  <OrderCard data={item} />
                  <hr />
                </div>
              );
            })
          ) : (
            <NoData />
          )}
        </div>
      </div>
    </UserLayout>
  );
}
