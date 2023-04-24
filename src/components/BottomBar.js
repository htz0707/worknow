import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import { ReactComponent as FacebookIcon } from '../assets/icons/facebook_2.svg';
import { ReactComponent as TwitterIcon } from '../assets/icons/twitter.svg';
import { ReactComponent as YoutubeIcon } from '../assets/icons/youtube.svg';
import { ReactComponent as InstagramIcon } from '../assets/icons/instagram.svg';
import '../assets/styles/BottomBar.scss';
import { useTranslation } from 'react-i18next';

export default function BottomBar() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <Navbar bg='dark' className='bottom-bar' id='bottom-bar'>
      <Container className='container-bottom-bar'>
        <div className='row w-100'>
          <div className='bar-item col-md-4 col-12'>
            <div className='title'>WorkNow</div>
            <Link className='link-text' to={'/about'}>
              {t('about_us')}
            </Link>
            <div className='link-text'>{t('media')}</div>
            <div className='link-text'>{t('recruitment')}</div>
          </div>
          <div className='bar-item col-md-4 col-12'>
            <div className='title'>{t('contact')}</div>
            <Link className='link-text' to={'/contact'}>
              {t('help_center')}
            </Link>
            <Link className='link-text' to={'/space-partner'}>
              {t('become_partner')}
            </Link>
          </div>
          <div className='bar-item col-md-4 col-12'>
            <div className='title'>{t('policy_and_terms')}</div>
            <Link className='link-text' to={'/rules'}>
              {t('term_and_condition')}
            </Link>
            <Link className='link-text' to={'/privacy'}>
              {t('privacy_policy')}
            </Link>
          </div>
          <div className='d-flex justify-content-center my-3'>
            <a href='https://www.facebook.com/worknow.center'>
              <FacebookIcon className='icon me-4' />
            </a>
            <a href='https://twitter.com/WorkNowCenter'>
              <TwitterIcon className='icon me-4 pt-2' />
            </a>
            {/* <YoutubeIcon className='icon me-4' /> */}
            <a href='https://www.instagram.com/worknow.center'>
              <InstagramIcon className='icon me-4' />
            </a>
          </div>
        </div>
      </Container>
    </Navbar>
  );
}
