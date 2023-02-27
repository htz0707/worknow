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
import hl1 from '../assets/images/highlight1.svg';
import hl2 from '../assets/images/highlight2.svg';
import hl3 from '../assets/images/highlight3.svg';
import hl4 from '../assets/images/highlight4.svg';
import { useTranslation } from 'react-i18next';

export default function NewBusiness() {
  const { t } = useTranslation();
  let navigate = useNavigate();
  const handleClick = () => {
    navigate(`/locations`);
  };
  return (
    <div className='home'>
      <div className='section-1'>
        <div className='container-fluid page-container'>
          <div className='row'>
            <div className='col-lg-5 d-flex justify-content-center align-items-center mb-4'>
              <div>
                <h2 className='fw-bold'>{t('home_title')}</h2>
                <p>{t('home_description')}</p>
                {/* <button
                  onClick={handleClick}
                  className='btn btn-warning fw-bold rounded-pill d-flex justify-content-center'
                >
                  TÌM HIỂU VỀ WORKNOW{' '}
                  <BsPlayCircle className='ms-3 icon' fill='dark' size={25} />
                </button> */}
              </div>
            </div>
            <div className='col-lg-7'>
              <img src={TwoPeople} className='w-100' alt='image' />
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
          <div className='row mb-3'>
            <h3 className='my-5 fw-bold'> {t('outstanding_type')}</h3>
            <div className='col-lg-6'>
              <div className='working-space-type-card mb-3'>
                <img src={hl4} alt='hl-4' className='image' />
                <div className='footer-section'>
                  <div className='content'>
                    <div className='title'> {t('private_booth')}</div>
                    <p className='description'>
                      {t('private_booth_description')}
                    </p>
                  </div>
                  <button className='btn-discover' onClick={handleClick}>
                    {t('discover')} <BiPaperPlane className='ms-2' />
                  </button>
                </div>
              </div>
              <div className='working-space-type-card'>
                <img src={hl1} alt='hl-4' className='image' />
                <div className='footer-section'>
                  <div className='content'>
                    <div className='title'>{t('flexible_seat')}</div>
                    <p className='description'>
                      {t('flexible_seat_description')}
                    </p>
                  </div>
                  <button className='btn-discover' onClick={handleClick}>
                    {t('discover')} <BiPaperPlane className='ms-2' />
                  </button>
                </div>
              </div>
            </div>
            <div className='col-lg-6 col-right'>
              <div className='working-space-type-card mb-3'>
                <img src={hl2} alt='hl-4' className='image' />
                <div className='footer-section'>
                  <div className='content'>
                    <div className='title'>{t('meeting_room')}</div>
                    <p className='description'>
                      {t('meeting_room_description')}
                    </p>
                  </div>
                  <button className='btn-discover' onClick={handleClick}>
                    {t('discover')} <BiPaperPlane className='ms-2' />
                  </button>
                </div>
              </div>
              <div className='working-space-type-card mb-3'>
                <img src={hl3} alt='hl-4' className='image' />
                <div className='footer-section'>
                  <div className='content'>
                    <div className='title'>{t('event_hall')}</div>
                    <p className='description'>{t('event_hall_description')}</p>
                  </div>
                  <button className='btn-discover' onClick={handleClick}>
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
