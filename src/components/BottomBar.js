import React from 'react';
import { Container, Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import { ReactComponent as FacebookIcon } from '../assets/icons/facebook_2.svg';
import { ReactComponent as TwitterIcon } from '../assets/icons/twitter.svg';
import { ReactComponent as YoutubeIcon } from '../assets/icons/youtube.svg';
import { ReactComponent as InstagramIcon } from '../assets/icons/instagram.svg';
import '../assets/styles/BottomBar.scss';

export default function BottomBar() {
  return (
    <Navbar
      bg='dark'
      className='bottom-bar'
    >
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
            <div className='link-text'>Điều khoản và Điều kiện</div>
            <div className='link-text'>Chính sách Bảo mật </div>
          </div>
          <div className='d-flex justify-content-center my-3'>
            <FacebookIcon className='icon me-4' />
            <TwitterIcon className='icon me-4 pt-2' />
            <YoutubeIcon className='icon me-4' />
            <InstagramIcon className='icon me-4' />
          </div>
        </div>
      </Container>
    </Navbar>
  );
}
