import React, { useEffect, useState } from 'react';
import Topbar from '../components/AdminTopbar';
import Bcrumb from '../components/Bcrumb';
import { gql, useMutation, useLazyQuery } from '@apollo/client';
import { Form, Input, Select } from 'antd';
import { handleMessage } from '../helpers/helpers';
import '../assets/styles/CreateSpaceProvider.scss';
import { useAuthContext } from '../context/auth';
import { useNavigate, useParams } from 'react-router-dom';
import '../assets/styles/CreateCompany.scss';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import parsePhoneNumber from 'libphonenumber-js';

export default function CreateSpaceProvider() {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (user?.roles[0]?.name === 'Member') {
      navigate('/');
    }
  }, [user]);
  const [form] = Form.useForm();

  const { id } = useParams();

  const SIGN_UP_SPACE_PROVIDER = gql`
    mutation signUpSpaceProvider(
      $fullname: String!
      $phoneNumber: String!
      $phoneCountryCode: String!
      $email: String!
      $password: String!
      $companyId: UUID!
    ) {
      signUpSpaceProvider(
        data: {
          fullname: $fullname
          phoneNumber: $phoneNumber
          phoneCountryCode: $phoneCountryCode
          email: $email
          password: $password
          companyId: $companyId
        }
      ) {
        id
      }
    }
  `;
  const [createSpaceProvider, { createdData, loading, error }] = useMutation(SIGN_UP_SPACE_PROVIDER);
  const [data, setData] = useState({
    email: '',
    password: '',
    fullname: '',
    phoneNumber: '',
    phoneCountryCode: '',
    companyId: id
  });
  const handleChangeData = (field, value) => {
    setData({ ...data, [field]: value });
  }
  const handleSubmit = async () => {
    try {
      let parse_phone = await parsePhoneNumber('+' + phone);
      let formData = {
        fullname: data.name,
        email: data.email,
        password: data.password,
        phoneNumber: parse_phone.nationalNumber,
        phoneCountryCode: parse_phone.countryCallingCode,
        companyId: data.companyId
      }
      await createSpaceProvider({
        variables: formData
      });
      handleMessage('success', 'Tạo space provider thành công.');
      navigate(`/admin/company/${id}`);
    } catch (err) {
      console.log(err)
      handleMessage('error', 'Tạo space provider không thành công.');
    }

  };

  return (
    <div className='create-space-provider'>
      {user?.roles[0]?.name === 'WorkNow admin' && (
        <>
          <Topbar title='Tạo NCC' />
          <div className='my-2'>
            <Bcrumb
              data={[
                {
                  label: 'Tạo NCC'
                }
              ]}
            />
          </div>
          <Form
            id='my_form'
            autoComplete='off'
            onFinish={handleSubmit}
            form={form}
          >
            <div className='create-company-container'>
            <div>
                <label className='custom-label-input my-2'>
                  Tên Đầy Đủ <span>*</span>
                </label>
                <Form.Item
                  name='name'
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng điền vào trường này.',
                    }
                  ]}
                >
                  <Input
                    placeholder='Nhập vào tên'
                    value={data.name}
                    onChange={(e) =>
                      handleChangeData('name', e.target.value)
                    }
                  />
                </Form.Item>
              </div>
              <div>
                <label className='custom-label-input my-2'>
                  Email <span>*</span>
                </label>
                <Form.Item
                  name='email'
                  rules={[
                    {
                      type: 'email',
                      message: 'Email không hợp lệ',
                    },
                    {
                      required: true,
                      message: 'Vui lòng điền vào trường này.',
                    }
                  ]}
                >
                  <Input
                    type='email'
                    placeholder='Nhập vào email'
                    value={data.name}
                    onChange={(e) =>
                      handleChangeData('email', e.target.value)
                    }
                  />
                </Form.Item>
              </div>
              <div>
              <label className='custom-label-input my-2'>
                Mật Khẩu <span>*</span>
              </label>
              <Form.Item
                name='password'
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng điền vào trường này.',
                  },
                  {
                    min: 6,
                    message: 'Mật khẩu phải có ít nhất 6 kí tự',
                  },
                ]}
              >
                <Input.Password
                  value={data.password}
                  placeholder='Nhập vào mật khẩu'
                  onChange={(e) =>
                    handleChangeData('password', e.target.value)
                  }
                />
              </Form.Item>
            </div>
            <div>
              <label className='custom-label-input my-2'>
                Nhập Lại Mật Khẩu <span>*</span>
              </label>
              <Form.Item
                name='confirm_password'
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng điền vào trường này.',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error('Mật Khẩu Không Trùng Khớp')
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  value={data.confirm_password}
                  placeholder='Nhập lại mật khẩu'
                  onChange={(e) =>
                    handleChangeData('confirm_password', e.target.value)
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
