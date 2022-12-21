import React, { useEffect, useState } from 'react';
import { Table, Dropdown, Space } from 'antd';
import Bcrumb from '../components/Bcrumb';
import { gql, useLazyQuery } from '@apollo/client';
import moment from 'moment';

export default function AdminOrders() {
  const GET_ORDERS = gql`
  query MyQuery{
    orders(
      params: {
        limit: 150
      }
    ) {
      edges {
        id
        orderId
        email
        finalTotal
        fullname
        note
        status
        phoneNumber
        phoneCountryCode
        total
        totalDiscount
        updatedAt
        userId
        orderDetails {
          day
          endDate
          startDate
          workingSpaceId
          workingSpaces {
            name
            locationId
            locationName
          }
        }
        orderTransactions {
          bill
        }
      }
      pageInfo {
        count
        totalPage
        limit
        page
      }
    }
  }
`;
  const [getOrders] = useLazyQuery(GET_ORDERS);
  const [orders, setOrders] = useState([]);

  const handleGetOrders = async () => {
    let res = await getOrders();

    if (res.data) {
      let array = res.data.orders.edges.map((item, key) => ({ key, ...item }));

      for (const item of array) {
        item.startDate = item.orderDetails[0]?.startDate;
        item.endDate = item.orderDetails[0]?.endDate;
        item.workingSpaceId = item.orderDetails[0]?.workingSpaceId;
        item.workingSpaceName = item.orderDetails[0]?.workingSpaces?.name;
        item.locationId = item.orderDetails[0]?.workingSpaces?.locationId;
        item.phoneNumber = '+' + item.phoneCountryCode + item.phoneNumber;
        item.locationName = item.orderDetails[0]?.workingSpaces?.locationName;
        item.bill = item.orderTransactions.bill;
      }
      console.log(array)
      setOrders(array);
    }
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Order ID',
      dataIndex: 'orderId',
      key: 'orderId'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Final Total',
      dataIndex: 'finalTotal',
      key: 'finalTotal'
    },
    {
      title: 'Full Name',
      dataIndex: 'fullname',
      key: 'fullname'
    },
    {
      title: 'Note',
      dataIndex: 'note',
      key: 'note'
    },
    {
      title: 'Phone number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber'
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total'
    },
    {
      title: 'Total Discount',
      dataIndex: 'totalDiscount',
      key: 'totalDiscount'
    },
    {
      title: 'User ID',
      dataIndex: 'userId',
      key: 'userId'
    },
    {
      title: 'Updated At',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (_, date) => (
        moment(date.updatedAt).format('HH:mm, DD/MM/YYYY')
      ),
      sorter: (a, b) => new Date(a.updatedAt) - new Date(b.updatedAt)
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (_, date) => (
        moment(date.startDate).format('HH:mm, DD/MM/YYYY')
      ),
      sorter: (a, b) => new Date(a.startDate) - new Date(b.startDate)
    },
    {
      title: ' End Date',
      dataIndex: 'endDate',
      key: 'endDate',
      render: (_, date) => (
        moment(date.endDate).format('HH:mm, DD/MM/YYYY')
      ),
      sorter: (a, b) => new Date(a.endDate) - new Date(b.endDate)
    },
    {
      title: 'Working Space ID',
      dataIndex: 'workingSpaceId',
      key: 'workingSpaceId'
    },
    {
      title: 'Working Space Name',
      dataIndex: 'workingSpaceName',
      key: 'workingSpaceName'
    },
    {
      title: 'Location ID',
      dataIndex: 'locationId',
      key: 'locationId'
    },
    {
      title: 'Location Name',
      dataIndex: 'locationName',
      key: 'locationName'
    },
    {
      title: 'Bill',
      dataIndex: 'bill',
      key: 'bill',
      render: (_, link) => (
        <a href={link.bill ? link.bill : '#'}>Click To Open</a>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      fixed: 'right'
    }
  ]

  // const items = [
  //   {
  //     label: 'booking',
  //     key: '0'
  //   },
  //   {
  //     label: 'confirming',
  //     key: '1'
  //   },
  //   {
  //     label: 'confirmed',
  //     key: '2'
  //   },
  //   {
  //     label: 'booking_successful',
  //     key: '3'
  //   },
  //   {
  //     label: 'booking_expired',
  //     key: '4'
  //   },
  //   {
  //     label: 'payment_fail',
  //     key: '5'
  //   },
  // ];

  useEffect(() => {
    handleGetOrders();
  }, []);

  return (
    <div className='h-100 w-100 p-2'>
      <div>
        <Bcrumb
          data={[
            {
              label: 'Trang Chủ',
              path: '/',
            },
            {
              label: 'Admin Orders',
              active: true,
            },
          ]}
        />
      </div>
      <Table columns={columns} dataSource={orders}
        scroll={{
          x: 3500,
          y: 600
        }}
      />
    </div>
  );
}