import React from 'react';
import { Container, Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import '../assets/styles/Topbar.scss';
import { useTranslation } from 'react-i18next';
import i18n from '../translation/i18n';
import Logo from '../assets/images/logo.svg';
import { useNavigate } from 'react-router-dom';
export default function Topbar() {
  const { t } = useTranslation();
  function changeLanguage(value) {
    i18n.changeLanguage(value);
  }
  let navigate = useNavigate();
  const handleClick = () => {
    navigate(`/sign-in`);
  };
  return (
    <Navbar
      variant='light'
      expand='lg'
      fixed='top'
      collapseOnSelect
      className='topbar'
    >
      <Container
        className='page-container'
        style={{ minHeight: '80px', maxWidth: '100%' }}
      >
        <Navbar.Brand>
          <Link to='/'>
            <img src={Logo} width={50} />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav>
            <Nav.Link eventKey='1'>
              <NavLink to='/' className='nav-item-link'>
                {t('navbar.home')}
              </NavLink>
            </Nav.Link>
            <Nav.Link eventKey='2'>
              <NavLink to='locations' className='nav-item-link'>
                {t('navbar.locations')}
              </NavLink>
            </Nav.Link>
            <Nav.Link eventKey='3'>
              <NavLink to='business' className='nav-item-link'>
                {t('navbar.for_business')}
              </NavLink>
            </Nav.Link>
            <Nav.Link eventKey='4'>
              <NavLink to='space-partner' className='nav-item-link'>
                {t('navbar.space_partner')}
              </NavLink>
            </Nav.Link>
            {/* <Nav.Link eventKey='5'>
              <NavLink to='newsroom' className='nav-item-link'>
                {t('navbar.newsroom')}
              </NavLink>
            </Nav.Link> */}
            {/* <Nav.Link className='nav-item-link'>
              <NavDropdown title={t('navbar.language')} id='basic-nav-dropdown'>
                <NavDropdown.Item onClick={() => changeLanguage('vi')}>
                  Vietnamese
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => changeLanguage('en')}>
                  English
                </NavDropdown.Item>
              </NavDropdown>
            </Nav.Link> */}
          </Nav>
          <button className='btn-login ms-auto' onClick={handleClick}>Đăng nhập</button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
