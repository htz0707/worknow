import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/Home.scss';
import { BiPaperPlane } from 'react-icons/bi';
// import { ReactComponent as Reason1 } from '../assets/images/reason1.svg';
// import { ReactComponent as Reason2 } from '../assets/images/reason2.svg';
// import { ReactComponent as Reason3 } from '../assets/images/reason3.svg';
// import { ReactComponent as Reason4 } from '../assets/images/reason4.svg';
import hl1 from '../assets/images/highlight1.png';
import hl2 from '../assets/images/highlight2.png';
import hl3 from '../assets/images/highlight3.png';
import hl4 from '../assets/images/highlight4.png';
import { Trans, useTranslation, withTranslation } from 'react-i18next';
import { ReactComponent as BannerIcon1 } from '../assets/icons/bannerIcon1.svg';
import { ReactComponent as BannerIcon2 } from '../assets/icons/bannerIcon2.svg';
import { ReactComponent as BannerIcon3 } from '../assets/icons/bannerIcon3.svg';
import WorkNowBenefit1 from '../assets/images/worknow_benefit_1.png';
import WorkNowBenefit2 from '../assets/images/worknow_benefit_2.png';
import WorkNowBenefit3 from '../assets/images/worknow_benefit_3.png';
import { ReactComponent as TickIcon } from '../assets/icons/tick.svg';
import { ReactComponent as UserSettingIcon } from '../assets/icons/userSetting.svg';
import { ReactComponent as BarGraphIcon } from '../assets/icons/barGraph.svg';
import { ReactComponent as WalletIcon } from '../assets/icons/wallet.svg';
import { ReactComponent as CallingIcon } from '../assets/icons/calling.svg';
import { ReactComponent as HeartIcon } from '../assets/icons/heart.svg';
import { ReactComponent as PartyIcon } from '../assets/icons/party.svg';
import { ReactComponent as LocationIcon } from '../assets/icons/location1.svg';
import { ReactComponent as NetworkIcon } from '../assets/icons/network.svg';
import { ReactComponent as PrivacyIcon } from '../assets/icons/privacy.svg';
import ReactGA from 'react-ga4';
import { Helmet } from 'react-helmet-async';

function NewBusiness() {
  const { t } = useTranslation();
  let navigate = useNavigate();
  return (
    <div className='home'>
      <Helmet>
        <title>WorkNow</title>
        <meta
          name='description'
          content='GIẢI PHÁP TOÀN DIỆN CHO VĂN PHÒNG LÀM VIỆC'
        />
        <link rel='canonical' href='https://worknow.center' />
        <meta property='og:title' content='WorkNow' />
        <meta
          property='og:description'
          content='GIẢI PHÁP TOÀN DIỆN CHO VĂN PHÒNG LÀM VIỆC'
        />
      </Helmet>
      <div className='section-1'>
        <div className='section-container page-container'>
          <div className='title' data-aos='fade-down'>
            <Trans i18nKey='homepage_title'>
              GIẢI PHÁP TOÀN DIỆN
              <br />
              CHO VĂN PHÒNG LÀM VIỆC
            </Trans>
          </div>
          <div className='options-section'>
            <div className='option option-1' data-aos='fade-up'>
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
            <div className='option option-2' data-aos='fade-up'>
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
            <div className='option option-3' data-aos='fade-up'>
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
        <div className='section-container'>
          <div className='worknow-benefits'>
            <div className='title' data-aos='fade-up'>
              {t('why_should_be_worknow')}
            </div>
            <div className='worknow-benefits-container'>
              <div className='row-1'>
                <div className='image' data-aos='fade-up'>
                  <img src={WorkNowBenefit1} alt='worknow-benefit' />
                </div>
                <div className='content' data-aos='fade-up'>
                  <div className='title'>{t('pros_1')}</div>
                  <div className='description'>{t('pros_1_description')}</div>
                  <hr />
                  <div className='list'>
                    <div className='list-item'>
                      <div className='icon-badge'>
                        <HeartIcon className='icon' />
                      </div>
                      <div className='text'>{t('optimize_experience')}</div>
                    </div>
                    <div className='list-item'>
                      <div className='icon-badge'>
                        <PartyIcon className='icon' />
                      </div>
                      <div className='text'>{t('accompanying_utilities')}</div>
                    </div>
                    <div className='list-item'>
                      <div className='icon-badge'>
                        <LocationIcon className='icon' />
                      </div>
                      <div className='text'>{t('comfortable_workplace')}</div>
                    </div>
                    <div className='list-item'>
                      <div className='icon-badge'>
                        <NetworkIcon className='icon' />
                      </div>
                      <div className='text'>{t('expand_network')}</div>
                    </div>
                    <div className='list-item'>
                      <div className='icon-badge'>
                        <PrivacyIcon className='icon' />
                      </div>
                      <div className='text'>{t('privacy_and_quietness')}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='row-2'>
                <div className='content' data-aos='fade-up'>
                  <div className='title'>{t('pros_2')}</div>
                  <div className='description'>{t('pros_2_description')}</div>
                  <hr />
                  <div className='statistics-section'>
                    <div className='item'>
                      <div className='value'>500+</div>
                      <div className='label'>{t('position_at_hcm_city')}</div>
                    </div>
                    <div className='item'>
                      <div className='value'>1000+</div>
                      <div className='label'>{t('available_types')}</div>
                    </div>
                  </div>
                  <div className='list'>
                    <div className='list-item'>
                      <div className='icon-badge'>
                        <TickIcon className='icon' />
                      </div>
                      <div className='text'>{t('districts_at_hcm_city')}</div>
                    </div>
                    <div className='list-item'>
                      <div className='icon-badge'>
                        <TickIcon className='icon' />
                      </div>
                      <div className='text'>{t('verified_by_worknow')}</div>
                    </div>
                    <div className='list-item'>
                      <div className='icon-badge'>
                        <TickIcon className='icon' />
                      </div>
                      <div className='text'>{t('diverse_types')}</div>
                    </div>
                    <div className='list-item'>
                      <div className='icon-badge'>
                        <TickIcon className='icon' />
                      </div>
                      <div className='text'>{t('all_districts')}</div>
                    </div>
                    <div className='list-item'>
                      <div className='icon-badge'>
                        <TickIcon className='icon' />
                      </div>
                      <div className='text'>{t('search_by_demand')}</div>
                    </div>
                    <div className='list-item'>
                      <div className='icon-badge'>
                        <TickIcon className='icon' />
                      </div>
                      <div className='text'>{t('flexible_time')}</div>
                    </div>
                    <div className='list-item'>
                      <div className='icon-badge'>
                        <TickIcon className='icon' />
                      </div>
                      <div className='text'>
                        {t('affordable_diverse_costs')}
                      </div>
                    </div>
                  </div>
                </div>
                <div className='image' data-aos='fade-up'>
                  <div className='image'>
                    <img src={WorkNowBenefit2} alt='worknow-benefit' />
                  </div>
                </div>
              </div>
              <div className='row-3'>
                <div className='image' data-aos='fade-up'>
                  <img src={WorkNowBenefit3} alt='worknow-benefit' />
                </div>
                <div className='content' data-aos='fade-up'>
                  <div className='title'>{t('pros_3')}</div>
                  <div className='description'>{t('pros_3_description')}</div>
                  <hr />
                  <div className='list'>
                    <div className='list-item'>
                      <div className='icon-badge'>
                        <UserSettingIcon className='icon' />
                      </div>
                      <div className='text'>
                        {t('employee_management_system')}
                      </div>
                    </div>
                    <div className='list-item'>
                      <div className='icon-badge'>
                        <BarGraphIcon className='icon' />
                      </div>
                      <div className='text'>{t('detailed_statistics')}</div>
                    </div>
                    <div className='list-item'>
                      <div className='icon-badge'>
                        <WalletIcon className='icon' />
                      </div>
                      <div className='text'>
                        {t('convenient_payment_function')}
                      </div>
                    </div>
                    <div className='list-item'>
                      <div className='icon-badge'>
                        <CallingIcon className='icon' />
                      </div>
                      <div className='text'>{t('fast_support')}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='worknow-outstanding-wspace'>
            <div className='title' data-aos='fade-up'>
              {t('outstanding_type')}
            </div>
            <div
              className='worknow-outstanding-wspace-container'
              data-aos='fade-up'
            >
              <div className='working-space-type-card'>
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
              <div className='working-space-type-card'>
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
