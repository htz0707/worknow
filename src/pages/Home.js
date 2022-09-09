import React from 'react';
import '../assets/styles/Home.scss';
import CircoImg1 from '../assets/images/home_section_about.jpg';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation();
  return (
    <div className='home'>
      <section className='section-about'>
        <div className='container-md'>
          <div className='row'>
            <div className='col-lg-5'>
              <div className='content'>
                <h2 className='title'>
                  {t('home.section_about.about')} <span>cirCo.</span>
                </h2>
                <p className='description'>
                  {t('home.section_about.description')}
                </p>
                <div className='statistics'>
                  <div className='item'>
                    <h2>
                      1200<span>+</span>
                    </h2>
                    <div>{t('home.section_about.team_members')}</div>
                  </div>
                  <div className='item'>
                    <h2>
                      30<span>+</span>
                    </h2>
                    <div>{t('home.section_about.partners')}</div>
                  </div>
                  <div className='item'>
                    <h2>
                      500<span>+</span>
                    </h2>
                    <div>{t('home.section_about.happy_customers')}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-lg-7'>
              <img src={CircoImg1} className='image' />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
