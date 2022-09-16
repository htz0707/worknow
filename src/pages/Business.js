import React from 'react';
import '../assets/styles/Business.scss';
import { useTranslation } from 'react-i18next';
import { Tabs } from 'antd';

import SignUpForm from '../components/SignUpForm';

import introImg from '../assets/images/business.svg';
import feature1 from '../assets/images/feature-1.svg';
import feature2 from '../assets/images/feature-2.svg';
import feature3 from '../assets/images/feature-3.svg';
import realtime from '../assets/images/realtime-img.png';

export default function Business() {
  const { t } = useTranslation();

  return (
    <div className='business'>
      <div className='section-intro'>
        <div className='container'>
          <div className='content'>
            <div className='title'>{t('business.section_intro.title')}</div>
            <div className='description'>
              {t('business.section_intro.description')}
            </div>
            <div className='promo-code'>
              {t('business.section_intro.promo-code')}
            </div>
            <div className='term'>
              {t('business.section_intro.limited-time')} <br />
              {t('business.section_intro.term-condition')}
            </div>
            <div className='started btn btn-primary text-white fw-bold'>
              {t('business.section_intro.get-started')}
            </div>
          </div>
          <div className='intro-img'>
            <img src={introImg} alt='intro-img' />
          </div>
        </div>
      </div>
      <div className='section-features'>
        <div className='container'>
          <div className='row'>
            <div className='feature-item col-12 col-md-4'>
              <div className='img-wrap'>
                <img src={feature1} alt='feature-1' />
              </div>
              <div className='content'>
                <div className='title'>
                  {t('business.section_features.mobile')}
                </div>
                <div className='text-sub'>
                  {t('business.section_features.mobile-desc')}
                </div>
              </div>
            </div>
            <div className='feature-item col-12 col-md-4'>
              <div className='img-wrap'>
                <img src={feature2} alt='feature-2' />
              </div>
              <div className='content'>
                <div className='title'>
                  {t('business.section_features.automatic')}
                </div>
                <div className='text-sub'>
                  {t('business.section_features.automatic-desc')}
                </div>
              </div>
            </div>
            <div className='feature-item col-12 col-md-4'>
              <div className='img-wrap'>
                <img src={feature3} alt='feature-3' />
              </div>
              <div className='content'>
                <div className='title'>
                  {t('business.section_features.flexible')}
                </div>
                <div className='text-sub'>
                  {t('business.section_features.flexible-desc')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='section-realtime'>
        <div className='container'>
          <div className='content'>
            <h2>{t('business.section_realtime.title')}</h2>
            <p>{t('business.section_realtime.description')}</p>
          </div>
          <div className='realtime-img'>
            <img src={realtime} alt='realtime-img' />
          </div>
        </div>
      </div>
      <div className='section-signup'>
        <div className='sign-up-bg'></div>
        <div className='sign-up-block'>
          <h2>{t('business.section_signup.title')}</h2>
          <div className='sign-up-form'>
            <Tabs
              defaultActiveKey='1'
              // onChange={onChange}
              className='sign-up-tabs'
              type='card'
              items={[
                {
                  label: t('business.section_signup.free'),
                  key: '1',
                  children: <SignUpForm free={true}/>,
                },
                {
                  label: t('business.section_signup.pay'),
                  key: '2',
                  children: <SignUpForm free={false}/>,
                }               
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
