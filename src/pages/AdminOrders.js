import React, { useEffect, useState } from 'react';
import { Table, Dropdown, Space, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import Bcrumb from '../components/Bcrumb';
import { gql, useLazyQuery, useMutation } from '@apollo/client';
import moment from 'moment';
import { handleMessage } from '../helpers/helpers';
import '../assets/styles/AdminOrders.scss';

export default function AdminOrders() {
  const GET_ORDERS = gql`
  query GetOrders(
    $page: Int!
    $limit: Int!
  ){
    orders(
      params: {
        page: $page
        limit: $limit
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
        createdAt
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
  const [getOrders, { called, refetch }] = useLazyQuery(GET_ORDERS
    , {
      fetchPolicy: 'no-cache',
    }
  );
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const handleGetOrders = async (number, size) => {
    let res = await getOrders(
      {
        variables: {
          page: number,
          limit: size,
        },
      }
    );
    if (res.data) {
      setTotal(res.data.orders.pageInfo.count);
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
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (_, data) => (
        moment(data.createdAt).format('HH:mm, DD/MM/YYYY')
      ),
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    },
    {
      title: 'Updated At',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (_, data) => (
        moment(data.updatedAt).format('HH:mm, DD/MM/YYYY')
      ),
      sorter: (a, b) => new Date(a.updatedAt) - new Date(b.updatedAt)
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (_, data) => (
        moment(data.startDate).format('HH:mm, DD/MM/YYYY')
      ),
      sorter: (a, b) => new Date(a.startDate) - new Date(b.startDate)
    },
    {
      title: ' End Date',
      dataIndex: 'endDate',
      key: 'endDate',
      render: (_, data) => (
        moment(data.endDate).format('HH:mm, DD/MM/YYYY')
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
      render: (_, data) => (
        <a href={data.bill ? data.bill : '#'}>Click To Open</a>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      fixed: 'right',
      render: (_, data) => (
        <>
          {
            (
              data.status === 'booking' ||
              data.status === 'extended' ||
              data.status === 'booking_expired'
            ) ? data.status :
              (
                data.status === 'confirming' ?
                  <Dropdown
                    overlay={
                      <Menu>
                        <Menu.Item key={'1'} onClick={() => handleUpdateOrder(data.id, 'payment_fail', pageNumber, pageSize)}>
                          payment_fail
                        </Menu.Item>
                        <Menu.Item key={'2'} onClick={() => handleUpdateOrder(data.id, 'confirmed', pageNumber, pageSize)}>
                          confirmed
                        </Menu.Item>
                      </Menu>
                    }
                    forceRender
                    trigger={['click']}
                  >
                    <span className='pointer drop'>{data.status}</span>
                  </Dropdown> :
                  (
                    data.status === 'confirmed' ?
                      <Dropdown
                        overlay={
                          <Menu>
                            <Menu.Item key={'1'} onClick={() => handleUpdateOrder(data.id, 'booking_successfull', pageNumber, pageSize)}>
                              booking_successfull
                            </Menu.Item>
                            <Menu.Item key={'2'} onClick={() => handleUpdateOrder(data.id, 'canceled', pageNumber, pageSize)}>
                              canceled
                            </Menu.Item>
                          </Menu>
                        }
                        forceRender
                        trigger={['click']}
                      >
                        <span className='pointer drop'>{data.status}</span>
                      </Dropdown> :
                      (
                        data.status === 'booking_successfull' ?
                          <Dropdown
                            overlay={
                              <Menu>
                                <Menu.Item key={'1'} onClick={() => handleUpdateOrder(data.id, 'canceled', pageNumber, pageSize)}>
                                  canceled
                                </Menu.Item>
                              </Menu>
                            }
                            forceRender
                            trigger={['click']}
                          >
                            <span className='pointer drop'>{data.status}</span>
                          </Dropdown> :
                          (
                            data.status === 'payment_failed' ?
                              <Dropdown
                                overlay={
                                  <Menu>
                                    <Menu.Item key={'1'} onClick={() => handleUpdateOrder(data.id, 'confirmed', pageNumber, pageSize)}>
                                      confirmed
                                    </Menu.Item>
                                  </Menu>
                                }
                                forceRender
                                trigger={['click']}
                              >
                                <span className='pointer drop'>{data.status}</span>
                              </Dropdown> : data.status
                          )
                      )
                  )
              )
          }
        </>
      ),
      sorter: (a, b) => a.status.length - b.status.length
    }
  ]

  const menu = (
    <Menu>
      <Menu.Item>
        Profile
      </Menu.Item>
      <Menu.Item>
        Logout
      </Menu.Item>
    </Menu>
  );

  const UPDATE_ORDER = gql`
    mutation UpdateOrder(
      $orderId: UUID!
      $status: OrderStatus!
    ) {
      updateOrder(
        data: {
          orderId: $orderId
          status: $status
        }
      ) {
        id
      }
    }
  `;
  const [updateOrder] = useMutation(UPDATE_ORDER);

  const handleUpdateOrder = async (id, status, number, size) => {
    try {
      let res = await updateOrder({
        variables: {
          orderId: id,
          status: status,
        }
      });
      if (res.data) {
        await handleGetOrders(number, size);
        handleMessage('success', 'Cập nhật thành công!');
      }
    } catch (error) {
      console.log(error);
      handleMessage('error', 'Cập nhật không thành công!');
    }
  };

  useEffect(() => {
    handleGetOrders(pageNumber, pageSize);
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
      <Table
        columns={columns}
        dataSource={[...orders]}
        scroll={{
          x: 3500,
          y: 600
        }}
        pagination={{
          defaultCurrent: pageNumber,
          total: total,
          onChange: (value, pageSize) => {
            setPageNumber(value);
            setPageSize(pageSize);
            handleGetOrders(value, pageSize);
          }
        }}
      />
    </div>
  );
}