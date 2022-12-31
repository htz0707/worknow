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

import { useNavigate } from 'react-router-dom';

import { BsPlayCircle } from 'react-icons/bs';
import { Trans, useTranslation, withTranslation } from 'react-i18next';

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
      <div className='layout-1'>
        <div className='container-md'>
          <section>
            <div className='row'>
              <div className='col-lg-5 d-flex justify-content-center align-items-center mb-4'>
                <div>
                  <h2 className='fw-bold text-uppercase'>
                    {t('space_provider_title')}
                  </h2>
                  <p className='description'>
                    {t('space_provider_description')}
                  </p>
                  <button
                    className='btn btn-warning fw-bold text-uppercase'
                    onClick={handleClick}
                  >
                    {t('become_partner')}
                    <BsPlayCircle className='ms-3 icon' fill='dark' size={25} />
                  </button>
                </div>
              </div>
              <div className='col-lg-7 right-layout-1'>
                <img
                  src={layout1}
                  className='w-100 right-picture-1'
                  alt='image'
                />
              </div>
            </div>
          </section>
        </div>
      </div>
      <div className='container-md mt-5'>
        <div className=''>
          <h2 className='text-center text-uppercase'>
            {t('working_space_types')}
          </h2>
          <p className='text-center'>
            <Trans i18nKey='working_space_types_description'>
              Tìm kiếm nguồn nhu cầu không giới hạn, lấp đầy các không gian làm
              việc của bạn <br /> và cung cấp dịch vụ ở bất cứ đâu.
            </Trans>
          </p>
          <div className='image-card-group-1'>
            <div className='image-card'>
              <img src={room2} className='image-scale' />
              <h3 className='text-uppercase'>{t('meeting_room')}</h3>
              <p>{t('meeting_room_description_1')}</p>
            </div>
            <div className='image-card'>
              <img src={room1} className='image-scale' />
              <h3 className='text-uppercase'>{t('private_booth')}</h3>
              <p>{t('private_booth_description_1')}</p>
            </div>
          </div>
          <div className='image-card-group-2'>
            <div className='image-card'>
              <img src={room3} className='image-scale' />
              <h3 className='text-uppercase'>{t('private_desk')}</h3>
              <p>{t('private_desk_description')}</p>
            </div>
            <div className='image-card'>
              <img src={room4} className='image-scale' />
              <h3 className='text-uppercase'>{t('event_room')}</h3>
              <p>{t('event_room_description')}</p>
            </div>
            <div className='image-card'>
              <img src={room5} className='image-scale' />
              <h3 className='text-uppercase'>{t('working_room')}</h3>
              <p>{t('working_room_description')}</p>
            </div>
          </div>
        </div>
        <div className='mt-5'>
          <h2 className='fw-bold text-center text-uppercase'>
            {t('space_provider_title_1')}
          </h2>
          <p className='text-center'>{t('space_provider_description_1')}</p>
          <img src={solution} className='w-100 my-3' />
        </div>
        <div className='align-center'>
          <h2 className='fw-bold text-center text-uppercase'>
            {t('space_provider_title_2')}{' '}
          </h2>
          <div className='row solution-group'>
            <div className='col-lg-3 solution-card border rounded p-4'>
              <div className='mb-3 border rounded-circle relationship-icon'>
                <img src={money} className='image-icon' />
              </div>
              <h4 className='text-uppercase'>{t('space_provider_pros_1')}</h4>
              <p className='text-solution'>
                {t('space_provider_pros_1_description')}
              </p>
            </div>
            <div className='col-lg-3 solution-card border rounded p-4'>
              <div className='mb-3 border rounded-circle relationship-icon'>
                <img src={clock} className='image-icon' />
              </div>
              <h4 className='text-uppercase'>{t('space_provider_pros_2')}</h4>
              <p className='text-solution'>
                {t('space_provider_pros_2_description')}
              </p>
            </div>
            <div className='col-lg-3 solution-card border rounded p-4'>
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
      {/* <div className='data-layout'>
        <section className='section-about'>
          <div className='container-md'>
            <div className='row'>
              <div className='col-lg-5'>
                <div className='content'>
                  <h2>
                    BÁO CÁO DỮ LIỆU <br />
                    THEO THỜI GIAN THỰC
                  </h2>
                  <p className='description'>
                    Nhận thông tin chi tiết về đăng ký và thanh toán của từng đặt chỗ, quản lý doanh thu và xác định các báo cáo của riêng bạn về việc sử dụng, doanh thu, theo địa điểm, không gian làm việc, theo phạm thời gian.
                  </p>
                </div>
              </div>
              <div className='col-lg-7 right-picture-data'>
                <img src={data1} className='data-1' />
                <img src={data2} className='data-2' />
                <img src={data3} className='data-3' />
                <img src={data4} className='data-4' />
              </div>
            </div>
          </div>
        </section>
      </div> */}
      <div className='layout-1'>
        <div className='container-md'>
          <section>
            <div className='row'>
              <div className='col-lg-5 d-flex justify-content-center align-items-center mb-4'>
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
              <div className='col-lg-7 right-picture-data'>
                <img src={data1} className='data-1' />
                <img src={data2} className='data-2' />
                <img src={data3} className='data-3' />
                <img src={data4} className='data-4' />
              </div>
            </div>
          </section>
        </div>
      </div>
      <div className='sign-up-block'>
        <h2 className='fw-bold text-uppercase'>{t('contact_with_worknow')}</h2>
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
  );
}
export default withTranslation()(SpacePartner);
