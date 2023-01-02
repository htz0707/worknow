import React, { useEffect, useState } from 'react';
import { ReactComponent as Logo } from '../assets/images/logo.svg';
import { ReactComponent as WavingIcon } from '../assets/icons/waving.svg';
import '../assets/styles/CreateBooking.scss';
import { Steps } from 'antd';
import { AiOutlineCheck } from 'react-icons/ai';
import Bcrumb from '../components/Bcrumb';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { gql, useLazyQuery, useMutation } from '@apollo/client';
import {
  formatCurrency,
  handleMessage,
  renderAddress,
} from '../helpers/helpers';
import ShowMore from '../components/ShowMore';
import { Form } from 'antd';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import parsePhoneNumber from 'libphonenumber-js';
import { useTranslation } from 'react-i18next';
const { Step } = Steps;

export default function CreateBooking() {
  const user = JSON.parse(localStorage.getItem('user'));
  const path = useLocation();
  const { t } = useTranslation();
  let navigate = useNavigate();
  const { location_id, working_space_id } = useParams();
  const orderInfo = useLocation()?.state?.orderInfo;
  //get working space details
  const GET_WORKING_SPACE_DETAILS = gql`
    query GetWorkingSpaceDetails(
      $location_id: UUID!
      $working_space_id: UUID!
    ) {
      location(id: $location_id) {
        id
        name
        address
        ward {
          name
        }
        district {
          name
        }
        city {
          name
        }
        country {
          name
        }
        images {
          publicUrl
        }
        amenities {
          name
        }
        closeTime
        openTime
      }
      workingSpace(id: $working_space_id) {
        id
        name
        images {
          publicUrl
        }
        description
        priceByDay
        priceByHour
        type
        amenities {
          name
        }
      }
    }
  `;
  const [getWorkingSpaceDetails] = useLazyQuery(GET_WORKING_SPACE_DETAILS, {
    fetchPolicy: 'no-cache',
  });
  const [locationInfo, setLocationInfo] = useState({});
  const [workingSpaceInfo, setWorkingSpaceInfo] = useState({});
  const handleGetWorkingSpaceDetail = async () => {
    if (location_id && working_space_id) {
      let res = await getWorkingSpaceDetails({
        variables: {
          location_id: location_id,
          working_space_id: working_space_id,
        },
      });
      if (res.data) {
        setLocationInfo(res.data.location);
        setWorkingSpaceInfo(res.data.workingSpace);
      }
    }
  };
  useEffect(() => {
    handleGetWorkingSpaceDetail();
  }, [location_id, working_space_id]);
  const [showMoreAmenities, setShowMoreAmenities] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  //handle create order
  const [form] = Form.useForm();
  const [customerInfo, setCustomerInfo] = useState({
    full_name: '',
    email: '',
    phone_number: '',
    note: '',
  });
  const handleChangePhoneNumber = (value) => {
    setCustomerInfo({ ...customerInfo, phone_number: value });
  };
  //
  useEffect(() => {
    if (user) {
      let initInfo = {
        full_name: user.fullname,
        email: user.email,
        note: '',
      };
      if (user.phoneNumber) {
        initInfo.phone_number = user.phoneCountryCode + user.phoneNumber;
      } else {
        initInfo.phone_number = '';
      }
      console.log(initInfo);
      form.setFieldsValue(initInfo);
      setCustomerInfo(initInfo);
    }
  }, []);
  //
  const CREATE_ORDER = gql`
    mutation CreateOrder(
      $fullname: String!
      $email: String!
      $phoneCountryCode: String!
      $phoneNumber: String!
      $note: String!
      $workingSpaceId: UUID!
      $startDate: datetime!
      $endDate: datetime!
      $bookingType: BookingType!
    ) {
      createOrder(
        data: {
          fullname: $fullname
          email: $email
          phoneCountryCode: $phoneCountryCode
          phoneNumber: $phoneNumber
          note: $note
          details: {
            workingSpaceId: $workingSpaceId
            startDate: $startDate
            endDate: $endDate
            bookingType: $bookingType
          }
        }
      ) {
        id
      }
    }
  `;
  const [createOrder, { data, loading, error }] = useMutation(CREATE_ORDER);
  const handleSubmit = async () => {
    let parse_phone = await parsePhoneNumber('+' + customerInfo.phone_number);
    await createOrder({
      variables: {
        fullname: customerInfo.full_name,
        email: customerInfo.email,
        phoneCountryCode: parse_phone.countryCallingCode,
        phoneNumber: parse_phone.nationalNumber,
        note: customerInfo.note,
        workingSpaceId: working_space_id,
        startDate: orderInfo.start_date_utc,
        endDate: orderInfo.end_date_utc,
        bookingType: orderInfo.type,
      },
    });
  };
  if (data) {
    navigate(`/create-booking/payment/${location_id}/${data?.createOrder?.id}`);
  }
  if (error) {
    handleMessage('error', 'Đặt chỗ không thành công.');
  }
  //
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className='create-booking page-container'>
      {/* <div className='header'>
        <div className='container-md'>
          <div>WorkNow</div>
          <div className='booking-step'>
            <Steps current={currentStep} labelPlacement='vertical'>
              <Step title='Thông tin đặt chỗ' />
              <Step title='Thanh toán' />
              <Step title='Xác nhận đặt chỗ' />
            </Steps>
          </div>
          <Button
            variant='primary'
            className='text-white fw-bold rounded-pill px-5'
          >
            Đăng nhập
          </Button>
        </div>
      </div> */}
      <div className='create-booking_header'>
        <div>
          <Logo className='logo' onClick={() => navigate('/locations')} />
        </div>
        <div>
          <Bcrumb
            data={[
              {
                label: t('list'),
                path: '/locations',
              },
              {
                label: t('office_info'),
                path: `/locations/${location_id}`,
              },
              {
                label: t('make_reservation'),
                active: true,
              },
            ]}
          />
        </div>
        <div className='booking-step'>
          <Steps
            responsive={false}
            progressDot
            current={currentStep}
            labelPlacement='vertical'
          >
            <Step title={t('reservation_info')} />
            <Step title={t('payment')} />
            <Step title={t('status')} />
          </Steps>
        </div>
      </div>
      <div className='create-booking_body'>
        <div className='row'>
          <div className='col-lg-7 info-customer'>
            {!user && (
              <div className='box-1'>
                <WavingIcon />
                <div>
                  <div className='fw-bold'>
                    {t("create_booking_title")}
                  </div>
                  <div>
                    <a
                      href='#'
                      onClick={() => {
                        localStorage.setItem(
                          'preUrl',
                          JSON.stringify({
                            pathname: path.pathname,
                            state: path.state,
                          })
                        );
                        navigate(`/sign-in`);
                      }}
                    >
                      {t("login")}
                    </a>{' '}
                      {t("create_booking_signin_des")} {t("Or")}{' '}
                    <a
                      href='#'
                      onClick={() => {
                        localStorage.setItem(
                          'preUrl',
                          JSON.stringify({
                            pathname: path.pathname,
                            state: path.state,
                          })
                        );
                        navigate(`/sign-up`);
                      }}
                    >
                      {t("signup")}
                    </a>{' '}
                    {t("create_booking_signup_des")}
                  </div>
                </div>
              </div>
            )}
            {/* <div className='box-2'>
              <div className='title'>Mã đơn đặt</div>
              <div className='content'>#123456</div>
            </div> */}
            <div className='box-3'>
              <div className='header'>{t("user_info")}</div>
              <Form
                id='my_form'
                autoComplete='off'
                onFinish={handleSubmit}
                form={form}
                scrollToFirstError
              >
                <div className='mb-0'>
                  <label>
                    {t("first_last_name")} <span>*</span>
                  </label>
                  <Form.Item
                    name='full_name'
                    rules={[
                      {
                        required: true,
                        message: t("required_field"),
                      },
                    ]}
                  >
                    <input
                      className='form-control'
                      value={customerInfo.full_name}
                      onChange={(e) =>
                        setCustomerInfo({
                          ...customerInfo,
                          full_name: e.target.value,
                        })
                      }
                    />
                  </Form.Item>
                </div>
                <div className='mb-0'>
                  <label>
                  {t("phone")} <span>*</span>
                  </label>
                  <Form.Item
                    name='phone'
                    rules={[
                      {
                        async validator(_, value) {
                          let parse_phone = await parsePhoneNumber(
                            '+' + customerInfo.phone_number
                          );
                          if (parse_phone?.isValid() !== true) {
                            return Promise.reject(
                              new Error(t("phone_invalid"))
                            );
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
                        placeholder='Enter phone number'
                        country={'vn'}
                        enableSearch={true}
                        value={customerInfo.phone_number}
                        onChange={(phone) => handleChangePhoneNumber(phone)}
                      />
                    </div>
                  </Form.Item>
                </div>
                <div className='mb-0'>
                  <label>
                    Email <span>*</span>
                  </label>
                  <Form.Item
                    name='email'
                    rules={[
                      {
                        type: 'email',
                        message: t("email_invalid"),
                      },
                      {
                        required: true,
                        message: t("required_field"),
                      },
                    ]}
                  >
                    <input
                      className='form-control'
                      value={customerInfo.email}
                      onChange={(e) =>
                        setCustomerInfo({
                          ...customerInfo,
                          email: e.target.value,
                        })
                      }
                    />
                  </Form.Item>
                </div>
                <div className='mb-0'>
                  <label>{t("note")}</label>
                  <textarea
                    className='form-control'
                    style={{ resize: 'none' }}
                    rows='3'
                    value={customerInfo.note}
                    onChange={(e) =>
                      setCustomerInfo({
                        ...customerInfo,
                        note: e.target.value,
                      })
                    }
                  ></textarea>
                </div>
              </Form>
            </div>
          </div>
          <div className='col-lg-5 info-workspace'>
            <div className='box-1'>
              {locationInfo.images && (
                <img src={locationInfo.images[0]?.publicUrl} alt='' />
              )}
              <div>
                <div>{locationInfo?.name}</div>
                <div>{renderAddress(locationInfo)}</div>
                <div>{'4.8 / 5.0 Rất tốt (120 đánh giá)'}</div>
                <ul>
                  {locationInfo?.amenities?.map((item, index) => {
                    if (showMoreAmenities) {
                      return (
                        <li key={index}>
                          <AiOutlineCheck style={{ color: '#04B000' }} />{' '}
                          {item?.name}
                        </li>
                      );
                    } else {
                      if (index < 5) {
                        return (
                          <li key={index}>
                            <AiOutlineCheck style={{ color: '#04B000' }} />{' '}
                            {item?.name}
                          </li>
                        );
                      }
                    }
                  })}
                  {locationInfo?.amenities?.length > 10 && (
                    <ShowMore
                      show={showMoreAmenities}
                      setShow={setShowMoreAmenities}
                    />
                  )}
                </ul>
              </div>
            </div>
            <div className='box-2'>
              <div className='title'>{t("position_selected")}</div>
              <div>
                <div className='selected-workspace'>
                  <span>x1</span>
                  {workingSpaceInfo.images && (
                    <img src={workingSpaceInfo.images[0]?.publicUrl} alt='' />
                  )}
                  <div>
                    <div className='fw-bold'>{workingSpaceInfo?.name}</div>
                    {orderInfo?.type === 'hour' && (
                      <>
                        <div>{orderInfo?.date}</div>
                        <div>
                          {orderInfo?.time_range} ({orderInfo?.totalTime})
                        </div>
                      </>
                    )}
                    {orderInfo?.type === 'day' && (
                      <>
                        <div>
                          {orderInfo?.date_range} ({orderInfo?.totalDay} ngày)
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className='box-3'>
              <div className='title'>{t("price_detail")}</div>
              <div className='price-detail'>
                <div>
                  <span>{t("price_origin")}</span>
                  <span>{formatCurrency(orderInfo?.price)}</span>
                </div>
                {/* <div>
                  <span>Giá sau giảm</span>
                  <span>125,000đ</span>
                </div>
                <div>
                  <span>Voucher</span>
                  <span>-25,000đ</span>
                </div> */}
              </div>
              <div className='price-total'>
                <span>{t("total")}</span>
                <span>{formatCurrency(orderInfo?.price)}</span>
              </div>
              <p className='policy'>
                {t("total_des")}{' '}
                <b>{t("total_des1")}</b>{' '}
                <a href='#'>{t("here")}</a>
              </p>
            </div>
            <button type='submit' form='my_form' className='payment-button'>
              {t("payment")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
