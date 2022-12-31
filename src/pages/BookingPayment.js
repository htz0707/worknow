import React, { useState } from 'react';
import { Accordion } from 'react-bootstrap';
import { ReactComponent as Logo } from '../assets/images/logo.svg';
import { ReactComponent as WavingIcon } from '../assets/icons/waving.svg';
import '../assets/styles/CreateBooking.scss';
import { Steps, Upload } from 'antd';
import MomoLogo from '../assets/images/momo.png';
import VnpayLogo from '../assets/images/vnpay.jpg';
import QrcodeImg from '../assets/images/qrcode.png';
import { AiOutlineCheck } from 'react-icons/ai';
import Bcrumb from '../components/Bcrumb';
import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
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
const { Step } = Steps;

export default function BookingPayment() {
  const user = JSON.parse(localStorage.getItem('user'));
  const path = useLocation();
  const { location_id, order_id } = useParams();
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
  const [paymentMethod, setPaymentMethod] = useState('bank_account');
  // handle pay order with bank
  const PAY_ORDER_WITH_BANK = gql`
    mutation PayOrderWithBank($fileId: UUID, $orderId: UUID!) {
      payOrderWithBank(data: { fileId: $fileId, orderId: $orderId }) {
        id
      }
    }
  `;
  const [payOrderWithBank] = useMutation(PAY_ORDER_WITH_BANK);
  const handleFinish = async () => {
    try {
      let res = await payOrderWithBank({
        variables: {
          fileId: fileList[0]?.response?.id,
          orderId: order_id,
        },
      });
      if (res.data) {
        navigate(`/create-booking/status/${location_id}/${orderInfo.id}`);
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
        <div>
          <Bcrumb
            data={[
              {
                label: 'Danh Sách',
                path: '/locations',
              },
              {
                label: 'Thông tin văn phòng',
                path: `/locations/${location_id}/working-space/${workingSpaceInfo.id}`,
              },
              {
                label: 'Tiến hành đặt chỗ',
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
            <Step title='Thông tin đặt chỗ' />
            <Step title='Thanh toán' />
            <Step title='Trạng thái' />
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
                  <div className='fw-bold'>
                    Bạn là nhân viên của Doanh nghiệp đối tác với WorkNow?
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
                      Đăng nhập
                    </a>{' '}
                    để thanh toán bằng tài khoản Doanh nghiệp. Hoặc{' '}
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
                      Đăng ký
                    </a>{' '}
                    để tận hưởng những ưu đãi thành viên.
                  </div>
                </div>
              </div>
            )}
            <div className='box-2'>
              <div className='row g-3'>
                <div className='col-md-6'>
                  <div className='left'>
                    <div className='title'>Mã đơn đặt</div>
                    <div className='content'>#{orderInfo?.orderId}</div>
                  </div>
                </div>
                <div className='col-md-6'>
                  <div className='right'>
                    <div className='title'>Hết hạn thanh toán sau</div>
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
              <div className='title'>Phương thức thanh toán</div>
              <div className='content'>
                <div className='confirm-text'>
                  Thư xác nhận sẽ được gửi đến email của bạn ngay sau khi chúng
                  tôi hoàn tất quá trình kiểm tra.
                </div>
                <div className='payment-method-title'>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    checked={paymentMethod === 'bank_account'}
                    onChange={() => setPaymentMethod('bank_account')}
                  />
                  <span>Chuyển khoản qua ngân hàng</span>
                </div>
                {paymentMethod === 'bank_account' && (
                  <div className='according-bank'>
                    <Accordion defaultActiveKey='0'>
                      <Accordion.Item eventKey='0'>
                        <Accordion.Header>
                          <div className='according-bank_header'>
                            Thông tin thanh toán
                          </div>
                        </Accordion.Header>
                        <Accordion.Body>
                          <div className='according-bank_body'>
                            <div className='bank-name'>Vietcombank</div>
                            <div className='bank-details'>
                              <div>
                                <span>Số tài khoản</span>
                                <span>0531002547497</span>
                              </div>
                              <div>
                                <span>Chủ tài khoản</span>
                                <span>Công ty TNHH Rockship</span>
                              </div>
                              <div>
                                <span>Nội dung chuyển khoản</span>
                                <span>
                                  Thanh toan dat cho #{orderInfo?.orderId}
                                </span>
                              </div>
                            </div>
                            <div className='bank-amount'>
                              <span>Số tiền</span>
                              <span>
                                {formatCurrency(orderInfo?.finalTotal)}
                              </span>
                            </div>
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </div>
                )}
                <div className='payment-method-title'>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    checked={paymentMethod === 'e_wallet'}
                    onChange={() => setPaymentMethod('e_wallet')}
                  />
                  <span>Ví điện tử</span>
                </div>
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
                  <div className='upload-bill'>Tải hóa đơn chuyển khoản</div>
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
              <div className='title'>Vị trí đã chọn</div>
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
                    {/* <div>Thứ Hai, 31 Tháng 2, 2022</div>
                    <div>09:00 - 13:00 (4 tiếng)</div> */}
                  </div>
                </div>
              </div>
            </div>
            <div className='box-3'>
              <div className='title'>Chi tiết giá</div>
              <div className='price-detail'>
                <div>
                  <span>Giá gốc</span>
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
                <span>Tổng cộng</span>
                <span>{formatCurrency(orderInfo?.finalTotal)}</span>
              </div>
              <p className='policy'>
                Giá trên không bao gồm các chi phí khi bạn sử dụng các dịch vụ
                và tiện ích khác của tòa nhà. Khi bạn muốn hủy hoặc hoàn tiền
                cho vị trí đã đặt vui lòng kiểm tra kỹ{' '}
                <b>chính sách hủy và hoàn tiền của WorkNow</b>{' '}
                <a href='#'>tại đây</a>
              </p>
            </div>
            <button
              type='button'
              className='payment-button'
              onClick={handleFinish}
            >
              Tôi đã hoàn tất
            </button>
          </div>
        </div>
      </div>
      <OrderExpireModal
        show={showOrderExpire}
        order_code={orderInfo?.orderId}
      />
    </div>
  );
}
