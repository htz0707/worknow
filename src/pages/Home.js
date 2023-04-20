import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/Home.scss';
import { BiPaperPlane } from 'react-icons/bi';
import { ReactComponent as Reason1 } from '../assets/images/reason1.svg';
import { ReactComponent as Reason2 } from '../assets/images/reason2.svg';
import { ReactComponent as Reason3 } from '../assets/images/reason3.svg';
import { ReactComponent as Reason4 } from '../assets/images/reason4.svg';
import hl1 from '../assets/images/highlight1.png';
import hl2 from '../assets/images/highlight2.png';
import hl3 from '../assets/images/highlight3.png';
import hl4 from '../assets/images/highlight4.png';
import { Trans, useTranslation, withTranslation } from 'react-i18next';
import { ReactComponent as BannerIcon1 } from '../assets/icons/bannerIcon1.svg';
import { ReactComponent as BannerIcon2 } from '../assets/icons/bannerIcon2.svg';
import { ReactComponent as BannerIcon3 } from '../assets/icons/bannerIcon3.svg';
import ReactGA from 'react-ga4';

function NewBusiness() {
  const { t } = useTranslation();
  let navigate = useNavigate();
  return (
    <div className='home'>
      <div className='section-1'>
        <div className='section-container page-container'>
          <div className='title'>
            <Trans i18nKey='homepage_title'>
              GIẢI PHÁP TOÀN DIỆN
              <br />
              CHO VĂN PHÒNG LÀM VIỆC
            </Trans>
          </div>
          <div className='options-section'>
            <div className='option option-1'>
              <div className='name'>{t('booking_on_demand')}</div>
              <div
                className='sub-layer'
                onClick={() => {
                  ReactGA.event({
                    category: 'on_click',
                    action: 'booking_on_demand_clicked',
                    label: 'Đặt chỗ theo nhu cầu',
                  });
                  navigate('/locations');
                }}
              >
                <div className='icon-badge'>
                  <BannerIcon1 className='icon' />
                </div>
                <div className='title'>{t('booking_on_demand')}</div>
                <div className='description'>
                  {t('booking_on_demand_description')}
                </div>
              </div>
            </div>
            <div className='option option-2'>
              <div className='name'>{t('quote_flex_office')}</div>
              <div
                className='sub-layer'
                onClick={() => {
                  ReactGA.event({
                    category: 'on_click',
                    action: 'quote_flex_office_clicked',
                    label: 'Báo giá flex office',
                  });
                  navigate('/quote-flex-office');
                }}
              >
                <div className='icon-badge'>
                  <BannerIcon2 className='icon' />
                </div>
                <div className='title'>{t('quote_flex_office')}</div>
                <div className='description'>
                  {t('quote_flex_office_description')}
                </div>
              </div>
            </div>
            <div className='option option-3'>
              <div className='name'>{t('manage_hybrid_office')}</div>
              <div
                className='sub-layer'
                onClick={() => {
                  ReactGA.event({
                    category: 'on_click',
                    action: 'manage_hybrid_office_clicked',
                    label: 'Quản lý văn phòng hybrid',
                  });
                  navigate('/manage-hybrid-office');
                }}
              >
                <div className='icon-badge'>
                  <BannerIcon3 className='icon' />
                </div>
                <div className='title'>{t('manage_hybrid_office')}</div>
                <div className='description'>
                  {t('manage_hybrid_office_description')}
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
                <Reason3 height={170} />
              </div>
              <h5 className='d-flex justify-content-center align-items center mt-3'>
                {t('pros_3')}
              </h5>
              <p className='px-3 text-justify'>{t('pros_3_description')}</p>
            </div>
            <div className='col-lg-3'>
              <div className='d-flex justify-content-center align-items center'>
                <Reason4 height={170} />
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
export default withTranslation()(NewBusiness);
