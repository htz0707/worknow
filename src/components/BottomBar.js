import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import { ReactComponent as FacebookIcon } from '../assets/icons/facebook_2.svg';
import { ReactComponent as TwitterIcon } from '../assets/icons/twitter.svg';
import { ReactComponent as YoutubeIcon } from '../assets/icons/youtube.svg';
import { ReactComponent as InstagramIcon } from '../assets/icons/instagram.svg';
import '../assets/styles/BottomBar.scss';

export default function BottomBar() {
  const navigate = useNavigate();
  return (
    <Navbar bg='dark' className='bottom-bar'>
      <Container className='container-bottom-bar'>
        <div className='row w-100'>
          <div className='bar-item col-md-4 col-12'>
            <div className='my-4 fw-bold'>WorkNow</div>
            <div className='link-text'>Về chúng tôi</div>
            <div className='link-text'>Truyền thông</div>
            <div className='link-text'>Tuyển dụng</div>
          </div>
          <div className='bar-item col-md-4 col-12'>
            <div className='my-4 fw-bold'>Liên hệ</div>
            <div className='link-text'>Trung tâm trợ giúp</div>
            <div className='link-text'>Trở thành Đôi tác</div>
          </div>
          <div className='bar-item col-md-4 col-12'>
            <div className='my-4 fw-bold'>Chính sách và Điều khoản</div>
            <div className='link-text' onClick={() => navigate('/rules')}>
              Điều khoản và Điều kiện
            </div>
            <div className='link-text' onClick={() => navigate('/privacy')}>
              Chính sách Bảo mật{' '}
            </div>
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
