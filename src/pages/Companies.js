import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import Topbar from '../components/AdminTopbar';
import { gql, useLazyQuery } from '@apollo/client';
import moment from 'moment';
import { HiOutlineBuildingOffice2 } from 'react-icons/hi2';
import '../assets/styles/Companies.scss';
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
            id
            name
          }
          ward {
            id
            name
          }
          country {
            id
            name
          }
          city {
            id
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
        item.cityName = item.city?.name;
        item.countryName = item.country?.name;
        item.districtName = item.district?.name;
        item.wardName = item?.ward?.name;
        item.cityId = item.city?.id;
        item.countryId = item.country?.id;
        item.districtId = item.district?.id;
        item.wardId = item?.ward?.id;
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
      dataIndex: 'countryName',
      key: 'country',
    },
    {
      title: 'City',
      dataIndex: 'cityName',
      key: 'city',
    },
    {
      title: 'District',
      dataIndex: 'districtName',
      key: 'district',
    },
    {
      title: 'Ward',
      dataIndex: 'wardName',
      key: 'ward',
    },
  ];

  const handleSetSelectedCompany = (company) => {
    console.log(company)
    localStorage.setItem('companyName', company?.name);
    localStorage.setItem('companyAddress', company?.address);
    localStorage.setItem('companyPhoneNumber', company?.phoneNumber);
    localStorage.setItem('companyPhoneCountryCode', company?.phoneCountryCode);
    localStorage.setItem('cityId', company?.cityId);
    localStorage.setItem('countryId', company?.countryId);
    localStorage.setItem('districtId', company?.districtId);
    localStorage.setItem('wardId', company?.wardId);
    navigate(`/admin/company/${company?.id}`);
  }

  useEffect(() => {
    handleGetCompanies(pageNumber, pageSize);
  }, []);

  return (
    <div className='companies'>
      {user?.roles[0]?.name === 'WorkNow admin' && (
        <>
          <Topbar title='Quản lý Space Provider' />
          <div className='companies-container'>
            <div className='table-companies'>
              <div className='title'>Danh Sách Công Ty</div>
              <div className='content'>
                <div className='action-bar'>
                  <div
                    onClick={() => navigate('/admin/company/new')}
                    className='add-companies-button'
                  >
                    <HiOutlineBuildingOffice2 className='me-2' /> Thêm Công Ty
                  </div>
                </div>
                <Table
                  columns={columns}
                  dataSource={[...data]}
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
                      handleGetCompanies(value, pageSize);
                    }
                  }}
                  onRow={(record, rowIndex) => {
                    return {
                      onClick: (event) => handleSetSelectedCompany(record)
                    };
                  }}
                />
              </div>
            </div>
          </div>
          {/* <button
            className='btn btn-secondary'
            onClick={() => navigate('/admin/space/company/new')}
          >
            Create new company
          </button> */}
        </>
      )}
    </div>
  );
}
