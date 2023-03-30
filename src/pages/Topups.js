import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import Topbar from '../components/AdminTopbar';
import { gql, useLazyQuery } from '@apollo/client';
import moment from 'moment';
import '../assets/styles/Topups.scss';
import { useAuthContext } from '../context/auth';
import { useNavigate } from 'react-router-dom';

export default function Topups() {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.roles[0]?.name === 'Member') {
      navigate('/');
    }
  }, [user]);
  const GET_TOPUPS = gql`
    query GetVouchers($page: Int!, $limit: Int!, $sort: String) {
      topups(params: { page: $page, limit: $limit, sort: $sort }) {
        edges {
          createdAt
          discountPercent
          id
          maxPrice
          minPrice
          updatedAt
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
  const [getTopups, { called, refetch }] = useLazyQuery(GET_TOPUPS, {
    fetchPolicy: 'no-cache',
  });
  const [topups, setVouchers] = useState([]);
  const [total, setTotal] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const handleGetTopups = async (number, size) => {
    let res = await getTopups({
      variables: {
        page: number,
        limit: size,
        sort: '-created_at',
      },
    });
    if (res.data) {
      setTotal(res.data.topups.pageInfo.count);
      let array = res.data.topups.edges.map((item, key) => ({ key, ...item }));
      setVouchers(array);
      console.log(array)
    }
  };

  useEffect(() => {
    handleGetTopups(pageNumber, pageSize);
  }, []);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Discount Percent',
      dataIndex: 'discountPercent',
      key: 'discountPercent',
    },
    {
      title: 'Max Price',
      dataIndex: 'maxPrice',
      key: 'maxPrice',
    },
    {
      title: 'Min Price',
      dataIndex: 'minPrice',
      key: 'minPrice'
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
  ];

  return (
    <div className='topups'>
      {user?.roles[0]?.name === 'WorkNow admin' && (
        <>
          <Topbar title='Quản lý Space Provider' />
          <div className='topups-container'>
            <div className='table-topups'>
              <div className='title'>Danh Sách Topups</div>
              <div className='content'>
                {/* <div className='action-bar'>
                  <div
                    onClick={() => navigate('/admin/voucher/new')}
                    className='add-voucher-button'
                  >
                    Thêm Voucher
                  </div>
                </div> */}
                <Table
                  columns={columns}
                  dataSource={[...topups]}
                  scroll={{
                    // x: 3500,
                    y: 600,
                  }}
                  className='table-custom'
                  pagination={{
                    defaultCurrent: pageNumber,
                    total: total,
                    onChange: (value, pageSize) => {
                      setPageNumber(value);
                      setPageSize(pageSize);
                      handleGetTopups(value, pageSize);
                    }
                  }}
                  onRow={(record, rowIndex) => {
                    return {
                      onClick: (event) => navigate(`/admin/topups/${record?.id}`)
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
