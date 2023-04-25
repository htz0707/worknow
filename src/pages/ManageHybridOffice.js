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
import { gql, useMutation } from '@apollo/client';
import { handleError, handleMessage } from '../helpers/helpers';
import { ReactComponent as CircleCheckIcon } from '../assets/icons/circleCheck.svg';
import { useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';

export default function ManageHybridOffice(props) {
  const { status } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [businessInfo, setBusinessInfo] = useState({
    company_name: '',
    email: '',
    phone_number: '',
  });
  const handleChangeInfo = (field, value) => {
    setBusinessInfo({ ...businessInfo, [field]: value });
  };
  const [form] = Form.useForm();
  const SIGN_UP_BUSINESS = gql`
    mutation SignUpBusiness(
      $email: String!
      $phoneCountryCode: String!
      $phoneNumber: String!
      $companyName: String!
    ) {
      signUpBusiness(
        data: {
          email: $email
          phoneCountryCode: $phoneCountryCode
          phoneNumber: $phoneNumber
          companyName: $companyName
        }
      )
    }
  `;
  const [loading, setLoading] = useState(false);
  const [signUpBusiness] = useMutation(SIGN_UP_BUSINESS, {
    update(_) {
      setBusinessInfo({
        company_name: '',
        email: '',
        phone_number: '',
      });
      form.resetFields();
      setLoading(false);
      navigate('status');
    },
    onError(err) {
      setLoading(false);
      console.log(err);
      handleMessage(
        'error',
        handleError(err.graphQLErrors[0]?.message, t('create_inquiry_failed'))
      );
    },
  });
  const handleSubmit = async () => {
    setLoading(true);
    let parse_phone = await parsePhoneNumber('+' + businessInfo.phone_number);
    signUpBusiness({
      variables: {
        email: businessInfo.email,
        phoneCountryCode: parse_phone.countryCallingCode,
        phoneNumber: parse_phone.nationalNumber,
        companyName: businessInfo.company_name,
      },
    });
  };
  return (
    <div className='manage-hybrid-office'>
      <Helmet>
        <title>{t('manage_hybrid_model_for_business')}</title>
        <meta
          name='description'
          content={t('manage_hybrid_model_for_business_description')}
        />
        <link
          rel='canonical'
          href='https://worknow.center/manage-hybrid-office'
        />
        <meta
          property='og:title'
          content={t('manage_hybrid_model_for_business')}
        />
        <meta
          property='og:description'
          content={t('manage_hybrid_model_for_business_description')}
        />
      </Helmet>
      <div className='manage-hybrid-office-container webview'>
        <div className='form-section'>
          <div className='form-container'>
            <img
              src={Logo}
              alt='worknow-logo'
              className='logo'
              onClick={() => navigate('/')}
            />
            {!status && (
              <>
                <div className='title'>
                  {t('manage_hybrid_model_for_business')}
                </div>
                <div className='description'>
                  {t('manage_hybrid_model_for_business_description')}
                </div>
                <Form
                  name='sign-up-business'
                  autoComplete='off'
                  onFinish={handleSubmit}
                  form={form}
                  scrollToFirstError
                >
                  <div className='form-title'>{t('free_signup')}</div>
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
                        onChange={(e) =>
                          handleChangeInfo('email', e.target.value)
                        }
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
                  {loading ? (
                    <Spinner animation='border' size='sm' />
                  ) : (
                    t('submit')
                  )}
                </button>
              </>
            )}
            {status && (
              <div className='status-section'>
                <CircleCheckIcon className='icon' />
                <div className='status-title'>{t('send_request_success')}</div>
                <div className='status-description'>
                  {t('send_request_success_description')}
                </div>
                <button
                  className='btn-submit'
                  onClick={() =>
                    navigate('/', {
                      replace: true,
                    })
                  }
                >
                  {t('back_to_homepage')}
                </button>
              </div>
            )}
          </div>
        </div>
        <div className='banner-section'>
          <img src={Banner} alt='banner' className='banner' />
        </div>
      </div>
      <div className='manage-hybrid-office-container mobileview'>
        <div className='banner-section'>
          <img
            src={WhiteLogo}
            alt='worknow-logo'
            className='logo'
            onClick={() => navigate('/')}
          />
          <img src={Dashboard} alt='banner' className='banner' />
        </div>
        <div className='form-section'>
          {!status && (
            <>
              <div className='title'>
                {t('manage_hybrid_model_for_business')}
              </div>
              <div className='description'>
                {t('manage_hybrid_model_for_business_description')}
              </div>
              <div className='form-container'>
                <Form
                  name='sign-up-business'
                  autoComplete='off'
                  onFinish={handleSubmit}
                  form={form}
                  scrollToFirstError
                >
                  <div className='form-title'>{t('free_signup')}</div>
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
                        onChange={(e) =>
                          handleChangeInfo('email', e.target.value)
                        }
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
                  {loading ? (
                    <Spinner animation='border' size='sm' />
                  ) : (
                    t('submit')
                  )}
                </button>
              </div>
            </>
          )}
          {status && (
            <div className='status-section'>
              <CircleCheckIcon className='icon' />
              <div className='status-title'>{t('send_request_success')}</div>
              <div className='status-description'>
                {t('send_request_success_description')}
              </div>
              <button
                className='btn-submit'
                onClick={() =>
                  navigate('/', {
                    replace: true,
                  })
                }
              >
                {t('back_to_homepage')}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
