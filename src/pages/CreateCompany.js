import React, { useEffect, useState } from 'react';
import Bcrumb from '../components/Bcrumb';
import { gql, useMutation, useLazyQuery } from '@apollo/client';
import { Form, Input } from 'antd';
import { handleMessage } from '../helpers/helpers';
import '../assets/styles/AdminOrders.scss';
import { useAuthContext } from '../context/auth';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/CreateCompany.scss';

export default function ListCompany() {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.roles[0]?.name === 'Member') {
      navigate('/');
    }
  }, [user]);
  const [form] = Form.useForm();

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
    ) {
      createCompany(
        data: {
          name: $name
          address: $address
          wardId: $wardId
          districtId: $districtId
          cityId: $cityId
          countryId: $countryId
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
    countryId: 'c2374186-4975-4c48-bf48-d699e88e77da'
  });
  const handleChangeData = (field, value) => {
    setData({ ...data, [field]: value });
  }
  const handleSubmit = async () => {
    try {
      let formData = {
        name: data.name,
        address: data.address,
        wardId: data.wardId,
        districtId: data.districtId,
        cityId: data.cityId,
        countryId: data.countryId
      }
      await createCompany({
        variables: formData
      });
      handleMessage('success', 'Thêm công ty thành công.');
      navigate('/admin/space/companies');
    } catch (err) {
      handleMessage('error', 'Thêm công ty không thành công.');
    }

  };

  useEffect(() => {
    handleGetDistricts('008c4432-0f9d-4d56-80e1-619010ed8c46');
    handleResetWard();
  }, []);

  useEffect(() => {
    handleGetWards(data.districtId);
  }, [data.districtId])


  return (
    <div className='h-100 w-100 p-5'>
      {user?.roles[0]?.name === 'WorkNow admin' && (
        <>
          <div>
            <Bcrumb
              data={[
                {
                  label: 'Trang Chủ',
                  path: '/'
                },
                {
                  label: 'Create New Company',
                  active: true
                },
              ]}
            />
          </div>
          <Form
            id='my_form'
            autoComplete='off'
            onFinish={handleSubmit}
            form={form}
          >
            <div>
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
                  className='form-control mb-0'
                  placeholder='Nhập vào tên địa điểm'
                  value={data.name}
                  onChange={(e) =>
                    handleChangeData('name', e.target.value)
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
                  className='form-control mb-0'
                  placeholder='Nhập vào địa chỉ'
                  value={data.address}
                  onChange={(e) =>
                    handleChangeData('address', e.target.value)
                  }
                />
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
                    name='district'
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng chọn tại đây',
                      },
                    ]}
                  >
                    <Select
                      placeholder='Chọn quận'
                      options={districtsList}
                      onChange={handleChangeDistrict}
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
                    name='ward'
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng chọn tại đây',
                      },
                    ]}
                  >
                    <Select
                      id='ward'
                      placeholder='Chọn phường'
                      options={wardsList}
                      onChange={handleChangeWard}
                    />
                  </Form.Item>
                </div>
              </div>
            </div>
            <button
              type='submit'
              form='my_form'
              className='btn submit-button mt-3'
            >
              Lưu
            </button>

          </Form>
        </>
      )}
    </div>
  );
}
