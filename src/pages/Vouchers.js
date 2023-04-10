import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import Topbar from '../components/AdminTopbar';
import { gql, useLazyQuery } from '@apollo/client';
import moment from 'moment';
import { HiOutlineBuildingOffice2 } from 'react-icons/hi2';
import '../assets/styles/Vouchers.scss';
import { useAuthContext } from '../context/auth';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Voucher } from '../assets/icons/voucher_2.svg';

export default function Vouchers() {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.roles[0]?.name === 'Member') {
      navigate('/');
    }
  }, [user]);
  const GET_VOUCHERS = gql`
    query GetVouchers($page: Int!, $limit: Int!, $sort: String) {
      vouchers(params: { page: $page, limit: $limit, sort: $sort }) {
        edges {
          availabilityOption
          code
          costs
          description
          createdAt
          id
          name
          quantity
          redeemLimit
          startDate
          status
          updatedAt
          validDays
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
  const [getVouchers, { called, refetch }] = useLazyQuery(GET_VOUCHERS, {
    fetchPolicy: 'no-cache',
  });
  const [vouchers, setVouchers] = useState([]);
  const [total, setTotal] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const handleGetVouchers = async (number, size) => {
    let res = await getVouchers({
      variables: {
        page: number,
        limit: size,
        sort: '-created_at',
      },
    });
    if (res.data) {
      setTotal(res.data.vouchers.pageInfo.count);
      let array = res.data.vouchers.edges.map((item, key) => ({ key, ...item }));
      setVouchers(array);
      console.log(array)
    }
  };

  useEffect(() => {
    handleGetVouchers(pageNumber, pageSize);
  }, []);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Availability Option',
      dataIndex: 'availabilityOption',
      key: 'availabilityOption',
      render: (_, data) => {
        if (data) return 'True';
        return 'False';
      },
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
      title: 'Cost',
      dataIndex: 'costs',
      key: 'costs',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'RedeemLimit',
      dataIndex: 'redeemLimit',
      key: 'redeemLimit'
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (_, data) => moment(data.updatedAt).format('HH:mm, DD/MM/YYYY'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Valid Days',
      dataIndex: 'validDays',
      key: 'validDays',
    }
  ];

  return (
    <div className='vouchers'>
      {user?.roles[0]?.name === 'WorkNow admin' && (
        <>
          <Topbar title='Quản lý Space Provider' />
          <div className='vouchers-container'>
            <div className='table-vouchers'>
              <div className='title'>Danh Sách Vouchers</div>
              <div className='content'>
                <div className='action-bar'>
                  <div
                    onClick={() => navigate('/admin/voucher/new')}
                    className='add-voucher-button'
                  >
                    Thêm Voucher
                  </div>
                </div>
                <Table
                  columns={columns}
                  dataSource={[...vouchers]}
                  scroll={{
                    x: 3500,
                    y: 600,
                  }}
                  className='table-custom'
                  pagination={{
                    defaultCurrent: pageNumber,
                    total: total,
                    onChange: (value, pageSize) => {
                      setPageNumber(value);
                      setPageSize(pageSize);
                      handleGetVouchers(value, pageSize);
                    }
                  }}
                  onRow={(record, rowIndex) => {
                    return {
                      onClick: (event) => navigate(`/admin/vouchers/${record?.id}`)
                    };
                  }}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
