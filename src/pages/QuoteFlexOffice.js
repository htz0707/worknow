import React, { useState } from 'react';
import '../assets/styles/QuoteFlexOffice.scss';
import Logo from '../assets/images/logo.svg';
import { Form, Input, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { ReactComponent as CircleCheckIcon } from '../assets/icons/circleCheck.svg';
import { useNavigate } from 'react-router-dom';
const { Option } = Select;

export default function QuoteFlexOffice(props) {
  const { status } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [businessInfo, setBusinessInfo] = useState({
    company_field: '',
    email: '',
    phone_number: '',
    team_size: '',
    expense: '',
    city: '',
    district: '',
  });
  const handleChangeInfo = (field, value) => {
    setBusinessInfo({ ...businessInfo, [field]: value });
  };
  const [companyFields, setCompanyFields] = useState([
    {
      id: '1',
      name: 'IT',
    },
    {
      id: '2',
      name: 'ABC',
    },
  ]);
  const [cityList, setCityList] = useState([
    {
      id: '1',
      name: 'Tp. Hồ Chí Minh',
    },
    {
      id: '2',
      name: 'Hà Nội',
    },
  ]);
  const [districtList, setDistrictList] = useState([
    {
      id: '1',
      name: 'Quận 1',
    },
    {
      id: '2',
      name: 'Quận 2',
    },
  ]);
  const [form] = Form.useForm();
  const handleSubmit = async () => {};
  return (
    <div className='quote-flex-office'>
      <div className='quote-flex-office-container'>
        <img
          src={Logo}
          alt='worknow-logo'
          className='logo'
          onClick={() => navigate('/')}
        />
        {!status && (
          <>
            <div className='title'>{t('hello_start_to_search')}</div>
            <div className='description'>
              {t('your_info_be_saved_for_future')}
            </div>
            <div className='form-container'>
              <Form
                name='quote-form'
                autoComplete='off'
                onFinish={handleSubmit}
                form={form}
                scrollToFirstError
              >
                <div className='mb-0'>
                  <label className='form-label'>
                    {t('email')}
                    <span className='required'>*</span>
                  </label>
                  <Form.Item
                    className='form-item'
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
                    {t('company_field')} <span>*</span>
                  </label>
                  <Form.Item
                    name='company_field'
                    rules={[
                      {
                        required: true,
                        message: t('required_field'),
                      },
                    ]}
                    className='form-item'
                  >
                    <Select
                      allowClear
                      value={businessInfo?.company_field}
                      className='form-single-select'
                      onChange={(value) => {
                        handleChangeInfo('company_field', value);
                      }}
                    >
                      {companyFields?.map((item, index) => {
                        return (
                          <Option value={item.id} key={index}>
                            {item.name}
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </div>
                <div className='mb-0'>
                  <div className='form-label'>
                    {t('team_size')} <span>*</span>
                  </div>
                  <Form.Item
                    name='team_size'
                    rules={[
                      {
                        required: true,
                        message: t('required_field'),
                      },
                      {
                        async validator(_, value) {
                          if (value) {
                            if (value <= 0) {
                              return Promise.reject(
                                new Error(t('value_must_be_greater_than_0'))
                              );
                            } else {
                              if (Number.isInteger(parseFloat(value))) {
                                return Promise.resolve();
                              } else {
                                return Promise.reject(
                                  new Error(
                                    t('this_field_must_be_an_integer_value')
                                  )
                                );
                              }
                            }
                          }
                        },
                      },
                    ]}
                    className='form-item'
                  >
                    <Input
                      type='number'
                      className='form-input'
                      value={businessInfo.team_size}
                      onChange={(e) =>
                        handleChangeInfo('team_size', e.target.value)
                      }
                      suffix={`${t('person')}`}
                    />
                  </Form.Item>
                </div>
                <div className='location-section'>
                  <label className='form-label'>
                    {t('location')} <span>*</span>
                  </label>
                  <div className='select-section'>
                    <div className='mb-0'>
                      <Form.Item
                        name='city'
                        rules={[
                          {
                            required: true,
                            message: t('required_field'),
                          },
                        ]}
                        className='form-item'
                      >
                        <Select
                          allowClear
                          value={businessInfo?.city}
                          className='form-single-select'
                          onChange={(value) => {
                            handleChangeInfo('city', value);
                          }}
                          placeholder={t('select_city')}
                        >
                          {cityList?.map((item, index) => {
                            return (
                              <Option value={item.id} key={index}>
                                {item.name}
                              </Option>
                            );
                          })}
                        </Select>
                      </Form.Item>
                    </div>
                    <div className='mb-0'>
                      <Form.Item
                        name='district'
                        rules={[
                          {
                            required: true,
                            message: t('required_field'),
                          },
                        ]}
                        className='form-item'
                      >
                        <Select
                          allowClear
                          value={businessInfo?.district}
                          className='form-single-select'
                          onChange={(value) => {
                            handleChangeInfo('district', value);
                          }}
                          placeholder={t('select_district')}
                        >
                          {districtList?.map((item, index) => {
                            return (
                              <Option value={item.id} key={index}>
                                {item.name}
                              </Option>
                            );
                          })}
                        </Select>
                      </Form.Item>
                    </div>
                  </div>
                </div>
                <div className='mb-0'>
                  <div className='form-label'>
                    {t('estimated_cost')} <span>*</span>
                  </div>
                  <Form.Item
                    name='expense'
                    rules={[
                      {
                        required: true,
                        message: t('required_field'),
                      },
                      {
                        async validator(_, value) {
                          if (value) {
                            if (value <= 0) {
                              return Promise.reject(
                                new Error(t('value_must_be_greater_than_0'))
                              );
                            } else {
                              if (Number.isInteger(parseFloat(value))) {
                                return Promise.resolve();
                              } else {
                                return Promise.reject(
                                  new Error(
                                    t('this_field_must_be_an_integer_value')
                                  )
                                );
                              }
                            }
                          }
                        },
                      },
                    ]}
                    className='form-item'
                  >
                    <Input
                      type='number'
                      className='form-input'
                      value={businessInfo.expense}
                      onChange={(e) =>
                        handleChangeInfo('expense', e.target.value)
                      }
                      suffix={`VND/${t('person')}`}
                    />
                  </Form.Item>
                </div>
              </Form>
              <button className='btn-submit' type='submit' form='quote-form'>
                {t('receive_to_quote')}
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
              {t('view_more_location')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
