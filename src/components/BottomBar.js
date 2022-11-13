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
          <div className='bar-item col-lg-3 col-6'>
            <div className='my-4 fw-bold'>WORKNOW</div>
            <div className='link-text'>About us</div>
            <div className='link-text'>Media & Press</div>
            <div className='link-text'>Inspiration</div>
            <div className='link-text'>Career</div>
          </div>
          <div className='bar-item col-lg-3 col-6'>
            <div className='my-4 fw-bold'>CONTACT</div>
            <div className='link-text'>Help Center and Contact</div>
            <div className='link-text'>Become A Partner</div>
          </div>
          <div className='bar-item col-lg-3 col-6'>
            <div className='my-4 fw-bold'>PRIVACY & TERMS</div>
            <div className='link-text'>Terms of Service</div>
            <div className='link-text'>Privacy Policy</div>
            <div className='link-text'>Legal</div>
          </div>
          <div className='bar-item col-lg-3 col-6'>
            <div className='my-4 fw-bold'>SAVE OUR PLANNET</div>
            <div className='link-text'>Travel Guide</div>
            <div className='link-text'>Sustainable Travel</div>
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
