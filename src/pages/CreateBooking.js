import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import '../assets/styles/CreateBooking.scss';
import { Steps } from 'antd';
import { Avatar } from 'antd';
import { AiOutlineUser } from 'react-icons/ai';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import Img1 from '../assets/images/location_img1.png';
import { AiOutlineCheck } from 'react-icons/ai';
import { FiPhone } from 'react-icons/fi';
import * as Yup from 'yup';
const { Step } = Steps;

export default function CreateBooking() {
  const [currentStep, setCurrentStep] = useState(0);
  const customerInfo = {
    full_name: '',
    email: '',
    phone: '',
  };
  const validationSchema = Yup.object().shape({
    full_name: Yup.string().required('This field is required!'),
    email: Yup.string()
      .email('This is not a valid email.')
      .required('This field is required!'),
    phone: Yup.string().required('This field is required!'),
  });
  const handleSubmit = (formValue) => {
    const { full_name, email, phone } = formValue;
    setCurrentStep(1);
  };
  const onFinishPayment = () => {
    setCurrentStep(2);
  };
  return (
    <div className='create-booking'>
      <div className='header'>
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
      </div>
      <div className='body container-md'>
        {currentStep === 0 && (
          <div className='row'>
            <div className='col-lg-7 info-customer'>
              <div className='box-1'>
                <Avatar size={50} icon={<AiOutlineUser />} className='me-2' />
                <div>
                  <div>
                    Bạn là nhân viên của Doanh nghiệp đối tác với WorkNow?{' '}
                  </div>
                  <div>
                    <a href='#'>Đăng nhập</a> để thanh toán bằng tài khoản Doanh
                    nghiệp.
                  </div>
                  <div>
                    Hoặc <a href='#'>Đăng ký</a> để tận hưởng những ưu đãi thành
                    viên.
                  </div>
                </div>
              </div>
              <div className='box-2'>
                <div className='form-check'>
                  <input
                    className='form-check-input'
                    name='flexRadioDefault'
                    type='radio'
                    id='bank'
                  />
                  <label className='form-check-label' for='bank'>
                    Tài khoản ngân hàng
                  </label>
                </div>
                <div className='form-check'>
                  <input
                    className='form-check-input'
                    name='flexRadioDefault'
                    type='radio'
                    id='momo'
                  />
                  <label class='form-check-label' for='momo'>
                    Momo
                  </label>
                </div>
                <div className='form-check'>
                  <input
                    className='form-check-input'
                    name='flexRadioDefault'
                    type='radio'
                    id='vnpay'
                  />
                  <label class='form-check-label' for='vnpay'>
                    VNPAY
                  </label>
                </div>
              </div>
              <div className='box-3'>
                <div className='header'>Thông tin của bạn</div>
                <Formik
                  initialValues={customerInfo}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  <Form>
                    <div className='form-group mb-2'>
                      <label htmlFor='full_name'>Họ và tên</label>
                      <Field
                        name='full_name'
                        type='text'
                        className='form-control'
                      />
                      <ErrorMessage
                        name='full_name'
                        component='div'
                        className='text-danger'
                      />
                    </div>
                    <div className='form-group mb-2'>
                      <label htmlFor='email'>Email</label>
                      <Field
                        name='email'
                        type='email'
                        className='form-control'
                      />
                      <ErrorMessage
                        name='email'
                        component='div'
                        className='text-danger'
                      />
                    </div>
                    <div className='form-group mb-2'>
                      <label htmlFor='phone'>Phone</label>
                      <Field
                        name='phone'
                        type='phone'
                        className='form-control'
                      />
                      <ErrorMessage
                        name='phone'
                        component='div'
                        className='text-danger'
                      />
                    </div>
                    <p>
                      Bằng việc nhấn Xác nhận, bạn đã đồng ý với{' '}
                      <a href='#'>Chính sách và Điều khoản</a> của chúng tôi.
                    </p>
                    <div className='form-group d-flex justify-content-end'>
                      <button type='submit' className='btn btn-primary ms-auto'>
                        Xác nhận
                      </button>
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
                </div>
              </div>
              <div className='box-2'>
                <div className='time'>
                  <div>Thứ năm, 8 Th9 2022</div>
                  <div>09:00 - 13:00 (4h)</div>
                </div>
                <div className='workspace'>
                  <div>
                    <span>1x</span> Bàn làm việc cá nhân
                  </div>
                </div>
                <div className='workspace-details'>
                  <img src={Img1} alt='' />
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
              <div className='box-3'>
                <div className='title'>Mã giảm giá</div>
                <div>
                  <input type='text' className='form-control' />
                </div>
              </div>
              <div className='box-4'>
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
          </div>
        )}
        {currentStep === 1 && (
          <div className='row'>
            <div className='col-lg-7 info-payment'>
              <div>
                <div>
                  <div className='step-number'>1</div>
                  <div className='step-info'>
                    <div className='step-title'>Tiến hành thanh toán trước</div>
                    <div className='step-content step-1'>
                      <div className='fw-bold'>Hôm nay, 9 Th8 2022 17:38</div>
                      <div>Tiến hành thanh toán trong vòng 1 giờ 30 phút</div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className='step-number'>2</div>
                  <div className='step-info'>
                    <div className='step-title'>Vui lòng chuyển khoản đến</div>
                    <div className='step-content step-2'>
                      <div className='fw-bold'>Vietcombank</div>
                      <div className='bank-account'>
                        <div className='number'>
                          <div>Số tài khoản</div>
                          <div>0331000468999</div>
                        </div>
                        <div className='name'>
                          <div>Chủ tài khoản</div>
                          <div>Công ty TNHH WorkNow</div>
                        </div>
                        <div className='content'>
                          <div>Nội dung chuyển khoản</div>
                          <div>Thanh toán đặt chỗ 867555999</div>
                        </div>
                      </div>
                      <div className='bank-amount'>
                        <div>Số tiền</div>
                        <div>100,000đ</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className='step-number'>3</div>
                  <div className='step-info'>
                    <div className='step-title'>
                      Bạn đã hoàn tất thanh toán?
                    </div>
                    <div className='step-content step-3'>
                      <div>
                        Sau khi kiểm tra nhận được thanh toán, chúng tôi sẽ gửi
                        email xác nhận đặt chỗ đến bạn
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <button
                    type='button'
                    className='btn btn-primary ms-auto'
                    onClick={onFinishPayment}
                  >
                    Tôi đã hoàn tất
                  </button>
                </div>
              </div>
            </div>
            <div className='col-lg-5 info-workspace'>
              <div className='box-1'>
                <img src={Img1} alt='' />
                <div>
                  <div>Circo Đông Du</div>
                  <div>41 Đông Du, Bến Nghé, Quận 1, TPHCM</div>
                </div>
              </div>
              <div className='box-2'>
                <div className='time'>
                  <div>Thứ năm, 8 Th9 2022</div>
                  <div>09:00 - 13:00 (4h)</div>
                </div>
                <div className='workspace'>
                  <div>
                    <span>1x</span> Bàn làm việc cá nhân
                  </div>
                </div>
                <div className='workspace-details'>
                  <img src={Img1} alt='' />
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
              <div className='box-3'>
                <div className='title'>Mã giảm giá</div>
                <div>
                  <input type='text' className='form-control' />
                </div>
              </div>
              <div className='box-4'>
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
          </div>
        )}
        {currentStep === 2 && (
          <div className='row'>
            <div className='col-lg-7 info-booking'>
              <div>
                <div>
                  <a href=''>Tải lên</a> hóa đơn thanh toán để đẩy nhanh quá
                  trình xác nhận
                </div>
                <div className='mb-3'>
                  Cảm ơn bạn, chúng tôi đang xác nhận thanh toán
                </div>
                <div>
                  <button type='button' className='btn btn-primary ms-auto'>
                    Cập nhật trạng thái
                  </button>
                </div>
              </div>
              <div className='need-help'>
                <div>
                  <div>Cần hỗ trợ</div>
                  <small>Gọi chúng tôi nếu bạn cần trợ giúp</small>
                </div>
                <div className='phone-number'>
                  <FiPhone /> 0834 4555
                </div>
              </div>
            </div>
            <div className='col-lg-5 info-workspace'>
              <div className='box-1'>
                <img src={Img1} alt='' />
                <div>
                  <div>Circo Đông Du</div>
                  <div>41 Đông Du, Bến Nghé, Quận 1, TPHCM</div>
                </div>
              </div>
              <div className='box-2'>
                <div className='time'>
                  <div>Thứ năm, 8 Th9 2022</div>
                  <div>09:00 - 13:00 (4h)</div>
                </div>
                <div className='workspace'>
                  <div>
                    <span>1x</span> Bàn làm việc cá nhân
                  </div>
                </div>
                <div className='workspace-details'>
                  <img src={Img1} alt='' />
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
              <div className='box-4'>
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
          </div>
        )}
      </div>
    </div>
  );
}
