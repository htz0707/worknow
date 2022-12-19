import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md';
import Avatar from '../assets/images/default_avatar.png';
import { ReactComponent as Info } from '../assets/icons/thongtin.svg';
import { ReactComponent as Voucher } from '../assets/icons/voucher.svg';
import { ReactComponent as Giaodich } from '../assets/icons/giaodich.svg';
import { ReactComponent as Lockout } from '../assets/icons/lockout.svg';
import { ReactComponent as Secure } from '../assets/icons/secure.svg';
import '../assets/styles/User.scss';
import { useTranslation } from 'react-i18next';
import { Form, Button, Input, Select } from 'antd';
// import { from } from '@apollo/client';

export default function User() {
  const { Option } = Select;
  const { t } = useTranslation();
  const [tab, setTab] = useState(0);
  const handleSetTab = (n) => {
    if (n === 0) setTab(0);
    else if (n === 1) setTab(1);
    else setTab(2);
  }
  const [step, setStep] = useState(0);
  const handleSetStep = (n) => {
    if (n === 0) setStep(0);
    else setStep(1);
  }
  const navigate = useNavigate();
  const handleBack = () => {
    handleSetStep(0);
    handleSetTab(0);
  }
  const handleToHomePage = () => {
    navigate('/');
  }
  return (
    <div className='user'>
      <div className='container-fluid'>
        <div className='user-layout'>
          {
            step === 0 &&
            <>
              <div className='d-flex align-items-center'>
                <MdArrowBack
                  className='me-2 mb-0 pointer' size={20}
                  onClick={handleToHomePage}
                /> <h6 className='mb-0 text-bold'> Thông Tin Tài Khoản</h6>
              </div>
              <div className='row my-3'>
                <div className='align-items-center border rounded col-lg-4 py-2 px-4'>
                  <div className='d-flex'>
                    <img className='user-avatar rounded-circle' src={Avatar} alt='avatar' />
                    <div className='pt-2 ps-3'>
                      <p className='mb-0 text-big'>Worknow</p>
                      <p className='mb-0 text-gray'>Worknow@gmail.com</p>
                    </div>
                  </div>
                  <hr />
                  <div
                    className={`d-flex rounded-pill border tab${tab === 0 ? ' tab-active' : ''}`}
                    onClick={() => handleSetTab(0)}
                  >
                    <Info className='tab-icon-1' /><p className='text-tab-1'> Thông Tin Cá Nhân</p>
                  </div>
                  <div
                    className={`d-flex mt-2 rounded-pill border tab${tab === 1 ? ' tab-active' : ''}`}
                    onClick={() => handleSetTab(1)}
                  >
                    <Voucher className='tab-icon-2' /><p className='text-tab-2'> Voucher Của Tôi</p>
                  </div>
                  <div
                    className={`d-flex mt-2 rounded-pill border tab${tab === 2 ? ' tab-active' : ''}`}
                    onClick={() => handleSetTab(2)}
                  >
                    <Giaodich className='tab-icon-2' /><p className='text-tab-2'>Giao Dịch Của Tôi</p>
                  </div>
                  <hr />
                  <div
                    className='d-flex mb-2 pointer'
                    onClick={() => handleSetStep(1)}
                  >
                    <Secure className /><p className='text-secure mb-0'>Bảo mật</p>
                  </div>
                  <div className='text-log-out pointer'>
                    <Lockout /> Đăng xuất
                  </div>
                </div>
                <div className='col-lg-8 m-0 p-0'>
                  {
                    tab === 0 &&
                    <div className='border rounded ms-lg-3 py-2 px-3'>
                      <h4 className='fw-bold my-3'>THÔNG TIN CÁ NHÂN</h4>
                      <Form
                        name='info'
                        initialValues={{ remember: true }}
                      >
                        <Form.Item
                          name='email'
                        >
                          <label className='fw-bold'>
                            Email
                          </label>
                          <Input className='input-field py-2' disabled value={'Worknow@gmail.com'} />
                        </Form.Item>
                        <Form.Item
                          name='full_name'
                        >
                          <label className='fw-bold'>
                            Họ Tên
                          </label>
                          <Input className='input-field py-2' placeholder='Nhập vào tên của bạn' />
                        </Form.Item>
                        <Form.Item
                          name='gender'
                        >
                          <label className='fw-bold'>
                            Giới Tính
                          </label>
                          <Input className='input-field py-2' placeholder='Nhập vào giới tính của bạn' />
                        </Form.Item>
                        <Form.Item
                          name='address'
                        >
                          <label className='fw-bold'>
                            Địa Chỉ
                          </label>
                          <Input className='input-field py-2' placeholder='Nhập vào địa chỉ của bạn' />
                        </Form.Item>
                        <Form.Item name='phone-code'>
                          <label className='fw-bold'>
                            Tỉnh, Thành
                          </label>
                          <Select size='large' defaultValue='Hồ Chí Minh'>
                            <Option value='Hồ Chí Minh'>Hồ Chí Minh</Option>
                            <Option value='Hà Nội'>Hà Nội</Option>
                          </Select>
                        </Form.Item>
                        <div className='row'>
                          <label className='fw-bold'>
                            Số Điện Thoại
                          </label>
                          <div className='col-2'>
                            <Form.Item name='phone-code'>
                              <Select size='large' defaultValue={'+84'}>
                                <Option value='+65'>+65</Option>
                                <Option value='+84'>+84</Option>
                              </Select>
                            </Form.Item>
                          </div>
                          <div className='col-10'>
                            <Form.Item
                              name='phone-number'
                            >
                              <Input className='input-field py-2' placeholder='Nhập vào số điện thoại của bạn' />
                            </Form.Item>
                          </div>
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
                  }
                </div>
              </div>
            </>
          }
          {
            step === 1 &&
            <>
              <div className='d-flex align-items-center'>
                <MdArrowBack
                  className='me-2 mb-0 pointer' size={20}
                  onClick={handleBack}
                /> <h6 className='mb-0 text-bold'>Bảo Mật</h6>
              </div>
              <div className='border rounded py-2 px-3 mt-3 mb-3'>
                <h4 className='fw-bold my-3'>THÔNG TIN BẢO MẬT</h4>
                <Form
                  name='change_password'
                  initialValues={{ remember: true }}
                >
                  <Form.Item
                    name='old-pwd'
                  >
                    <label className='fw-bold'>
                      Mật Khẩu Cũ
                    </label>
                    <Input type='password' className='input-field py-2' placeholder='Nhập vào mật khẩu cũ của bạn' />
                  </Form.Item>
                  <Form.Item
                    name='new-pwd'
                  >
                    <label className='fw-bold'>
                      Mật Khẩu Mới
                    </label>
                    <Input type='password' className='input-field py-2' placeholder='Nhập vào mật khẩu mới của bạn' />
                  </Form.Item>
                  <Form.Item
                    name='verify-new-pwd'
                  >
                    <label className='fw-bold'>
                      Xác Thực Mật Khẩu Mới
                    </label>
                    <Input type='password' className='input-field py-2' placeholder='Nhập vào chính xác mật khẩu mới của bạn' />
                  </Form.Item>
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
          }
        </div>
      </div>
    </div>
  )
}