import React from 'react';
import UserLayout from '../layouts/UserLayout';
import '../assets/styles/UserProfile.scss';
import { Form, Input } from 'antd';
import { gql, useLazyQuery, useMutation } from '@apollo/client';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import parsePhoneNumber from 'libphonenumber-js';
import { handleError, handleMessage } from '../helpers/helpers';
import { useAuthContext } from '../context/auth';
import { useState } from 'react';
import { useEffect } from 'react';

export default function UserProfile() {
  const { updateUser } = useAuthContext();
  const [form] = Form.useForm();
  const GET_ME = gql`
    query GetMe {
      me {
        id
        fullname
        avatar
        avatarId
        birthday
        email
        phoneCountryCode
        phoneNumber
        status
      }
    }
  `;
  const [userInfo, setUserInfo] = useState({
    full_name: '',
    email: '',
    phone_number: '',
  });
  const handleChangeInfo = (field, value) => {
    setUserInfo({ ...userInfo, [field]: value });
  };
  const [getMe] = useLazyQuery(GET_ME, {
    fetchPolicy: 'no-cache',
    onError(err) {
      console.log(err);
    },
  });
  const [alreadyHasPhone, setAlreadyHasPhone] = useState(false);
  const handleGetMe = async () => {
    let res = await getMe();
    if (res.data) {
      let user = res.data.me;
      let initInfo = {
        full_name: user.fullname,
        email: user.email,
        note: '',
      };
      if (user.phoneNumber) {
        initInfo.phone_number = user.phoneCountryCode + user.phoneNumber;
        setAlreadyHasPhone(true);
      } else {
        initInfo.phone_number = '';
        setAlreadyHasPhone(false);
      }
      form.setFieldsValue(initInfo);
      setUserInfo(initInfo);
    }
  };
  useEffect(() => {
    handleGetMe();
  }, []);
  const UPDATE_ME = gql`
    mutation UpdateMe(
      $fullname: String!
      $phoneCountryCode: String
      $phoneNumber: String
    ) {
      updateMe(
        data: {
          fullname: $fullname
          phoneCountryCode: $phoneCountryCode
          phoneNumber: $phoneNumber
        }
      ) {
        id
        fullname
        phoneCountryCode
        phoneNumber
      }
    }
  `;
  const [updateMe] = useMutation(UPDATE_ME, {
    update(_, { data: { updateMe: userData } }) {
      handleGetMe();
      handleMessage('success', 'Cập nhật thành công.');
      updateUser(userData);
    },
    onError(err) {
      console.log(err);
      handleMessage(
        'error',
        handleError(err.graphQLErrors[0]?.message, 'Cập nhật không thành công.')
      );
    },
  });
  const handleSubmit = async () => {
    let bodyData = {
      fullname: userInfo.full_name,
      password: userInfo.password,
    };
    if (userInfo.phone_number) {
      let parse_phone = await parsePhoneNumber('+' + userInfo.phone_number);
      bodyData.phoneCountryCode = parse_phone.countryCallingCode;
      bodyData.phoneNumber = parse_phone.nationalNumber;
    }
    updateMe({
      variables: bodyData,
    });
  };
  return (
    <UserLayout currentTab='profile'>
      <div className='user-profile p-4'>
        <h4 className='fw-bold'>THÔNG TIN CÁ NHÂN</h4>
        <Form
          id='user_info_form'
          autoComplete='off'
          onFinish={handleSubmit}
          // initialValues={{ remember: true }}
          form={form}
        >
          <div className='mb-0'>
            <label className='fw-bold'>Email</label>
            <Form.Item name='email'>
              <Input
                className='input-field py-2'
                disabled
                value={userInfo.email}
              />
            </Form.Item>
          </div>
          <div className='mb-0'>
            <label className='fw-bold'>Họ Tên</label>
            <Form.Item
              name='full_name'
              rules={[
                {
                  required: true,
                  message: 'Vui lòng điền vào trường này.',
                },
              ]}
            >
              <Input
                className='input-field py-2'
                placeholder='Nhập vào tên của bạn'
                value={userInfo.full_name}
                onChange={(e) => handleChangeInfo('full_name', e.target.value)}
              />
            </Form.Item>
          </div>
          {/* <Form.Item name='gender'>
                          <label className='fw-bold'>Giới Tính</label>
                          <Input
                            className='input-field py-2'
                            placeholder='Nhập vào giới tính của bạn'
                          />
                        </Form.Item>
                        <Form.Item name='address'>
                          <label className='fw-bold'>Địa Chỉ</label>
                          <Input
                            className='input-field py-2'
                            placeholder='Nhập vào địa chỉ của bạn'
                          />
                        </Form.Item>
                        <Form.Item name='phone-code'>
                          <label className='fw-bold'>Tỉnh, Thành</label>
                          <Select size='large' defaultValue='Hồ Chí Minh'>
                            <Option value='Hồ Chí Minh'>Hồ Chí Minh</Option>
                            <Option value='Hà Nội'>Hà Nội</Option>
                          </Select>
                        </Form.Item> */}
          <div className='mb-0'>
            <label className='fw-bold'>Số điện thoại</label>
            <Form.Item
              name='phone'
              rules={[
                {
                  async validator(_, value) {
                    if (userInfo.phone_number) {
                      let parse_phone = await parsePhoneNumber(
                        '+' + userInfo.phone_number
                      );
                      if (parse_phone?.isValid() !== true) {
                        return Promise.reject(
                          new Error('Số điện thoại không hợp lệ')
                        );
                      }
                      return Promise.resolve();
                    } else {
                      if (alreadyHasPhone) {
                        return Promise.reject(
                          new Error('Vui lòng điền vào trường này.')
                        );
                      } else {
                        return Promise.resolve();
                      }
                    }
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
                  placeholder=''
                  country={'vn'}
                  enableSearch={true}
                  value={userInfo.phone_number}
                  onChange={(phone) => handleChangeInfo('phone_number', phone)}
                />
              </div>
            </Form.Item>
          </div>
          <Form.Item className='text-end'>
            <button type='submit' form='user_info_form' className='update-btn'>
              Cập Nhật
            </button>
          </Form.Item>
        </Form>
      </div>
    </UserLayout>
  );
}
