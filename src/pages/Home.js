import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import '../assets/styles/Home.scss';

import { Button } from 'react-bootstrap';
import { BiPaperPlane } from 'react-icons/bi';
import { BsPlayCircle } from 'react-icons/bs';
import { ReactComponent as Reason1 } from '../assets/images/reason1.svg';
import { ReactComponent as Reason2 } from '../assets/images/reason2.svg';
import { ReactComponent as Reason3 } from '../assets/images/reason3.svg';
import { ReactComponent as Reason4 } from '../assets/images/reason4.svg';

import TwoPeople from '../assets/images/two_people.png';
import P1 from '../assets/icons/partner1.svg';
import P2 from '../assets/icons/partner2.svg';
import P3 from '../assets/icons/partner3.svg';
import P4 from '../assets/icons/partner4.svg';
import P5 from '../assets/icons/partner5.svg';
import hl1 from '../assets/images/highlight1.png';
import hl2 from '../assets/images/highlight2.png';
import hl3 from '../assets/images/highlight3.png';
import hl4 from '../assets/images/highlight4.png';
import { useTranslation } from 'react-i18next';
import { ReactComponent as PartnerShipIcon } from '../assets/icons/partnership.svg';
import { ReactComponent as IndividualIcon } from '../assets/icons/individual.svg';
import ReactGA from 'react-ga4';

export default function NewBusiness() {
  const { t } = useTranslation();
  let navigate = useNavigate();
  const handleClick = () => {
    navigate(`/locations`);
  };
  return (
    <div className='home'>
      <div className='section-1'>
        <div className='section-container page-container'>
          <h2 className='title'>
            TỐI ƯU HÓA MÔ HÌNH LÀM VIỆC KẾT HỢP (HYBRID)
          </h2>
          <p className='description'>
            Tiết kiệm chi phí một cách hiệu quả, gia tăng hiệu suất, đổi mới tư
            duy và kiến tạo cho những thành tựu ở tương lai
          </p>
          <div className='customer-kind'>
            <div className='business-customer'>
              <div className='name'>Khách hàng doanh nghiệp</div>
              <div
                className='sub-layer'
                onClick={() => {
                  ReactGA.event({
                    category: 'on_click',
                    action: 'business_customer_clicked',
                    label: 'Khách hàng doanh nghiệp',
                  });
                  navigate('/business');
                }}
              >
                <div className='icon-badge'>
                  <PartnerShipIcon className='icon' />
                </div>
                <div className='title'>Khách hàng doanh nghiệp</div>
                <div className='description'>
                  Bạn có biết, sự tăng trưởng của một số công ty công nghệ hiện
                  nay chỉ dựa vào việc thay đổi một nơi làm việc phù hợp. Văn
                  phòng hiện đại, tiện ích đi kèm, độ xác thực cao và rộng khắp
                  TP.HCM là những gì mà bạn có thể tìm thấy tại Worknow.
                </div>
              </div>
            </div>
            <div className='individual-customer'>
              <div className='name'>Khách hàng cá nhân</div>
              <div
                className='sub-layer'
                onClick={() => {
                  ReactGA.event({
                    category: 'on_click',
                    action: 'individual_customer_clicked',
                    label: 'Khách hàng cá nhân',
                  });
                  navigate('/locations');
                }}
              >
                <div className='icon-badge'>
                  <IndividualIcon className='icon' />
                </div>
                <div className='title'>Khách hàng cá nhân</div>
                <div className='description'>
                  Là một nhà sáng tạo nội dung, một Freelancer, một marketer hay
                  đơn giản là bạn cần những thay đổi về không gian về nơi làm
                  việc mang lại hứng khởi cho công việc của mình thì Worknow tự
                  tin có thể mang đến cho bạn những trải nghiệm tuyệt vời với
                  những không gian làm việc mới mẻ, hiện đại và riêng tư.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='section-2'>
        <div className='container-fluid page-container'>
          <h3 className='d-flex justify-content-center align-items center my-5 fw-bold'>
            {t('why_should_be_worknow')}
          </h3>
          <div className='row'>
            <div className='col-lg-3'>
              <div className='d-flex justify-content-center align-items center'>
                <Reason1 height={170} />
              </div>
              <h5 className='d-flex justify-content-center align-items center mt-3'>
                {t('pros_1')}
              </h5>
              <p className='px-3 text-justify'>{t('pros_1_description')}</p>
            </div>
            <div className='col-lg-3'>
              <div className='d-flex justify-content-center align-items center'>
                <Reason2 height={170} />
              </div>
              <h5 className='d-flex justify-content-center align-items center mt-3'>
                {t('pros_2')}
              </h5>
              <p className='px-3 text-justify'>{t('pros_2_description')}</p>
            </div>
            <div className='col-lg-3'>
              <div className='d-flex justify-content-center align-items center'>
                <Reason1 height={170} />
              </div>
              <h5 className='d-flex justify-content-center align-items center mt-3'>
                {t('pros_3')}
              </h5>
              <p className='px-3 text-justify'>{t('pros_3_description')}</p>
            </div>
            <div className='col-lg-3'>
              <div className='d-flex justify-content-center align-items center'>
                <Reason2 height={170} />
              </div>
              <h5 className='d-flex justify-content-center align-items center mt-3'>
                {t('pros_4')}
              </h5>
              <p className='px-3 text-justify'>{t('pros_4_description')}</p>
            </div>
          </div>
        </div>
      </div>
      <div className='section-3'>
        <div className='container-fluid page-container'>
          <h3 className='my-5 fw-bold'> {t('outstanding_type')}</h3>
          <div className='flex-box justify-content-center mb-3'>
            <div className=''>
              <div className='working-space-type-card mb-3'>
                <img src={hl3} alt='hl-3' className='image' />
                <div className='footer-section'>
                  <div className='content'>
                    <div className='title'> {t('private_booth')}</div>
                    <p className='description'>
                      {t('private_booth_description')}
                    </p>
                  </div>
                  <button
                    className='btn-discover'
                    onClick={() =>
                      navigate('/locations?workingSpaceTypes=booth')
                    }
                  >
                    {t('discover')} <BiPaperPlane className='ms-2' />
                  </button>
                </div>
              </div>
              <div className='working-space-type-card'>
                <img src={hl1} alt='hl-1' className='image image-2' />
                <div className='footer-section'>
                  <div className='content'>
                    <div className='title'>{t('flexible_seat')}</div>
                    <p className='description'>
                      {t('flexible_seat_description')}
                    </p>
                  </div>
                  <button
                    className='btn-discover'
                    onClick={() =>
                      navigate('/locations?workingSpaceTypes=flexible_desk')
                    }
                  >
                    {t('discover')} <BiPaperPlane className='ms-2' />
                  </button>
                </div>
              </div>
            </div>
            <div className='col-right'>
              <div className='working-space-type-card mb-3'>
                <img src={hl4} alt='hl-4' className='image' />
                <div className='footer-section'>
                  <div className='content'>
                    <div className='title'>{t('meeting_room')}</div>
                    <p className='description'>
                      {t('meeting_room_description')}
                    </p>
                  </div>
                  <button
                    className='btn-discover'
                    onClick={() =>
                      navigate('/locations?workingSpaceTypes=meeting_room')
                    }
                  >
                    {t('discover')} <BiPaperPlane className='ms-2' />
                  </button>
                </div>
              </div>
              <div className='working-space-type-card mb-3'>
                <img src={hl2} alt='hl-2' className='image' />
                <div className='footer-section'>
                  <div className='content'>
                    <div className='title'>{t('event_hall')}</div>
                    <p className='description'>{t('event_hall_description')}</p>
                  </div>
                  <button
                    className='btn-discover'
                    onClick={() =>
                      navigate('/locations?workingSpaceTypes=event')
                    }
                  >
                    {t('discover')} <BiPaperPlane className='ms-2' />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
