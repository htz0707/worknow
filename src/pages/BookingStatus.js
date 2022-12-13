import React, { useState } from 'react';
import { ReactComponent as Logo } from '../assets/images/logo.svg';
import { ReactComponent as PhoneIcon } from '../assets/icons/phone.svg';
import '../assets/styles/CreateBooking.scss';
import { Steps } from 'antd';
import Img1 from '../assets/images/location_img1.png';
import Bcrumb from '../components/Bcrumb';
import { useEffect } from 'react';
const { Step } = Steps;

export default function BookingStatus() {
  const [currentStep, setCurrentStep] = useState(2);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className='create-booking page-container'>
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
