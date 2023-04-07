import React, { useState } from 'react';
import { ReactComponent as Logo } from '../assets/images/logo.svg';
import { ReactComponent as PhoneIcon } from '../assets/icons/phone.svg';
import '../assets/styles/CreateBooking.scss';
import { Steps } from 'antd';
import Bcrumb from '../components/Bcrumb';
import { useEffect } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import {
  formatCurrency,
  renderAddress,
  returnDescriptionStatusBooking,
  returnStatusBooking,
  returnTypeOfBooking,
  toHoursAndMinutes,
} from '../helpers/helpers';
import moment from 'moment';
import { ReactComponent as RefreshIcon } from '../assets/icons/refresh.svg';
import { useTranslation } from 'react-i18next';
const { Step } = Steps;

export default function BookingStatus() {
  // const { location_id, order_id } = useParams();
  const [searchParams] = useSearchParams();
  const location_id = searchParams.get('location_id');
  const order_id = searchParams.get('order_id');
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(2);
  //get order details
  const GET_ORDER_DETAILS = gql`
    query GetOrderDetails($location_id: UUID!, $order_id: UUID!) {
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
      order(id: $order_id) {
        email
        fullname
        bookingExpiredTime
        id
        finalTotal
        note
        companyName
        phoneNumber
        status
        total
        totalDiscount
        phoneCountryCode
        orderId
        orderStatuses {
          status
        }
        orderDetails {
          endDate
          hour
          price
          startDate
          workingSpaces {
            id
            name
            type
            images {
              publicUrl
            }
          }
        }
      }
    }
  `;
  const [getOrderDetails] = useLazyQuery(GET_ORDER_DETAILS, {
    fetchPolicy: 'no-cache',
  });
  const [locationInfo, setLocationInfo] = useState({});
  const [workingSpaceInfo, setWorkingSpaceInfo] = useState({});
  const [orderInfo, setOrderInfo] = useState({});
  const handleGetOrderDetail = async () => {
    if (location_id && order_id) {
      let res = await getOrderDetails({
        variables: {
          location_id: location_id,
          order_id: order_id,
        },
      });
      if (res.data) {
        setLocationInfo(res.data.location);
        setWorkingSpaceInfo(res.data.order?.orderDetails[0]?.workingSpaces);
        setOrderInfo(res.data.order);
      }
    }
  };
  useEffect(() => {
    handleGetOrderDetail();
  }, [location_id, order_id]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className='create-booking page-container'>
      <div className='create-booking_header'>
        <div>
          <Logo className='logo' onClick={() => navigate('/locations')} />
        </div>
        {/* <div>
          <Bcrumb
            data={[
              {
                label: t('list'),
                path: '/locations',
              },
              {
                label: t('office_info'),
                path: `/locations/${location_id}/working-space/${workingSpaceInfo.id}`,
              },
              {
                label: t('make_reservation'),
                active: true,
              },
            ]}
          />
        </div> */}
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
          <div className='mx-auto col-xl-5 col-lg-7 info-booking'>
            <div>
              <div className='title'>{t('my_order')}</div>
              <div className='status-booking'>
                <div>{t('order_status')}:</div>
                <div>
                  <div className={`status ${orderInfo.status}`}>
                    {returnStatusBooking(orderInfo.status)}
                  </div>
                </div>
              </div>
              <div className='code-booking'>
                <div>{t('order_code')}:</div>
                <div>#{orderInfo?.orderId}</div>
              </div>
              <div
                className='btn-refresh'
                onClick={() => {
                  window.location.reload();
                }}
              >
                <RefreshIcon /> {t('refresh_page')}
              </div>
              {orderInfo.status !== 'completed' && (
                <div className='confirm-booking'>
                  <p>{returnDescriptionStatusBooking(orderInfo.status)}</p>
                  {/* <div>01:25:00</div> */}
                </div>
              )}
              <div className='location-info'>
                <div className='location-name'>{locationInfo?.name}</div>
                <div>{renderAddress(locationInfo)}</div>
                <div className='workspace-item'>
                  {workingSpaceInfo.images && (
                    <img src={workingSpaceInfo.images[0]?.publicUrl} alt='' />
                  )}
                  <div>
                    <div className='fw-bold'>{workingSpaceInfo?.name}</div>
                    {returnTypeOfBooking(workingSpaceInfo.type) === 'hour' && (
                      <>
                        <div>
                          {moment(orderInfo.orderDetails[0].startDate).format(
                            'DD/MM/YYYY'
                          )}
                        </div>
                        <div>
                          {moment(orderInfo.orderDetails[0].startDate).format(
                            'HH:mm'
                          )}
                          {' - '}
                          {moment(orderInfo.orderDetails[0].endDate).format(
                            'HH:mm'
                          )}{' '}
                          (
                          {toHoursAndMinutes(
                            orderInfo.orderDetails[0].hour * 60
                          )}
                          )
                        </div>
                      </>
                    )}
                    {returnTypeOfBooking(workingSpaceInfo.type) === 'day' && (
                      <>
                        <div>
                          {moment(orderInfo.orderDetails[0].startDate).format(
                            'DD/MM/YYYY'
                          )}
                          {' - '}
                          {moment(orderInfo.orderDetails[0].endDate).format(
                            'DD/MM/YYYY'
                          )}
                        </div>
                      </>
                    )}
                    {/* <div>Thứ Hai, 25 Tháng 2, 2022</div>
                    <div>09:00 - 13:00 (4 tiếng)</div>
                    <div>220.000đ</div> */}
                  </div>
                </div>
              </div>
              <div className='summary'>
                <div className='title'>{t('payment_summary')}</div>
                <div className='price-detail'>
                  <div>
                    <span>{t('price_origin')}</span>
                    <span>{formatCurrency(orderInfo?.total)}</span>
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
                  <span>{t('total')}</span>
                  <span>{formatCurrency(orderInfo?.finalTotal)}</span>
                </div>
              </div>
            </div>
            <div>
              <div className='title'>{t('support')}</div>
              <p>{t('contact_me')}</p>
              <a href='tel:+842836205144' className='phone-button'>
                <PhoneIcon className='me-2' /> +84 28 3620 5144
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
