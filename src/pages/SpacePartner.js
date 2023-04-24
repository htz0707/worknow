import React from 'react';
import '../assets/styles/SpacePartner.scss';
import { useEffect } from 'react';
import { Tabs } from 'antd';
import SignUpForm from '../components/SignUpFormForSpacePartner';
import layout1 from '../assets/images/space_partner_1.png';
import room1 from '../assets/images/room_1.svg';
import room2 from '../assets/images/room_2.svg';
import room3 from '../assets/images/room_3.svg';
import room4 from '../assets/images/room_4.svg';
import room5 from '../assets/images/room_5.svg';
import solution from '../assets/images/solution.svg';
import money from '../assets/icons/money.svg';
import clock from '../assets/icons/clock.svg';
import chart from '../assets/icons/chart.svg';
import data1 from '../assets/images/data1.png';
import data2 from '../assets/images/data2.svg';
import data3 from '../assets/images/data3.svg';
import data4 from '../assets/images/data4.svg';
import Analytic from '../assets/images/analytic.svg';

import { useNavigate } from 'react-router-dom';

import { BsPlayCircle } from 'react-icons/bs';
import { Trans, useTranslation, withTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

function SpacePartner() {
  const { t } = useTranslation();
  let navigate = useNavigate();
  const handleClick = () => {
    if (window.innerWidth < 768) {
      window.scrollTo(0, 4200);
    } else window.scrollTo(0, 3300);
  };
  return (
    <div className='space-partner'>
      <Helmet>
        <title>{t('space_partner')}</title>
        <meta name='description' content={t('space_provider_title')} />
        <link rel='canonical' href='https://worknow.center/space-partner' />
        <meta property='og:title' content={t('space_partner')} />
        <meta property='og:description' content={t('space_provider_title')} />
      </Helmet>
      <div className='section-1'>
        <div className='container-fluid page-container'>
          <div className='row gy-3'>
            <div className='col-xl-5 col-lg-6 d-flex align-items-center'>
              <div>
                <h2 className='fw-bold text-uppercase'>
                  {t('space_provider_title')}
                </h2>
                <p className='description'>{t('space_provider_description')}</p>
                <button
                  className='btn btn-warning fw-bold text-uppercase'
                  onClick={handleClick}
                >
                  {t('become_partner')}
                  <BsPlayCircle className='ms-3 icon' fill='dark' size={25} />
                </button>
              </div>
            </div>
            <div className='col-xl-7 col-lg-6 d-flex align-items-center'>
              <img src={layout1} className='w-100' alt='image' />
            </div>
          </div>
        </div>
      </div>
      <div className='section-2'>
        <div className='container-fluid page-container'>
          <div className='row'>
            <div className='col-xl-6 col-lg-8 mx-auto'>
              <h2 className='text-center text-uppercase'>
                {t('working_space_types')}
              </h2>
              <p className='text-center'>
                <Trans i18nKey='working_space_types_description'>
                  Tìm kiếm nguồn nhu cầu không giới hạn, lấp đầy các không gian
                  làm việc của bạn <br /> và cung cấp dịch vụ ở bất cứ đâu.
                </Trans>
              </p>
            </div>
          </div>
          <div className='row'>
            <div className='col-xl-3 col-lg-4 ms-auto'>
              <div className='type-card'>
                <img src={room2} className='w-100' />
                <h3 className='text-uppercase mt-2'>{t('meeting_room')}</h3>
                <p>{t('meeting_room_description_1')}</p>
              </div>
            </div>
            <div className='col-xl-3 col-lg-4 me-auto'>
              <div className='type-card'>
                <img src={room1} className='w-100' />
                <h3 className='text-uppercase mt-2'>{t('private_booth')}</h3>
                <p>{t('private_booth_description_1')}</p>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col-xl-3 col-lg-4 ms-auto'>
              <div className='type-card'>
                <img src={room3} className='w-100' />
                <h3 className='text-uppercase mt-2'>{t('private_desk')}</h3>
                <p>{t('private_desk_description')}</p>
              </div>
            </div>
            <div className='col-xl-3 col-lg-4'>
              <div className='type-card'>
                <img src={room4} className='w-100' />
                <h3 className='text-uppercase mt-2'>{t('event_room')}</h3>
                <p>{t('event_room_description')}</p>
              </div>
            </div>
            <div className='col-xl-3 col-lg-4 me-auto'>
              <div className='type-card'>
                <img src={room5} className='w-100' />
                <h3 className='text-uppercase mt-2'>{t('working_room')}</h3>
                <p>{t('working_room_description')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='section-3'>
        <div className='container-fluid page-container'>
          <div className='row'>
            <div className='col-12 mx-auto'>
              <h2 className='fw-bold text-center text-uppercase'>
                {t('space_provider_title_1')}
              </h2>
              <p className='text-center'>{t('space_provider_description_1')}</p>
              <img src={solution} className='w-100 my-3' />
            </div>
          </div>
        </div>
      </div>
      <div className='section-4'>
        <div className='container-fluid page-container'>
          <div className='row mb-2'>
            <div className='col-12 mx-auto'>
              <h2 className='fw-bold text-center text-uppercase'>
                {t('space_provider_title_2')}{' '}
              </h2>
            </div>
          </div>
          <div className='row gy-3'>
            <div className='col-xl-3 col-lg-4 ms-auto'>
              <div className='feature-card p-3'>
                <div className='mb-3 border rounded-circle relationship-icon'>
                  <img src={money} className='image-icon' />
                </div>
                <h4 className='text-uppercase'>{t('space_provider_pros_1')}</h4>
                <p className='text-solution'>
                  {t('space_provider_pros_1_description')}
                </p>
              </div>
            </div>
            <div className='col-xl-3 col-lg-4'>
              <div className='feature-card p-3'>
                <div className='mb-3 border rounded-circle relationship-icon'>
                  <img src={clock} className='image-icon' />
                </div>
                <h4 className='text-uppercase'>{t('space_provider_pros_2')}</h4>
                <p className='text-solution'>
                  {t('space_provider_pros_2_description')}
                </p>
              </div>
            </div>
            <div className='col-xl-3 col-lg-4 me-auto'>
              <div className='feature-card p-3'>
                <div className='mb-3 border rounded-circle relationship-icon'>
                  <img src={chart} className='image-icon' />
                </div>
                <h4 className='text-uppercase'>{t('space_provider_pros_3')}</h4>
                <p className='text-solution'>
                  {t('space_provider_pros_3_description')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='section-5'>
        <div className='container-fluid page-container'>
          <div className='row gy-3'>
            <div className='col-xl-5 col-lg-6 d-flex align-items-center'>
              <div>
                <h2 className='fw-bold text-uppercase'>
                  <Trans i18nKey='space_provider_title_3'>
                    BÁO CÁO DỮ LIỆU <br />
                    THEO THỜI GIAN THỰC
                  </Trans>
                </h2>
                <p className='description'>
                  {t('space_provider_description_3')}
                </p>
              </div>
            </div>
            <div className='col-xl-7 col-lg-6 d-flex align-items-center'>
              <img src={Analytic} className='w-100' alt='image' />
            </div>
          </div>
        </div>
      </div>
      <div className='section-6'>
        <div className='container-fluid page-container'>
          <div className='row'>
            <div className='col-xl-7 col-lg-8 mx-auto'>
              <div className='sign-up-block'>
                <h2 className='fw-bold text-uppercase'>
                  {t('contact_with_worknow')}
                </h2>
                <div className='sign-up-form'>
                  <Tabs
                    defaultActiveKey='1'
                    className='sign-up-tabs'
                    type='card'
                    items={[
                      {
                        label: t('become_partner_with_us'),
                        key: '1',
                        children: <SignUpForm free={true} />,
                      },
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default withTranslation()(SpacePartner);
