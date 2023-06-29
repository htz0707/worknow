import React, { useState } from 'react';
import { Accordion } from 'react-bootstrap';
import { ReactComponent as Logo } from '../assets/images/logo.svg';
import { ReactComponent as WavingIcon } from '../assets/icons/waving.svg';
import '../assets/styles/CreateBooking.scss';
import { Steps, Upload } from 'antd';
import MomoLogo from '../assets/images/momo.png';
import VnpayLogo from '../assets/images/vnpay.jpg';
import QrcodeImg from '../assets/images/qrcode.png';
import VietQrImg from '../assets/images/vietQR.png';
import { AiOutlineCheck } from 'react-icons/ai';
import Bcrumb from '../components/Bcrumb';
import { useEffect } from 'react';
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { gql, useLazyQuery, useMutation } from '@apollo/client';
import {
  formatCurrency,
  handleMessage,
  renderAddress,
  returnTypeOfBooking,
  toHoursAndMinutes,
} from '../helpers/helpers';
import ShowMore from '../components/ShowMore';
import moment from 'moment';
import Countdown from 'react-countdown';
import axios from 'axios';
import { ReactComponent as CountDownIcon } from '../assets/icons/CountDownClock.svg';
import OrderExpireModal from '../components/OrderExpireModal';
import { t } from 'i18next';
const { Step } = Steps;

export default function BookingPayment() {
  const user = JSON.parse(localStorage.getItem('user'));
  const path = useLocation();
  // const { location_id, order_id } = useParams();
  const [searchParams] = useSearchParams();
  const location_id = searchParams.get('location_id');
  const order_id = searchParams.get('order_id');
  const navigate = useNavigate();
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
  const [getOrderDetails, { called, refetch }] = useLazyQuery(
    GET_ORDER_DETAILS,
    {
      fetchPolicy: 'no-cache',
    }
  );
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
        if (res.data.order.status === 'booking_expired') {
          setShowOrderExpire(true);
        }
      }
    }
  };
  useEffect(() => {
    handleGetOrderDetail();
  }, [location_id, order_id]);
  //
  const [showMoreAmenities, setShowMoreAmenities] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  // handle upload image
  const CREATE_UPLOAD_URL = gql`
    mutation CreateUploadUrl($fileName: String!, $contentType: String!) {
      createUploadUrl(
        data: { fileName: $fileName, contentType: $contentType }
      ) {
        presignUrl
        fileId
      }
    }
  `;
  const [createUploadUrl] = useMutation(CREATE_UPLOAD_URL);
  const UPDATE_UPLOAD_URL = gql`
    mutation UpdateUploadUrl($fileId: UUID!) {
      updateUploadUrl(data: { fileId: $fileId }) {
        publicUrl
        status
      }
    }
  `;
  const [updateUploadUrl] = useMutation(UPDATE_UPLOAD_URL);
  const [fileList, setFileList] = useState([]);
  const customRequest = async (options) => {
    try {
      let file = options.file;
      options.onProgress({ percent: 0 });
      let res1 = await createUploadUrl({
        variables: {
          fileName: file?.name,
          contentType: file?.type,
        },
      });
      if (res1.data) {
        var config = {
          method: 'put',
          url: res1.data.createUploadUrl.presignUrl,
          headers: {
            'Content-Type': file?.type,
          },
          data: file,
        };
        let res2 = await axios(config);
        if (res2.statusText === 'OK') {
          let res3 = await updateUploadUrl({
            variables: {
              fileId: res1.data.createUploadUrl.fileId,
            },
          });
          options.onProgress({ percent: 100 });
          options.onSuccess({
            id: res1.data.createUploadUrl.fileId,
            url: res3.data.updateUploadUrl.publicUrl,
          });
        }
      }
    } catch (err) {
      console.log(err);
      options.onError({ err });
      handleMessage('error', 'Tải hóa đơn không thành công.');
    }
  };
  const onRemove = (item) => {
    console.log(item);
  };
  const handleUploadImage = (info) => {
    setFileList(info.fileList);
  };
  //handle extend time payment
  const UPDATE_ORDER = gql`
    mutation UpdateOrder(
      $orderId: UUID!
      $isExtendBookingTimeExpire: Boolean!
    ) {
      updateOrder(
        data: {
          orderId: $orderId
          isExtendBookingTimeExpire: $isExtendBookingTimeExpire
        }
      ) {
        id
      }
    }
  `;
  const [updateOrder] = useMutation(UPDATE_ORDER);
  const handleExtendTime = async () => {
    try {
      let res = await updateOrder({
        variables: {
          orderId: orderInfo.id,
          isExtendBookingTimeExpire: true,
        },
      });
      if (res.data) {
        handleGetOrderDetail();
      }
    } catch (error) {
      console.log(error);
      handleMessage('error', 'Gia hạn không thành công.');
    }
  };
  const checkExtendValid = (arr) => {
    let filter = arr?.filter((item) => item.status === 'extended');
    if (filter?.length < 2) {
      return true;
    } else {
      return false;
    }
  };
  const renderCountDown = ({ minutes, seconds, completed }) => {
    if (completed) {
      setShowOrderExpire(true);
      // Render a complete state
      return <div>00:00 (Hết hạn thanh toán)</div>;
    } else {
      // Render a countdown
      return (
        <div className='d-flex align-items-center'>
          <span>
            {String(minutes)?.padStart(2, '0')}:
            {String(seconds)?.padStart(2, '0')}
          </span>
          <button
            className='btn-extend-time'
            disabled={
              minutes >= 3 || !checkExtendValid(orderInfo?.orderStatuses)
            }
            onClick={handleExtendTime}
          >
            <CountDownIcon /> Gia hạn
          </button>
        </div>
      );
    }
  };
  //
  const [showOrderExpire, setShowOrderExpire] = useState(false);
  //
  const [paymentMethod, setPaymentMethod] = useState('');
  const handleInitPaymentMethod = () => {
    if (user?.roles?.[0]?.name === 'Employee') {
      setPaymentMethod('business_wallet');
    } else {
      setPaymentMethod('bank_account');
    }
  };
  useEffect(() => {
    handleInitPaymentMethod();
  }, []);
  //
  const GET_ME = gql`
    query GetMe {
      me {
        company {
          balance
          name
          registrationNumber
          phoneCountryCode
          phoneNumber
        }
      }
    }
  `;
  const [getMe] = useLazyQuery(GET_ME, {
    fetchPolicy: 'no-cache',
    onError(err) {
      console.log(err);
    },
  });
  const [businessWalletInfo, setBusinessWalletInfo] = useState({});
  const handleGetBusinessWalletInfo = async () => {
    if (user?.roles?.[0]?.name === 'Employee') {
      let res = await getMe();
      if (res.data) {
        setBusinessWalletInfo(res.data.me.company);
      }
    }
  };
  useEffect(() => {
    handleGetBusinessWalletInfo();
  }, []);
  // handle pay order with bank
  const PAY_ORDER_WITH_BANK = gql`
    mutation PayOrderWithBank($fileId: UUID, $orderId: UUID!) {
      payOrderWithBank(data: { fileId: $fileId, orderId: $orderId }) {
        id
      }
    }
  `;
  const [payOrderWithBank] = useMutation(PAY_ORDER_WITH_BANK);
  const PAY_ORDER_WITH_BUSINESS_WALLET = gql`
    mutation PayOrderWithBusinessWallet($orderId: UUID!) {
      payOrderWithBusinessWallet(data: { orderId: $orderId }) {
        id
      }
    }
  `;
  const [payOrderWithBusinessWallet] = useMutation(
    PAY_ORDER_WITH_BUSINESS_WALLET
  );
  const handleFinish = async () => {
    try {
      if (paymentMethod === 'bank_account') {
        let res = await payOrderWithBank({
          variables: {
            fileId: fileList[0]?.response?.id,
            orderId: order_id,
          },
        });
        if (res.data) {
          navigate(
            `/create-booking/status?location_id=${location_id}&order_id=${orderInfo.id}`,
            {
              replace: true,
            }
          );
        }
      }
      if (paymentMethod === 'business_wallet') {
        let res = await payOrderWithBusinessWallet({
          variables: {
            orderId: order_id,
          },
        });
        if (res.data) {
          navigate(
            `/create-booking/status?location_id=${location_id}&order_id=${orderInfo.id}`,
            {
              replace: true,
            }
          );
        }
      }
    } catch (error) {
      console.log(error);
      handleMessage('error', 'Thanh toán không thành công.');
    }
  };
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
          <div className='col-lg-7 info-payment'>
            {!user && (
              <div className='box-1'>
                <WavingIcon />
                <div>
                  <div className='fw-bold'>{t('create_booking_title')}</div>
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
                      {t('login')}
                    </a>{' '}
                    {t('create_booking_signin_des')} {t('Or')}{' '}
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
                      {t('signup')}
                    </a>{' '}
                    {t('create_booking_signup_des')}
                  </div>
                </div>
              </div>
            )}
            <div className='box-2'>
              <div className='row g-3'>
                <div className='col-md-6'>
                  <div className='left'>
                    <div className='title'>{t('order_code')}</div>
                    <div className='content'>#{orderInfo?.orderId}</div>
                  </div>
                </div>
                <div className='col-md-6'>
                  <div className='right'>
                    <div className='title'>{t('payment_expired')}</div>
                    <div className='content'>
                      <Countdown
                        date={new Date(orderInfo.bookingExpiredTime)}
                        renderer={renderCountDown}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='box-3'>
              <div className='title'>{t('payment_method')}</div>
              <div className='content'>
                <div className='confirm-text'>{t('payment_email_confirm')}</div>
                {user?.roles?.[0]?.name === 'Employee' && (
                  <>
                    <div className='payment-method-title'>
                      <input
                        className='form-check-input'
                        type='checkbox'
                        checked={paymentMethod === 'business_wallet'}
                        onChange={() => setPaymentMethod('business_wallet')}
                      />
                      <span>{t('pay_with_business_wallet')}</span>
                    </div>
                    {paymentMethod === 'business_wallet' && (
                      <div className='according-business'>
                        <Accordion defaultActiveKey='0'>
                          <Accordion.Item eventKey='0'>
                            <Accordion.Header>
                              <div className='according-business_header'>
                                {t('business_info')}
                              </div>
                            </Accordion.Header>
                            <Accordion.Body>
                              <div className='according-business_body'>
                                <div className='business-name'>
                                  {businessWalletInfo?.name}
                                </div>
                                <div className='business-details'>
                                  <div>
                                    <span>{t('tax_code')}</span>
                                    <span>
                                      {businessWalletInfo?.registrationNumber}
                                    </span>
                                  </div>
                                  <div>
                                    <span>{t('phone_number')}</span>
                                    <span>
                                      {'+' +
                                        businessWalletInfo?.phoneCountryCode +
                                        businessWalletInfo?.phoneNumber}
                                    </span>
                                  </div>
                                </div>
                                <div className='business-balance'>
                                  <span>{t('balance')}</span>
                                  <span>
                                    {formatCurrency(
                                      businessWalletInfo?.balance
                                    )}
                                  </span>
                                </div>
                              </div>
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>
                      </div>
                    )}
                  </>
                )}
                <div className='payment-method-title'>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    checked={paymentMethod === 'bank_account'}
                    onChange={() => setPaymentMethod('bank_account')}
                  />
                  <span>{t('bank_transfer')}</span>
                </div>
                {paymentMethod === 'bank_account' && (
                  <div className='according-bank'>
                    <Accordion defaultActiveKey='0'>
                      <Accordion.Item eventKey='0'>
                        <Accordion.Header>
                          <div className='according-bank_header'>
                            {t('payment_info')}
                          </div>
                        </Accordion.Header>
                        <Accordion.Body>
                          <div className='according-bank_body'>
                            <div className='bank-name'>Vietcombank</div>
                            <div className='bank-details'>
                              <div>
                                <span>{t('account_number')}</span>
                                <span>1035324822</span>
                              </div>
                              <div>
                                <span>{t('account_holder')}</span>
                                <span>Công Ty TNHH Work Now</span>
                              </div>
                              <div>
                                <span>{t('transfer_content')}</span>
                                <span>
                                  Thanh toan dat cho #{orderInfo?.orderId}
                                </span>
                              </div>
                            </div>
                            <div className='bank-amount'>
                              <span>{t('amount_money')}</span>
                              <span>
                                {formatCurrency(orderInfo?.finalTotal)}
                              </span>
                            </div>
                            <div className='qrcode'>
                              <div>Hoặc</div>
                              <div>Scan QR Code để thanh toán</div>
                              <div>
                                <img
                                  className='vietqr'
                                  src={VietQrImg}
                                  alt=''
                                />
                              </div>
                            </div>
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </div>
                )}
                {/* <div className='payment-method-title'>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    checked={paymentMethod === 'e_wallet'}
                    onChange={() => setPaymentMethod('e_wallet')}
                  />
                  <span>{t('e_wallet')}</span>
                </div> */}
                {paymentMethod === 'e_wallet' && (
                  <div className='according-ewallet'>
                    <Accordion defaultActiveKey='0'>
                      <Accordion.Item eventKey='0'>
                        <Accordion.Header>
                          <div className='according-ewallet_header'>
                            Chọn ví điện tử
                          </div>
                        </Accordion.Header>
                        <Accordion.Body>
                          <div className='according-ewallet_body'>
                            <div className='select-ewallet'>
                              <div className='ewallet active'>
                                <div className='logo-container'>
                                  <img src={MomoLogo} alt='' />
                                </div>
                                <div>MOMO</div>
                              </div>
                              {/* <div className='ewallet'>
                                <div className='logo-container'>
                                  <img src={VnpayLogo} alt='' />
                                </div>
                                <div>VNPAY</div>
                              </div> */}
                            </div>
                            <div className='ewallet-details'>
                              <div>
                                <span>Số tài khoản</span>
                                <span>0331000468999</span>
                              </div>
                              <div>
                                <span>Chủ tài khoản</span>
                                <span>Công ty TNHH WorkNow</span>
                              </div>
                              <div>
                                <span>Nội dung chuyển khoản</span>
                                <span>
                                  Thanh toan dat cho #{orderInfo?.orderId}
                                </span>
                              </div>
                            </div>
                            <div className='amount'>
                              <span>Số tiền</span>
                              <span>
                                {formatCurrency(orderInfo?.finalTotal)}
                              </span>
                            </div>
                            <div className='qrcode'>
                              <div>Hoặc</div>
                              <div>Scan QR Code để thanh toán</div>
                              <div>
                                <img src={QrcodeImg} alt='' />
                              </div>
                            </div>
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </div>
                )}
                <Upload
                  listType='picture'
                  defaultFileList={[...fileList]}
                  customRequest={customRequest}
                  onChange={handleUploadImage}
                  onRemove={onRemove}
                >
                  <div className='upload-bill'>{t('transfer_invoice')}</div>
                </Upload>
              </div>
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
              <div className='title'>{t('position_selected')}</div>
              <div>
                <div className='selected-workspace'>
                  <span>x1</span>
                  {workingSpaceInfo.images && (
                    <img src={workingSpaceInfo.images[0]?.publicUrl} alt='' />
                  )}
                  <div>
                    <div className='fw-bold'>{workingSpaceInfo?.name}</div>
                    {returnTypeOfBooking(workingSpaceInfo.type) === 'hour' && (
                      <>
                        {/* <div>
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
                        </div> */}
                      </>
                    )}
                    {returnTypeOfBooking(workingSpaceInfo.type) === 'day-month' && (
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
                    {/* <div>Thứ Hai, 31 Tháng 2, 2022</div>
                    <div>09:00 - 13:00 (4 tiếng)</div> */}
                  </div>
                </div>
              </div>
            </div>
            <div className='box-3'>
              <div className='title'>{t('price_detail')}</div>
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
              <p className='policy'>
                {t('total_des')} <b>{t('total_des1')}</b>{' '}
                <a href='#'>{t('here')}</a>
              </p>
            </div>
            <button
              type='button'
              className='payment-button'
              onClick={handleFinish}
            >
              {t('payment_done')}
            </button>
          </div>
        </div>
      </div>
      {/* <OrderExpireModal
        show={showOrderExpire}
        order_code={orderInfo?.orderId}
      /> */}
    </div>
  );
}
