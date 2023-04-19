import React, { useEffect, useState } from 'react';
import '../assets/styles/QuoteFlexOffice.scss';
import Logo from '../assets/images/logo.svg';
import { Form, Input, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { ReactComponent as CircleCheckIcon } from '../assets/icons/circleCheck.svg';
import { useNavigate } from 'react-router-dom';
import { gql, useMutation, useLazyQuery } from '@apollo/client';
import { handleError, handleMessage } from '../helpers/helpers';
import { Spinner } from 'react-bootstrap';
const { Option } = Select;

export default function QuoteFlexOffice(props) {
  const { status } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [businessInfo, setBusinessInfo] = useState({
    company_field: '',
    email: '',
    team_size: '',
    expense: '',
    city: '',
    district: '',
  });
  const handleChangeInfo = (field, value) => {
    if (field === 'city') {
      setBusinessInfo({ ...businessInfo, city: value, district: '' });
      form.resetFields(['district']);
    } else {
      setBusinessInfo({ ...businessInfo, [field]: value });
    }
  };
  const [companyFields, setCompanyFields] = useState([
    {
      id: t('company_field_1'),
      name: t('company_field_1'),
    },
    {
      id: t('company_field_2'),
      name: t('company_field_2'),
    },
    {
      id: t('company_field_3'),
      name: t('company_field_3'),
    },
    {
      id: t('company_field_4'),
      name: t('company_field_4'),
    },
    {
      id: t('company_field_5'),
      name: t('company_field_5'),
    },
    {
      id: t('company_field_6'),
      name: t('company_field_6'),
    },
  ]);
  const [cityList, setCityList] = useState([
    {
      id: 'hcm',
      name: t('ho_chi_minh_city'),
    },
    {
      id: 'singapore',
      name: t('singapore'),
    },
  ]);
  const [districtListHcm, setDistrictListHcm] = useState([
    {
      id: '1',
      name: 'Quận 1',
    },
    {
      id: '2',
      name: 'Quận 2',
    },
  ]);
  const GET_DISTRICTS = gql`
    query getDistricts($cityId: UUID!) {
      districts(params: { cityId: $cityId }) {
        edges {
          id
          name
        }
      }
    }
  `;
  const [getDistricts] = useLazyQuery(GET_DISTRICTS);
  const handleGetDistricts = async (id) => {
    let res = await getDistricts({
      variables: {
        cityId: id,
      },
    });
    if (res.data) {
      let filter = res.data?.districts?.edges.map((item) => ({
        id: item.name,
        name: item.name,
      }));
      setDistrictListHcm(filter);
    }
  };
  useEffect(() => {
    handleGetDistricts('008c4432-0f9d-4d56-80e1-619010ed8c46');
  }, []);
  const [districtListSing, setDistrictListSing] = useState([
    {
      id: 'singapore',
      name: t('singapore'),
    },
  ]);
  const [districtList, setDistrictList] = useState([]);
  useEffect(() => {
    if (businessInfo.city === 'hcm') {
      setDistrictList([...districtListHcm]);
    } else if (businessInfo.city === 'singapore') {
      setDistrictList([...districtListSing]);
    } else {
      setDistrictList([]);
    }
  }, [businessInfo.city]);
  const [form] = Form.useForm();
  const CREATE_FIND_FLEX_FRICE_FOR_OFFICE = gql`
    mutation CreateFindFlexPriceForOffice(
      $email: String!
      $businessSector: String!
      $location: String!
      $district: String!
      $teamSize: Int!
      $price: Float!
    ) {
      createFindFlexPriceForOffice(
        data: {
          email: $email
          businessSector: $businessSector
          location: $location
          district: $district
          teamSize: $teamSize
          price: $price
        }
      )
    }
  `;
  const [loading, setLoading] = useState(false);
  const [createFindFlexPriceForOffice] = useMutation(
    CREATE_FIND_FLEX_FRICE_FOR_OFFICE,
    {
      update(_) {
        setBusinessInfo({
          company_field: '',
          email: '',
          team_size: '',
          expense: '',
          city: '',
          district: '',
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
    }
  );
  const handleSubmit = async () => {
    setLoading(true);
    createFindFlexPriceForOffice({
      variables: {
        email: businessInfo.email,
        businessSector: businessInfo.company_field,
        location: businessInfo.city,
        district: businessInfo.district,
        teamSize: parseInt(businessInfo.team_size),
        price: parseFloat(businessInfo.expense),
      },
    });
  };
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
                {loading ? (
                  <Spinner animation='border' size='sm' />
                ) : (
                  t('receive_to_quote')
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
                navigate('/locations', {
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
