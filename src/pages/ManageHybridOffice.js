import React from 'react';
import '../assets/styles/ManageHybridOffice.scss';
import Logo from '../assets/images/logo.svg';
import WhiteLogo from '../assets/images/white_logo.svg';
import Banner from '../assets/images/manage_hybrid_office_banner.png';
import Dashboard from '../assets/images/dashboard.png';
import { useTranslation } from 'react-i18next';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import parsePhoneNumber from 'libphonenumber-js';
import { useState } from 'react';
import { Form, Input } from 'antd';

export default function ManageHybridOffice() {
  const { t } = useTranslation();
  const [businessInfo, setBusinessInfo] = useState({
    company_name: '',
    email: '',
    phone_number: '',
  });
  const handleChangeInfo = (field, value) => {
    setBusinessInfo({ ...businessInfo, [field]: value });
  };
  const [form] = Form.useForm();
  const handleSubmit = async () => {};
  return (
    <div className='manage-hybrid-office'>
      <div className='manage-hybrid-office-container webview'>
        <div className='form-section'>
          <div className='form-container'>
            <img src={Logo} alt='worknow-logo' className='logo' />
            <div className='title'>Quản lý hybrid mode cho doanh nghiệp</div>
            <div className='description'>
              Đăng ký trở thành khác hàng doanh nghiệp để tối ưu hóa mô hình
              hybrid và nhận ưu đãi hấp dẫn cho doanh nghiệp của bạn.
            </div>
            <Form
              name='sign-up-business'
              autoComplete='off'
              onFinish={handleSubmit}
              form={form}
              scrollToFirstError
            >
              <div className='form-title'>Đăng ký miễn phí</div>
              <div>
                <label className='form-label'>
                  {t('company_name')}
                  <span className='required'>*</span>
                </label>
                <Form.Item
                  name='company_name'
                  rules={[
                    {
                      required: true,
                      message: t('required_field'),
                    },
                  ]}
                >
                  <Input
                    className='form-input'
                    value={businessInfo.company_name}
                    onChange={(e) =>
                      handleChangeInfo('company_name', e.target.value)
                    }
                  />
                </Form.Item>
              </div>
              <div className='mb-0'>
                <label className='form-label'>
                  {t('email')}
                  <span className='required'>*</span>
                </label>
                <Form.Item
                  name='email'
                  rules={[
                    {
                      type: 'email',
                      message: t('email_invalid'),
                    },
                    {
                      required: true,
                      message: t('required_field'),
                    },
                  ]}
                >
                  <Input
                    className='form-input'
                    value={businessInfo.email}
                    onChange={(e) => handleChangeInfo('email', e.target.value)}
                  />
                </Form.Item>
              </div>
              <div className='mb-0'>
                <label className='form-label'>
                  {t('phone')}
                  <span className='required'>*</span>
                </label>
                <Form.Item
                  name='phone'
                  rules={[
                    {
                      required: true,
                      message: t('required_field'),
                    },
                    {
                      async validator(_, value) {
                        if (value) {
                          let parse_phone = await parsePhoneNumber(
                            '+' + businessInfo.phone_number
                          );
                          if (parse_phone?.isValid() !== true) {
                            return Promise.reject(
                              new Error(t('phone_invalid'))
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
                      placeholder=''
                      country={'vn'}
                      enableSearch={true}
                      value={businessInfo.phone_number}
                      onChange={(phone) =>
                        handleChangeInfo('phone_number', phone)
                      }
                    />
                  </div>
                </Form.Item>
              </div>
            </Form>
            <button
              className='btn-submit'
              type='submit'
              form='sign-up-business'
            >
              {t('submit')}
            </button>
          </div>
        </div>
        <div className='banner-section'>
          <img src={Banner} alt='banner' className='banner' />
        </div>
      </div>
      <div className='manage-hybrid-office-container mobileview'>
        <div className='banner-section'>
          <img src={WhiteLogo} alt='worknow-logo' className='logo' />
          <img src={Dashboard} alt='banner' className='banner' />
        </div>
        <div className='form-section'>
          <div className='title'>
            mô hình hybrid <br /> cho doanh nghiệp
          </div>
          <div className='description'>
            Đăng ký với chúng tôi để nhận ưu đãi ngay.
          </div>
          <div className='form-container'>
            <Form
              name='sign-up-business'
              autoComplete='off'
              onFinish={handleSubmit}
              form={form}
              scrollToFirstError
            >
              <div className='form-title'>Đăng ký miễn phí</div>
              <div>
                <label className='form-label'>
                  {t('company_name')}
                  <span className='required'>*</span>
                </label>
                <Form.Item
                  name='company_name'
                  rules={[
                    {
                      required: true,
                      message: t('required_field'),
                    },
                  ]}
                >
                  <Input
                    className='form-input'
                    value={businessInfo.company_name}
                    onChange={(e) =>
                      handleChangeInfo('company_name', e.target.value)
                    }
                  />
                </Form.Item>
              </div>
              <div className='mb-0'>
                <label className='form-label'>
                  {t('email')}
                  <span className='required'>*</span>
                </label>
                <Form.Item
                  name='email'
                  rules={[
                    {
                      type: 'email',
                      message: t('email_invalid'),
                    },
                    {
                      required: true,
                      message: t('required_field'),
                    },
                  ]}
                >
                  <Input
                    className='form-input'
                    value={businessInfo.email}
                    onChange={(e) => handleChangeInfo('email', e.target.value)}
                  />
                </Form.Item>
              </div>
              <div className='mb-0'>
                <label className='form-label'>
                  {t('phone')}
                  <span className='required'>*</span>
                </label>
                <Form.Item
                  name='phone'
                  rules={[
                    {
                      required: true,
                      message: t('required_field'),
                    },
                    {
                      async validator(_, value) {
                        if (value) {
                          let parse_phone = await parsePhoneNumber(
                            '+' + businessInfo.phone_number
                          );
                          if (parse_phone?.isValid() !== true) {
                            return Promise.reject(
                              new Error(t('phone_invalid'))
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
                      placeholder=''
                      country={'vn'}
                      enableSearch={true}
                      value={businessInfo.phone_number}
                      onChange={(phone) =>
                        handleChangeInfo('phone_number', phone)
                      }
                    />
                  </div>
                </Form.Item>
              </div>
            </Form>
            <button
              className='btn-submit'
              type='submit'
              form='sign-up-business'
            >
              {t('submit')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
