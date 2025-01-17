import React, { useState } from 'react';
import { Accordion, Button } from 'react-bootstrap';
import { ReactComponent as Logo } from '../assets/images/logo.svg';
import { ReactComponent as WavingIcon } from '../assets/icons/waving.svg';
import { ReactComponent as PhoneIcon } from '../assets/icons/phone.svg';
import '../assets/styles/CreateBooking.scss';
import { Steps } from 'antd';
import { Avatar } from 'antd';
import { AiOutlineUser } from 'react-icons/ai';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import Img1 from '../assets/images/location_img1.png';
import MomoLogo from '../assets/images/momo.png';
import VnpayLogo from '../assets/images/vnpay.jpg';
import QrcodeImg from '../assets/images/qrcode.png';
import { AiOutlineCheck } from 'react-icons/ai';
import { FiPhone } from 'react-icons/fi';
import * as Yup from 'yup';
import Bcrumb from '../components/Bcrumb';
const { Step } = Steps;

export default function CreateBooking() {
  const [currentStep, setCurrentStep] = useState(0);
  const customerInfo = {
    full_name: '',
    email: '',
    phone: '',
    note: '',
  };
  const validationSchema = Yup.object().shape({
    full_name: Yup.string().required('This field is required!'),
    email: Yup.string()
      .email('This is not a valid email.')
      .required('This field is required!'),
    phone: Yup.string().required('This field is required!'),
  });
  const handleSubmit = (formValue) => {
    const { full_name, email, phone, note } = formValue;
    console.log(note);
    setCurrentStep(1);
  };
  const onFinishPayment = () => {
    setCurrentStep(2);
  };
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
          <Logo className='logo' />
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
                path: '/locations/details/1',
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
            current={currentStep} labelPlacement='vertical'
          >
            <Step title='Thông tin đặt chỗ' />
            <Step title='Thanh toán' />
            <Step title='Trạng thái' />
          </Steps>
        </div>
      </div>
      <div className='create-booking_body'>
        {currentStep === 0 && (
          <div className='row'>
            <div className='col-lg-7 info-customer'>
              <div className='box-1'>
                <WavingIcon />
                <div>
                  <div className='fw-bold'>
                    Bạn là nhân viên của Doanh nghiệp đối tác với WorkNow?
                  </div>
                  <div>
                    <a href='#'>Đăng nhập</a> để thanh toán bằng tài khoản Doanh
                    nghiệp. Hoặc <a href='#'>Đăng ký</a> để tận hưởng những ưu
                    đãi thành viên.
                  </div>
                </div>
              </div>
              <div className='box-2'>
                <div className='title'>Mã đơn đặt</div>
                <div className='content'>#123456</div>
              </div>
              <div className='box-3'>
                <div className='header'>Thông tin khách hàng</div>
                <Formik
                  initialValues={customerInfo}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  <Form id='my_form'>
                    <div className='form-group mb-3'>
                      <label htmlFor='full_name'>
                        Họ và tên <span>*</span>
                      </label>
                      <Field
                        name='full_name'
                        type='text'
                        placeholder='Nhập vào tên của bạn'
                        className='form-control'
                      />
                      <ErrorMessage
                        name='full_name'
                        component='div'
                        className='text-danger'
                      />
                    </div>
                    <div className='form-group mb-3'>
                      <label htmlFor='phone'>
                        Di động <span>*</span>
                      </label>
                      <Field
                        name='phone'
                        type='phone'
                        placeholder='Nhập vào số điện thoại của bạn'
                        className='form-control'
                      />
                      <ErrorMessage
                        name='phone'
                        component='div'
                        className='text-danger'
                      />
                    </div>
                    <div className='form-group mb-3'>
                      <label htmlFor='email'>
                        Email <span>*</span>
                      </label>
                      <Field
                        name='email'
                        type='email'
                        placeholder='Nhập vào email của bạn'
                        className='form-control'
                      />
                      <ErrorMessage
                        name='email'
                        component='div'
                        className='text-danger'
                      />
                    </div>
                    <div className='form-group mb-3'>
                      <label htmlFor='note'>Ghi chú</label>
                      <Field
                        name='note'
                        as='textarea'
                        className='form-control'
                      />
                    </div>
                  </Form>
                </Formik>
              </div>
            </div>
            <div className='col-lg-5 info-workspace'>
              <div className='box-1'>
                <img src={Img1} alt='' />
                <div>
                  <div>Circo Đông Du</div>
                  <div>41 Đông Du, Bến Nghé, Quận 1, TPHCM</div>
                  <div>{'4.8 / 5.0 Rất tốt (120 đánh giá)'}</div>
                  <ul>
                    <li>
                      <AiOutlineCheck style={{ color: '#04B000' }} /> Wifi miễn
                      phí
                    </li>
                    <li>
                      <AiOutlineCheck style={{ color: '#04B000' }} /> Đậu xe
                      miễn phí
                    </li>
                    <li>
                      <AiOutlineCheck style={{ color: '#04B000' }} /> Mini bar
                    </li>
                    <li>
                      <AiOutlineCheck style={{ color: '#04B000' }} /> Máy in
                    </li>
                  </ul>
                </div>
              </div>
              <div className='box-2'>
                <div className='title'>Vị trí đã chọn</div>
                <div>
                  <div className='selected-workspace'>
                    <span>x1</span>
                    <img src={Img1} alt='' />
                    <div>
                      <div className='fw-bold'>Bàn làm việc cá nhân</div>
                      <div>Thứ Hai, 31 Tháng 2, 2022</div>
                      <div>09:00 - 13:00 (4 tiếng)</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='box-3'>
                <div className='title'>Chi tiết giá</div>
                <div className='price-detail'>
                  <div>
                    <span>Giá gốc</span>
                    <span>250,000đ</span>
                  </div>
                  <div>
                    <span>Giá sau giảm</span>
                    <span>125,000đ</span>
                  </div>
                  <div>
                    <span>Voucher</span>
                    <span>-25,000đ</span>
                  </div>
                </div>
                <div className='price-total'>
                  <span>Tổng cộng</span>
                  <span>100,000đ</span>
                </div>
                <p className='policy'>
                  Giá trên không bao gồm các chi phí khi bạn sử dụng các dịch vụ
                  và tiện ích khác của tòa nhà. Khi bạn muốn hủy hoặc hoàn tiền
                  cho vị trí đã đặt vui lòng kiểm tra kỹ{' '}
                  <b>chính sách hủy và hoàn tiền của Circo</b>{' '}
                  <a href='#'>tại đây</a>
                </p>
              </div>
              <button type='submit' form='my_form' className='payment-button'>
                Thanh toán
              </button>
            </div>
          </div>
        )}
        {currentStep === 1 && (
          <div className='row'>
            <div className='col-lg-7 info-payment'>
              <div className='box-1'>
                <WavingIcon />
                <div>
                  <div className='fw-bold'>
                    Bạn là nhân viên của Doanh nghiệp đối tác với WorkNow?
                  </div>
                  <div>
                    <a href='#'>Đăng nhập</a> để thanh toán bằng tài khoản Doanh
                    nghiệp. Hoặc <a href='#'>Đăng ký</a> để tận hưởng những ưu
                    đãi thành viên.
                  </div>
                </div>
              </div>
              <div className='box-2'>
                <div className='row g-3'>
                  <div className='col-md-6'>
                    <div className='left'>
                      <div className='title'>Mã đơn đặt</div>
                      <div className='content'>#123456</div>
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='right'>
                      <div className='title'>Hết hạn thanh toán sau</div>
                      <div className='content'>01:25:00</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='box-3'>
                <div className='title'>Phương thức thanh toán</div>
                <div className='content'>
                  <div className='confirm-text'>
                    Thư xác nhận sẽ được gửi đến email của bạn ngay sau khi
                    chúng tôi hoàn tất quá trình kiểm tra.
                  </div>
                  <div className='fw-bold'>Chuyển khoản qua ngân hàng</div>
                  <div className='according-bank'>
                    <Accordion>
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
                                <span>0331000468999</span>
                              </div>
                              <div>
                                <span>Chủ tài khoản</span>
                                <span>Công ty TNHH WorkNow</span>
                              </div>
                              <div>
                                <span>Nội dung chuyển khoản</span>
                                <span>Thanh toan dat cho #1234567</span>
                              </div>
                            </div>
                            <div className='bank-amount'>
                              <span>Số tiền</span>
                              <span>100,000đ</span>
                            </div>
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </div>
                  <div className='upload-bill'>Tải hóa đơn chuyển khoản</div>
                  <div className='fw-bold'>Ví điện tử</div>
                  <div className='according-ewallet'>
                    <Accordion>
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
                              <div className='ewallet'>
                                <div className='logo-container'>
                                  <img src={VnpayLogo} alt='' />
                                </div>
                                <div>VNPAY</div>
                              </div>
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
                                <span>Thanh toan dat cho #1234567</span>
                              </div>
                            </div>
                            <div className='amount'>
                              <span>Số tiền</span>
                              <span>100,000đ</span>
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
                </div>
              </div>
            </div>
            <div className='col-lg-5 info-workspace'>
              <div className='box-1'>
                <img src={Img1} alt='' />
                <div>
                  <div>Circo Đông Du</div>
                  <div>41 Đông Du, Bến Nghé, Quận 1, TPHCM</div>
                  <div>{'4.8 / 5.0 Rất tốt (120 đánh giá)'}</div>
                  <ul>
                    <li>
                      <AiOutlineCheck style={{ color: '#04B000' }} /> Wifi miễn
                      phí
                    </li>
                    <li>
                      <AiOutlineCheck style={{ color: '#04B000' }} /> Đậu xe
                      miễn phí
                    </li>
                    <li>
                      <AiOutlineCheck style={{ color: '#04B000' }} /> Mini bar
                    </li>
                    <li>
                      <AiOutlineCheck style={{ color: '#04B000' }} /> Máy in
                    </li>
                  </ul>
                </div>
              </div>
              <div className='box-2'>
                <div className='title'>Vị trí đã chọn</div>
                <div>
                  <div className='selected-workspace'>
                    <span>x1</span>
                    <img src={Img1} alt='' />
                    <div>
                      <div className='fw-bold'>Bàn làm việc cá nhân</div>
                      <div>Thứ Hai, 31 Tháng 2, 2022</div>
                      <div>09:00 - 13:00 (4 tiếng)</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='box-3'>
                <div className='title'>Chi tiết giá</div>
                <div className='price-detail'>
                  <div>
                    <span>Giá gốc</span>
                    <span>250,000đ</span>
                  </div>
                  <div>
                    <span>Giá sau giảm</span>
                    <span>125,000đ</span>
                  </div>
                  <div>
                    <span>Voucher</span>
                    <span>-25,000đ</span>
                  </div>
                </div>
                <div className='price-total'>
                  <span>Tổng cộng</span>
                  <span>100,000đ</span>
                </div>
                <p className='policy'>
                  Giá trên không bao gồm các chi phí khi bạn sử dụng các dịch vụ
                  và tiện ích khác của tòa nhà. Khi bạn muốn hủy hoặc hoàn tiền
                  cho vị trí đã đặt vui lòng kiểm tra kỹ{' '}
                  <b>chính sách hủy và hoàn tiền của Circo</b>{' '}
                  <a href='#'>tại đây</a>
                </p>
              </div>
              <button
                type='button'
                className='payment-button'
                onClick={onFinishPayment}
              >
                Tôi đã hoàn tất
              </button>
            </div>
          </div>
        )}
        {currentStep === 2 && (
          <div className='row'>
            <div className='mx-auto col-xl-5 col-lg-7 info-booking'>
              <div>
                <div className='title'>Đơn đặt của bạn</div>
                <div className='status-booking'>
                  <div>Trạng thái chỗ đặt:</div>
                  <div>
                    <div className='status verify'>Đang xác thực</div>
                  </div>
                </div>
                <div className='code-booking'>
                  <div>Mã đơn đặt:</div>
                  <div>#12345678</div>
                </div>
                <div className='confirm-booking'>
                  <p>
                    Email xác thực sẽ được gửi đến bạn sau khi hoàn tất quá
                    trình xác thực. Chúng tôi sẽ tiến hành hủy đơn đặt chỗ nếu
                    chưa nhận được xác nhận thanh toán sau:{' '}
                  </p>
                  <div>01:25:00</div>
                </div>
                <div className='location-info'>
                  <div className='location-name'>circo đông du</div>
                  <div>41 Đông Du, Bến Nghé, Quận 1, Thành Phố Hồ Chí Minh</div>
                  <div className='workspace-item'>
                    <img src={Img1} alt='' />
                    <div>
                      <div className='fw-bold'>x1 Bàn làm việc cá nhân</div>
                      <div>Thứ Hai, 25 Tháng 2, 2022</div>
                      <div>09:00 - 13:00 (4 tiếng)</div>
                      <div>220.000đ</div>
                    </div>
                  </div>
                </div>
                <div className='summary'>
                  <div className='title'>Tóm tắt thanh toán</div>
                  <div className='price-detail'>
                    <div>
                      <span>Giá gốc</span>
                      <span>250,000đ</span>
                    </div>
                    <div>
                      <span>Giá sau giảm</span>
                      <span>125,000đ</span>
                    </div>
                    <div>
                      <span>Voucher</span>
                      <span>-25,000đ</span>
                    </div>
                  </div>
                  <div className='price-total'>
                    <span>Tổng cộng</span>
                    <span>100,000đ</span>
                  </div>
                </div>
              </div>
              <div>
                <div className='title'>Hỗ trợ</div>
                <p>Gọi ngay cho chúng tôi ngay nếu bạn cần trợ giúp</p>
                <div className='phone-button'>
                  <PhoneIcon className='me-2' /> 1900 5232
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
