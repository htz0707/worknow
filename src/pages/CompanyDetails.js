import React, { useEffect, useState } from 'react';
import Topbar from '../components/AdminTopbar';
import Bcrumb from '../components/Bcrumb';
import { gql, useMutation, useLazyQuery } from '@apollo/client';
import { Form, Input, Select, Table } from 'antd';
import { handleMessage } from '../helpers/helpers';
import '../assets/styles/CompanyDetails.scss';
import { useAuthContext } from '../context/auth';
import { useNavigate, useParams } from 'react-router-dom';
import '../assets/styles/CreateCompany.scss';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import parsePhoneNumber from 'libphonenumber-js';
import moment from 'moment';

export default function CompanyDetails() {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (user?.roles[0]?.name === 'Member') {
      navigate('/');
    }
  }, [user]);
  const [form] = Form.useForm();

  const [phone, setPhone] = useState(localStorage.getItem('companyPhoneNumber'));
  const [name, setName] = useState(localStorage.getItem('companyName'));
  const [address, setAddress] = useState(localStorage.getItem('companyAddress'));
  const [countryId, setCountryId] = useState(localStorage.getItem('countryId'));
  const [cityId, setCityId] = useState(localStorage.getItem('cityId'));
  const [districtId, setDistrictId] = useState(localStorage.getItem('districtId'));
  const [wardId, setWardId] = useState(localStorage.getItem('wardId'));

  const handleSetInitFields = () => {
    form.setFieldValue('name', name);
    form.setFieldValue('address', address);
  }

  const GET_WARDS = gql`
    query getWards(
      $districtId: UUID!
    ) {
      wards(
        params: {
        districtId: $districtId
        }
      ) {
        edges {
          id
          name
        }
      }
    }
  `;

  const [getWards] = useLazyQuery(GET_WARDS);
  const [wardsList, setWardsList] = useState([]);
  const handleGetWards = async (id) => {
    let res = await getWards(
      {
        variables: {
          districtId: id
        }
      }
    );
    if (res.data) {
      let filter = res.data?.wards?.edges.map((item) => ({
        ...item,
        value: item.id,
        label: item.name
      }));
      setWardsList(filter);
    }
  }

  const handleChangeWard = (value) => {
    setData({ ...data, wardId: value });
  }

  const GET_DISTRICTS = gql`
    query getDistricts(
      $cityId: UUID!
    ) {
      districts(
        params: {
          cityId: $cityId
        }
      ) {
        edges {
          id
          name
        }
      }
    }
  `;
  const [getDistricts] = useLazyQuery(GET_DISTRICTS);
  const [districtsList, setDistrictsList] = useState([]);
  const handleGetDistricts = async (id) => {
    let res = await getDistricts(
      {
        variables: {
          cityId: id
        }
      }
    );
    if (res.data) {
      let filter = res.data?.districts?.edges.map((item) => ({
        ...item,
        value: item.id,
        label: item.name
      }));
      setDistrictsList(filter)
    }
  }

  const clearField = (field) => {
    form.setFieldValue(field, null);
  }

  const handleResetWard = () => {
    clearField('ward');
    handleChangeWard('');
  }

  const handleChangeDistrict = (value) => {
    setData({ ...data, districtId: value });
  }

  const CREATE_COMPANY = gql`
    mutation CreateCompany(
      $name: String!
      $address: String!
      $wardId: UUID!
      $districtId: UUID!
      $cityId: UUID!
      $countryId: UUID!
      $phoneNumber: String
      $phoneCountryCode: String
    ) {
      createCompany(
        data: {
          name: $name
          address: $address
          wardId: $wardId
          districtId: $districtId
          cityId: $cityId
          countryId: $countryId
          phoneNumber: $phoneNumber
          phoneCountryCode: $phoneCountryCode
        }
      ) {
        id
      }
    }
  `;
  const [createCompany, { createdData, loading, error }] = useMutation(CREATE_COMPANY);
  const [data, setData] = useState({
    name: '',
    address: '',
    wardId: '',
    districtId: '',
    cityId: '008c4432-0f9d-4d56-80e1-619010ed8c46',
    countryId: 'c2374186-4975-4c48-bf48-d699e88e77da',
    phoneNumber: '',
    phoneCountryCode: '',
  });
  const handleChangeData = (field, value) => {
    setData({ ...data, [field]: value });
  }

  const GET_USERS = gql`
    query GetUsers {
      users(params: {}) {
        edges {
          id
          fullname
          phoneNumber
          phoneCountryCode
          createdAt
          createdBy
          updatedAt
          birthday
          companyId
          email
          employeeId
          note
          status
          roles {
            name
          }
        }
      }
    }
  `;
  const [getUsers, { called, refetch }] = useLazyQuery(GET_USERS, {
    fetchPolicy: 'no-cache',
  });
  const [spaceData, setSpaceData] = useState([]);

  const handleGetUsers = async (number, size) => {
    let res = await getUsers();
    if (res.data) {
      let array = res.data.users.edges.map((item, key) => ({ key, ...item }));

      let spaceArray = [];

      array.forEach(element => {
        if (element?.companyId === id) {
          spaceArray.push(element);
        }
      });

      for (const item of spaceArray) {
        if (item.phoneNumber) {
          item.phone = '+' + item?.phoneCountryCode + item?.phoneNumber;
        }
        item.role = item?.roles[0]?.name;
      }
      setSpaceData(spaceArray);
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
      dataIndex: 'fullname',
      key: 'fullname',
    },
    {
      title: 'Birthday',
      dataIndex: 'birthday',
      key: 'birthday',
    },
    {
      title: 'Phone number',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Created By',
      dataIndex: 'createdBy',
      key: 'createdBy'
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (_, data) => moment(data.createdAt).format('HH:mm, DD/MM/YYYY')
    },
    {
      title: 'Updated At',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (_, data) => moment(data.updatedAt).format('HH:mm, DD/MM/YYYY')
    },
    {
      title: 'Employee ID',
      dataIndex: 'employeeId',
      key: 'employeeId'
    },
    {
      title: 'Note',
      dataIndex: 'note',
      key: 'note'
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status'
    }
  ];

  useEffect(() => {
    handleGetDistricts('008c4432-0f9d-4d56-80e1-619010ed8c46');
    handleResetWard();
    handleSetInitFields();
    handleGetUsers();
  }, []);

  useEffect(() => {
    handleGetWards(districtId);
  }, [districtId])

  return (
    <div className='company-details'>
      {user?.roles[0]?.name === 'WorkNow admin' && (
        <>
          <Topbar title='Thông Tin Công Ty' />
          <div className='my-2'>
            <Bcrumb
              data={[
                {
                  label: 'Thông Tin Công Ty'
                }
              ]}
            />
          </div>
          <Form
            id='my_form'
            autoComplete='off'
            // onFinish={handleSubmit}
            form={form}
          >
            <div className='create-company-container'>
              <label className='custom-label-input my-2'>
                Tên Công Ty <span>*</span>
              </label>
              <Form.Item
                name='name'
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng điền vào trường này.',
                  },
                ]}
              >
                <Input
                  disabled
                  className='form-control mb-0'
                  placeholder='Nhập vào tên địa điểm'
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                />
              </Form.Item>
            </div>
            <div>
              <label className='custom-label-input my-2'>
                Địa Chỉ <span>*</span>
              </label>
              <Form.Item
                name='address'
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng điền vào trường này.',
                  },
                ]}
              >
                <Input
                  disabled
                  className='form-control mb-0'
                  placeholder='Nhập vào địa chỉ'
                  value={data.address}
                  onChange={(e) =>
                    handleChangeData('address', e.target.value)
                  }
                />
              </Form.Item>
            </div>
            <div>
              <label className='custom-label-input my-2'>
                Số Điện Thoại <span>*</span>
              </label>
              <Form.Item
                name='phone'
                rules={[
                  {
                    async validator(_, value) {
                      if (phone) {
                        let parse_phone = await parsePhoneNumber(
                          '+' + phone
                        );
                        if (parse_phone?.isValid() !== true) {
                          return Promise.reject(
                            new Error('Số điện thoại không hợp lệ')
                          );
                        }
                        return Promise.resolve();
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <div className='phone-input-engine'>
                  <PhoneInput
                    disabled
                    inputProps={{
                      id: 'phone_number',
                      name: 'phone',
                    }}
                    placeholder='Vui lòng điền vào trường này.'
                    country={'vn'}
                    enableSearch={true}
                    value={phone}
                    onChange={(phone) =>
                      setPhone(phone)
                    }
                  />
                </div>
              </Form.Item>
            </div>
            <div className='row'>
              <div className='col-lg-3 col-md-6'>
                <div>
                  <label className='custom-label-input my-2'>
                    Quốc Gia
                  </label>
                  <Form.Item
                    name='country'
                    initialValue='Việt Nam'
                  >
                    <Input
                      className='mb-0'
                      disabled
                    />
                  </Form.Item>
                </div>
              </div>
              <div className='col-lg-3 col-md-6'>
                <div>
                  <label className='custom-label-input my-2'>
                    Thành Phố <span>*</span>
                  </label>
                  <Form.Item
                    name='city'
                    initialValue='008c4432-0f9d-4d56-80e1-619010ed8c46'
                  >
                    <Select
                      disabled
                      options={[
                        {
                          value: '008c4432-0f9d-4d56-80e1-619010ed8c46',
                          label: 'Hồ Chí Minh',
                        }
                      ]}
                    />
                  </Form.Item>
                </div>
              </div>
              <div className='col-lg-3 col-md-6'>
                <div>
                  <label className='custom-label-input my-2'>
                    Quận <span>*</span>
                  </label>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng chọn tại đây',
                      },
                    ]}
                  >
                    <Select
                      disabled
                      value={districtId}
                      options={districtsList}
                      onChange={(value) => setDistrictId(value)}
                    />
                  </Form.Item>
                </div>
              </div>
              <div className='col-lg-3 col-md-6'>
                <div>
                  <label className='custom-label-input my-2'>
                    Phường <span>*</span>
                  </label>
                  <Form.Item
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng chọn tại đây',
                      },
                    ]}
                  >
                    <Select
                      disabled
                      id='ward'
                      placeholder='Chọn phường'
                      options={wardsList}
                      value={wardId}
                      onChange={(value) => setWardId(value)}
                    />
                  </Form.Item>
                </div>
              </div>
            </div>
          </Form>

          <Table
            columns={columns}
            dataSource={[...spaceData]}
            scroll={{
              x: 3500,
              y: 600,
            }}
          />
          <button
            className='btn submit-button mt-3'
            onClick={() => navigate(`/admin/company/${id}/space-provider/new`)}
          >
            Tạo tài khoản NCC
          </button>
        </>
      )}
    </div>
  );
}
