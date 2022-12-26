import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md';
import Avatar from '../assets/images/default_avatar.png';
import Room from '../assets/images/room.png';
import { ReactComponent as Info } from '../assets/icons/thongtin.svg';
import { ReactComponent as Voucher } from '../assets/icons/voucher.svg';
import { ReactComponent as Giaodich } from '../assets/icons/giaodich.svg';
import { ReactComponent as Lockout } from '../assets/icons/lockout.svg';
import { ReactComponent as Secure } from '../assets/icons/secure.svg';
import { ReactComponent as Camera } from '../assets/icons/camera.svg';
import { ReactComponent as Calendar } from '../assets/icons/calendar_2.svg';
import { ReactComponent as Clock } from '../assets/icons/clock_2.svg';
import '../assets/styles/User.scss';
import { Form, Button, Input, Select, Tabs } from 'antd';
import { gql, useLazyQuery, useMutation } from '@apollo/client';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import parsePhoneNumber from 'libphonenumber-js';
import { handleError, handleMessage } from '../helpers/helpers';
import { useAuthContext } from '../context/auth';

export default function User() {
  const { user, logout, updateUser } = useAuthContext();
  const { Option } = Select;
  const [form] = Form.useForm();
  const { currentTab } = useParams();
  const navigate = useNavigate();
  const handleSetTab = (n) => {
    navigate(`/user/${n}`);
  };
  const handleToHomePage = () => {
    navigate('/');
  };
  const handleLogout = () => {
    logout();
    navigate('/locations');
  };
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
      // let user = JSON.parse(localStorage.getItem('user'));
      // let updateUser = { ...user, ...userData };
      // console.log(updateUser);
      // localStorage.setItem('user', JSON.stringify(updateUser));
    },
    onError(err) {
      console.log(err);
      handleMessage(
        'error',
        handleError(err.graphQLErrors[0]?.message, 'Cập nhật không thành công.')
      );
      // console.log(err.graphQLErrors[0].extensions.exception.errors);
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
    <div className='user'>
      <div className='container-fluid'>
        <div className='user-layout page-container'>
          {currentTab != 'security' && (
            <>
              <div className='d-flex align-items-center'>
                <MdArrowBack
                  className='me-2 mb-0 pointer'
                  size={20}
                  onClick={handleToHomePage}
                />{' '}
                <h6 className='mb-0 text-bold'> Thông Tin Tài Khoản</h6>
              </div>
              <div className='row mt-3'>
                <div className='align-items-center border rounded col-lg-5 mb-3 py-2 px-4'>
                  <div className='d-flex'>
                    <div className='avatar-block position-relative'>
                      <Camera className='position-absolute camera' />
                      <img
                        className='user-avatar rounded-circle'
                        src={user.avatar || Avatar}
                        alt='avatar'
                      />
                    </div>
                    <div className='pt-2 ps-3'>
                      <p className='mb-0 text-big'>{user.fullname}</p>
                      <p className='mb-0 text-gray'>{user.email}</p>
                    </div>
                  </div>
                  <hr />
                  <div
                    className={`d-flex rounded-pill border tab${
                      currentTab === 'profile' ? ' tab-active' : ''
                    }`}
                    onClick={() => handleSetTab('profile')}
                  >
                    <Info className='tab-icon-1' />
                    <p className='text-tab-1'> Thông Tin Cá Nhân</p>
                  </div>
                  <div
                    className={`d-flex mt-2 rounded-pill border tab${
                      currentTab === 'voucher' ? ' tab-active' : ''
                    }`}
                    onClick={() => handleSetTab('voucher')}
                  >
                    <Voucher className='tab-icon-2' />
                    <p className='text-tab-2'> Voucher Của Tôi</p>
                  </div>
                  <div
                    className={`d-flex mt-2 rounded-pill border tab${
                      currentTab === 'history' ? ' tab-active' : ''
                    }`}
                    onClick={() => handleSetTab('history')}
                  >
                    <Giaodich className='tab-icon-2' />
                    <p className='text-tab-2'>Giao Dịch Của Tôi</p>
                  </div>
                  <hr />
                  <div
                    className='d-flex mb-2 pointer'
                    onClick={() => handleSetTab('security')}
                  >
                    <Secure className />
                    <p className='text-secure mb-0'>Bảo mật</p>
                  </div>
                  <div className='text-log-out pointer' onClick={handleLogout}>
                    <Lockout /> Đăng xuất
                  </div>
                </div>
                <div className='col-lg-7 m-0 p-0'>
                  {currentTab === 'profile' && (
                    <div className='border rounded ms-lg-3 py-2 px-3 mb-3'>
                      <h4 className='fw-bold my-3'>THÔNG TIN CÁ NHÂN</h4>
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
                              onChange={(e) =>
                                handleChangeInfo('full_name', e.target.value)
                              }
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
                                        new Error(
                                          'Vui lòng điền vào trường này.'
                                        )
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
                                onChange={(phone) =>
                                  handleChangeInfo('phone_number', phone)
                                }
                              />
                            </div>
                          </Form.Item>
                        </div>
                        <Form.Item className='text-end'>
                          <button
                            type='submit'
                            form='user_info_form'
                            className='update-btn'
                          >
                            Cập Nhật
                          </button>
                        </Form.Item>
                      </Form>
                    </div>
                  )}

                  {currentTab === 'history' && (
                    <div className='border rounded ms-lg-3 py-2 px-3 mb-3'>
                      <h4 className='fw-bold my-3'>GIAO DỊCH CỦA TÔI</h4>
                      <Tabs
                        defaultActiveKey='1'
                        items={[
                          {
                            label: `Sắp Diễn Ra`,
                            key: '1',
                            children: (
                              <>
                                <div className='mb-2 text-gray-2'>Gần nhất</div>
                                <div className='history-card mx-1 row'>
                                  <div className='col-auto py-2 pe-0'>
                                    <img
                                      className='card-image'
                                      src={Room}
                                      alt='room'
                                    />
                                  </div>
                                  <div className='col py-2'>
                                    <div className='text-header mb-2'>
                                      <span className='text-blue'>#123456</span>{' '}
                                      - CIRCO ĐÔNG DU
                                    </div>
                                    <div className='text-name mb-2'>
                                      Bàn Làm Việc Cá Nhân
                                    </div>
                                    <div className='text-gray mb-1'>
                                      <Calendar height={20} className='mb-1' />{' '}
                                      15/01/2022
                                    </div>
                                    <div className='text-gray'>
                                      <Clock height={20} className='mb-1' />{' '}
                                      10:00 - 15:00
                                    </div>
                                  </div>
                                </div>
                                <div className='mt-2 text-gray-2'>
                                  Bạn có 3 đơn đã đặt
                                </div>
                                <div className='mx-1 row'>
                                  <div className='col-auto py-2 pe-0'>
                                    <img
                                      className='card-image'
                                      src={Room}
                                      alt='room'
                                    />
                                  </div>
                                  <div className='col py-2'>
                                    <div className='text-header mb-2'>
                                      <span className='text-blue'>#123456</span>{' '}
                                      - CIRCO ĐÔNG DU
                                    </div>
                                    <div className='text-name mb-2'>
                                      Bàn Làm Việc Cá Nhân
                                    </div>
                                    <div className='text-gray mb-1'>
                                      <Calendar height={20} className='mb-1' />{' '}
                                      15/01/2022
                                    </div>
                                    <div className='text-gray'>
                                      <Clock height={20} className='mb-1' />{' '}
                                      10:00 - 15:00
                                    </div>
                                  </div>
                                </div>
                                <hr />
                                <div className='mx-1 row'>
                                  <div className='col-auto py-2 pe-0'>
                                    <img
                                      className='card-image'
                                      src={Room}
                                      alt='room'
                                    />
                                  </div>
                                  <div className='col py-2'>
                                    <div className='text-header mb-2'>
                                      <span className='text-blue'>#123456</span>{' '}
                                      - CIRCO ĐÔNG DU
                                    </div>
                                    <div className='text-name mb-2'>
                                      Bàn Làm Việc Cá Nhân
                                    </div>
                                    <div className='text-gray mb-1'>
                                      <Calendar height={20} className='mb-1' />{' '}
                                      15/01/2022
                                    </div>
                                    <div className='text-gray'>
                                      <Clock height={20} className='mb-1' />{' '}
                                      10:00 - 15:00
                                    </div>
                                  </div>
                                </div>
                                <hr />
                                <div className='mx-1 row'>
                                  <div className='col-auto py-2 pe-0'>
                                    <img
                                      className='card-image'
                                      src={Room}
                                      alt='room'
                                    />
                                  </div>
                                  <div className='col py-2'>
                                    <div className='text-header mb-2'>
                                      <span className='text-blue'>#123456</span>{' '}
                                      - CIRCO ĐÔNG DU
                                    </div>
                                    <div className='text-name mb-2'>
                                      Bàn Làm Việc Cá Nhân
                                    </div>
                                    <div className='text-gray mb-1'>
                                      <Calendar height={20} className='mb-1' />{' '}
                                      15/01/2022
                                    </div>
                                    <div className='text-gray'>
                                      <Clock height={20} className='mb-1' />{' '}
                                      10:00 - 15:00
                                    </div>
                                  </div>
                                </div>
                                <hr />
                              </>
                            ),
                          },
                          {
                            label: `Hàng Chờ Xác Thực`,
                            key: '2',
                            children: (
                              <>
                                <div className='mt-2 text-gray-2'>
                                  Bạn có 3 đơn trong hàng chờ xác thực
                                </div>
                                <div className='mx-1 row'>
                                  <div className='col-auto py-2 pe-0'>
                                    <img
                                      className='card-image'
                                      src={Room}
                                      alt='room'
                                    />
                                  </div>
                                  <div className='col py-2'>
                                    <div className='text-header mb-2'>
                                      <span className='text-blue'>#123456</span>{' '}
                                      - CIRCO ĐÔNG DU
                                    </div>
                                    <div className='text-name mb-2'>
                                      Bàn Làm Việc Cá Nhân
                                    </div>
                                    <div className='text-gray mb-1'>
                                      <Calendar height={20} className='mb-1' />{' '}
                                      15/01/2022
                                    </div>
                                    <div className='text-gray'>
                                      <Clock height={20} className='mb-1' />{' '}
                                      10:00 - 15:00
                                    </div>
                                    <div className='text-orange'>
                                      Chờ xác thực từ admin
                                    </div>
                                  </div>
                                </div>
                                <hr />
                                <div className='mx-1 row'>
                                  <div className='col-auto py-2 pe-0'>
                                    <img
                                      className='card-image'
                                      src={Room}
                                      alt='room'
                                    />
                                  </div>
                                  <div className='col py-2'>
                                    <div className='text-header mb-2'>
                                      <span className='text-blue'>#123456</span>{' '}
                                      - CIRCO ĐÔNG DU
                                    </div>
                                    <div className='text-name mb-2'>
                                      Bàn Làm Việc Cá Nhân
                                    </div>
                                    <div className='text-gray mb-1'>
                                      <Calendar height={20} className='mb-1' />{' '}
                                      15/01/2022
                                    </div>
                                    <div className='text-gray'>
                                      <Clock height={20} className='mb-1' />{' '}
                                      10:00 - 15:00
                                    </div>
                                    <div className='text-orange'>
                                      Chờ xác thực từ admin
                                    </div>
                                  </div>
                                </div>
                                <hr />
                                <div className='mx-1 row'>
                                  <div className='col-auto py-2 pe-0'>
                                    <img
                                      className='card-image'
                                      src={Room}
                                      alt='room'
                                    />
                                  </div>
                                  <div className='col py-2'>
                                    <div className='text-header mb-2'>
                                      <span className='text-blue'>#123456</span>{' '}
                                      - CIRCO ĐÔNG DU
                                    </div>
                                    <div className='text-name mb-2'>
                                      Bàn Làm Việc Cá Nhân
                                    </div>
                                    <div className='text-gray mb-1'>
                                      <Calendar height={20} className='mb-1' />{' '}
                                      15/01/2022
                                    </div>
                                    <div className='text-gray'>
                                      <Clock height={20} className='mb-1' />{' '}
                                      10:00 - 15:00
                                    </div>
                                    <div className='text-orange'>
                                      Chờ xác thực từ admin
                                    </div>
                                  </div>
                                </div>
                                <hr />
                              </>
                            ),
                          },
                          {
                            label: `Đã Hoàn Tất`,
                            key: '3',
                            children: (
                              <>
                                <div className='mt-2 text-gray-2'>
                                  Bạn có 3 đơn đã hoàn tất
                                </div>
                                <div className='mx-1 row'>
                                  <div className='col-auto py-2 pe-0'>
                                    <img
                                      className='card-image'
                                      src={Room}
                                      alt='room'
                                    />
                                  </div>
                                  <div className='col py-2'>
                                    <div className='text-header mb-2'>
                                      <span className='text-blue'>#123456</span>{' '}
                                      - CIRCO ĐÔNG DU
                                    </div>
                                    <div className='text-name mb-2'>
                                      Bàn Làm Việc Cá Nhân
                                    </div>
                                    <div className='text-gray mb-1'>
                                      <Calendar height={20} className='mb-1' />{' '}
                                      15/01/2022
                                    </div>
                                    <div className='text-gray'>
                                      <Clock height={20} className='mb-1' />{' '}
                                      10:00 - 15:00
                                    </div>
                                  </div>
                                </div>
                                <hr />
                                <div className='mx-1 row'>
                                  <div className='col-auto py-2 pe-0'>
                                    <img
                                      className='card-image'
                                      src={Room}
                                      alt='room'
                                    />
                                  </div>
                                  <div className='col py-2'>
                                    <div className='text-header mb-2'>
                                      <span className='text-blue'>#123456</span>{' '}
                                      - CIRCO ĐÔNG DU
                                    </div>
                                    <div className='text-name mb-2'>
                                      Bàn Làm Việc Cá Nhân
                                    </div>
                                    <div className='text-gray mb-1'>
                                      <Calendar height={20} className='mb-1' />{' '}
                                      15/01/2022
                                    </div>
                                    <div className='text-gray'>
                                      <Clock height={20} className='mb-1' />{' '}
                                      10:00 - 15:00
                                    </div>
                                  </div>
                                </div>
                                <hr />
                                <div className='mx-1 row'>
                                  <div className='col-auto py-2 pe-0'>
                                    <img
                                      className='card-image'
                                      src={Room}
                                      alt='room'
                                    />
                                  </div>
                                  <div className='col py-2'>
                                    <div className='text-header mb-2'>
                                      <span className='text-blue'>#123456</span>{' '}
                                      - CIRCO ĐÔNG DU
                                    </div>
                                    <div className='text-name mb-2'>
                                      Bàn Làm Việc Cá Nhân
                                    </div>
                                    <div className='text-gray mb-1'>
                                      <Calendar height={20} className='mb-1' />{' '}
                                      15/01/2022
                                    </div>
                                    <div className='text-gray'>
                                      <Clock height={20} className='mb-1' />{' '}
                                      10:00 - 15:00
                                    </div>
                                  </div>
                                </div>
                                <hr />
                              </>
                            ),
                          },
                          {
                            label: `Đã Hủy`,
                            key: '4',
                            children: (
                              <>
                                <div className='mt-2 text-gray-2'>
                                  Bạn có 3 đơn đã hủy
                                </div>
                                <div className='mx-1 row'>
                                  <div className='col-auto py-2 pe-0'>
                                    <img
                                      className='card-image'
                                      src={Room}
                                      alt='room'
                                    />
                                  </div>
                                  <div className='col py-2'>
                                    <div className='text-header mb-2'>
                                      <span className='text-blue'>#123456</span>{' '}
                                      - CIRCO ĐÔNG DU
                                    </div>
                                    <div className='text-name mb-2'>
                                      Bàn Làm Việc Cá Nhân
                                    </div>
                                    <div className='text-gray mb-1'>
                                      <Calendar height={20} className='mb-1' />{' '}
                                      15/01/2022
                                    </div>
                                    <div className='text-gray'>
                                      <Clock height={20} className='mb-1' />{' '}
                                      10:00 - 15:00
                                    </div>
                                    <div className='text-red'>
                                      Thanh toán thất bại
                                    </div>
                                  </div>
                                </div>
                                <hr />
                                <div className='mx-1 row'>
                                  <div className='col-auto py-2 pe-0'>
                                    <img
                                      className='card-image'
                                      src={Room}
                                      alt='room'
                                    />
                                  </div>
                                  <div className='col py-2'>
                                    <div className='text-header mb-2'>
                                      <span className='text-blue'>#123456</span>{' '}
                                      - CIRCO ĐÔNG DU
                                    </div>
                                    <div className='text-name mb-2'>
                                      Bàn Làm Việc Cá Nhân
                                    </div>
                                    <div className='text-gray mb-1'>
                                      <Calendar height={20} className='mb-1' />{' '}
                                      15/01/2022
                                    </div>
                                    <div className='text-gray'>
                                      <Clock height={20} className='mb-1' />{' '}
                                      10:00 - 15:00
                                    </div>
                                    <div className='text-red'>
                                      Chỗ đặt bị hủy
                                    </div>
                                  </div>
                                </div>
                                <hr />
                              </>
                            ),
                          },
                        ]}
                      />
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
          {currentTab === 'security' && (
            <>
              <div className='d-flex align-items-center'>
                <MdArrowBack
                  className='me-2 mb-0 pointer'
                  size={20}
                  onClick={() => handleSetTab('profile')}
                />{' '}
                <h6 className='mb-0 text-bold'>Bảo Mật</h6>
              </div>
              <div className='border rounded py-2 px-3 mt-3 mb-3'>
                <h4 className='fw-bold my-3'>THÔNG TIN BẢO MẬT</h4>
                <Form
                  name='change_password'
                  form={form}
                  initialValues={{ remember: true }}
                >
                  <Form.Item name='old-pwd'>
                    <label className='fw-bold'>Mật Khẩu Cũ</label>
                    <Input.Password
                      className='input-field py-2'
                      placeholder='Nhập vào mật khẩu cũ của bạn'
                    />
                  </Form.Item>
                  <Form.Item name='new-pwd'>
                    <label className='fw-bold'>Mật Khẩu Mới</label>
                    <Input.Password
                      className='input-field py-2'
                      placeholder='Nhập vào mật khẩu mới của bạn'
                    />
                  </Form.Item>
                  <div>
                    <label className='fw-bold'>Xác Thực Mật Khẩu Mới</label>
                    <Form.Item
                      name='verify-pwd'
                      rules={[
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue('new-pwd') === value) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              new Error('Không trùng khớp, vui lòng nhập lại')
                            );
                          },
                        }),
                      ]}
                    >
                      <Input.Password
                        className='input-field py-2'
                        placeholder='Nhập vào chính xác mật khẩu mới của bạn'
                      />
                    </Form.Item>
                  </div>
                  <Form.Item className='text-end'>
                    <Button
                      type='primary'
                      htmlType='submit'
                      className='update-btn'
                    >
                      Cập Nhật
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
