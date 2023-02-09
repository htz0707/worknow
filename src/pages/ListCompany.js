import React, { useEffect, useState } from 'react';
import { Table, Dropdown, Menu } from 'antd';
import Bcrumb from '../components/Bcrumb';
import { gql, useLazyQuery, useMutation } from '@apollo/client';
import moment from 'moment';
import { handleMessage } from '../helpers/helpers';
import '../assets/styles/AdminOrders.scss';
import { useAuthContext } from '../context/auth';
import { useNavigate } from 'react-router-dom';

export default function ListCompany() {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.roles[0]?.name === 'Member') {
      navigate('/');
    }
  }, [user]);
  const GET_COMPANIES = gql`
    query GetCompanies($page: Int!, $limit: Int!, $sort: String) {
      companies(params: { page: $page, limit: $limit, sort: $sort }) {
        edges {
          id
          name
          address
          phoneNumber
          phoneCountryCode
          createdAt
          updatedAt
          district {
            name
          }
          ward {
            name
          }
          country {
            name
          }
          city {
            name
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
  const [getCompanies, { called, refetch }] = useLazyQuery(GET_COMPANIES, {
    fetchPolicy: 'no-cache',
  });
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const handleGetCompanies = async (number, size) => {
    let res = await getCompanies({
      variables: {
        page: number,
        limit: size,
        sort: '-created_at',
      },
    });
    if (res.data) {
      setTotal(res.data.companies.pageInfo.count);
      let array = res.data.companies.edges.map((item, key) => ({ key, ...item }));

      for (const item of array) {
        // item.startDate = item.orderDetails[0]?.startDate;
        // item.endDate = item.orderDetails[0]?.endDate;
        // item.workingSpaceId = item.orderDetails[0]?.workingSpaceId;
        // item.workingSpaceName = item.orderDetails[0]?.workingSpaces?.name;
        // item.locationId = item.orderDetails[0]?.workingSpaces?.locationId;
        if (item.phoneNumber) {
          item.phoneNumber = '+' + item?.phoneCountryCode + item?.phoneNumber;
        }
        else item.phoneNumber = 'No phone number';
        item.city = item.city?.name;
        item.country = item.country?.name;
        item.district = item.district?.name;
        item.ward = item?.ward?.name;
        // item.locationName = item.orderDetails[0]?.workingSpaces?.locationName;
        // item.bill = item.orderTransactions.bill;
      }
      console.log(array)
      setData(array);
    }
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },

    {
      title: 'Phone number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (_, data) => moment(data.createdAt).format('HH:mm, DD/MM/YYYY'),
      // sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    },
    {
      title: 'Updated At',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (_, data) => moment(data.updatedAt).format('HH:mm, DD/MM/YYYY'),
      // sorter: (a, b) => new Date(a.updatedAt) - new Date(b.updatedAt)
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
    },
    {
      title: 'District',
      dataIndex: 'district',
      key: 'district',
    },
    {
      title: 'Ward',
      dataIndex: 'ward',
      key: 'ward',
    },
  ];

  // const UPDATE_ORDER = gql`
  //   mutation UpdateOrder($orderId: UUID!, $status: OrderStatus!) {
  //     updateOrder(data: { orderId: $orderId, status: $status }) {
  //       id
  //     }
  //   }
  // `;
  // const [updateOrder] = useMutation(UPDATE_ORDER);

  // const handleUpdateOrder = async (id, status, number, size) => {
  //   try {
  //     let res = await updateOrder({
  //       variables: {
  //         orderId: id,
  //         status: status,
  //       },
  //     });
  //     if (res.data) {
  //       await handleGetOrders(number, size);
  //       handleMessage('success', 'Cập nhật thành công!');
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     handleMessage('error', 'Cập nhật không thành công!');
  //   }
  // };

  useEffect(() => {
    handleGetCompanies(pageNumber, pageSize);
  }, []);

  return (
    <div className='h-100 w-100 p-2'>
      {user?.roles[0]?.name === 'WorkNow admin' && (
        <>
          <div>
            <Bcrumb
              data={[
                {
                  label: 'Trang Chủ',
                  path: '/',
                },
                {
                  label: 'List Company',
                  active: true,
                },
              ]}
            />
          </div>
          <Table
            columns={columns}
            dataSource={[...data]}
            scroll={{
              x: 3500,
              y: 600,
            }}
            pagination={{
              defaultCurrent: pageNumber,
              total: total,
              onChange: (value, pageSize) => {
                setPageNumber(value);
                setPageSize(pageSize);
                handleGetCompanies(value, pageSize);
              },
            }}
          />
          <button
            className='btn btn-secondary'
            onClick={() => navigate('/admin/space/company/new')}
          >
            Create new company
          </button>
          {/* <button
            type='button'
            onClick={() => { console.log(data.abc.map((item) => item)) }}
          >
            Do not click
          </button> */}
        </>
      )}
    </div>
  );
}
