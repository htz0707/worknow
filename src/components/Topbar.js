import React from 'react';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { NavLink, Link, useLocation } from 'react-router-dom';
import '../assets/styles/Topbar.scss';
import { useTranslation } from 'react-i18next';
import i18n from '../translation/i18n';
import Logo from '../assets/images/logo.svg';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as UserIcon } from '../assets/icons/User.svg';
import LetteredAvatar from 'react-lettered-avatar';
import { Button, Dropdown, Menu } from 'antd';
export default function Topbar() {
  const user = JSON.parse(localStorage.getItem('user'));
  const path = useLocation();
  const { t } = useTranslation();
  function changeLanguage(value) {
    i18n.changeLanguage(value);
  }
  let navigate = useNavigate();
  const handleClick = () => {
    localStorage.setItem(
      'preUrl',
      JSON.stringify({
        pathname: path.pathname,
        state: path.state,
      })
    );
    navigate(`/sign-in`);
  };
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };
  const handleViewUserInfo = () => {
    navigate('/user')
  }
  const menu = (
    <Menu>
      <Menu.Item style={{ width: '120px' }} onClick={handleViewUserInfo}>
        Profile
      </Menu.Item>
      <Menu.Item style={{ width: '120px' }} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );
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
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Brand>
          <Link to='/'>
            <img src={Logo} width={45} />
          </Link>
        </Navbar.Brand>
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
        </Navbar.Collapse>
        <div className='login-section'>
          {user ? (
            <>
              <div className='isLoginWeb'>
                <div className='text'>
                  <div>Hi, {user?.fullname}</div>
                  <div onClick={handleLogout}>Logout</div>
                </div>
                <div onClick={handleViewUserInfo}>
                  <LetteredAvatar
                    name={user?.fullname}
                    backgroundColor='#ffb31f80'
                    color='#282723'
                  />
                </div>
              </div>
              <div className='isLoginMobile'>
                <Dropdown overlay={menu} placement='bottomRight' forceRender>
                  <Button className='btn-avatar'>
                    <LetteredAvatar
                      name={user?.fullname}
                      backgroundColor='#ffb31f80'
                      color='#282723'
                    />
                  </Button>
                </Dropdown>
              </div>
            </>
          ) : (
            <div className='isNotLogin' onClick={handleClick}>
              <span className='text'>Đăng nhập</span>
              <UserIcon />
            </div>
          )}
        </div>
      </Container>
    </Navbar>
  );
}
