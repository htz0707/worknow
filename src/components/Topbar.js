import React, { useEffect, useState } from 'react';
import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
  Offcanvas,
} from 'react-bootstrap';
import {
  NavLink,
  Link,
  useLocation,
  createSearchParams,
} from 'react-router-dom';
import '../assets/styles/Topbar.scss';
import { useTranslation } from 'react-i18next';
import i18n from '../translation/i18n';
import Logo from '../assets/images/logo.svg';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as UserIcon } from '../assets/icons/User.svg';
import LetteredAvatar from 'react-lettered-avatar';
import { Button, Dropdown, Menu } from 'antd';
import { ReactComponent as Info } from '../assets/icons/user_2.svg';
import { ReactComponent as Voucher } from '../assets/icons/voucher_2.svg';
import { ReactComponent as Giaodich } from '../assets/icons/history.svg';
import { ReactComponent as Lockout } from '../assets/icons/lockout.svg';
import { ReactComponent as Secure } from '../assets/icons/secure.svg';
import { ReactComponent as Invite } from '../assets/icons/invite2.svg';
import { ReactComponent as AddUserIcon } from '../assets/icons/addUser.svg';
import Avatar from '../assets/images/default_avatar.png';
import { useAuthContext } from '../context/auth';
import cx from 'classnames';
import ChangeLanguageEngine from './ChangeLanguageEngine';

export default function Topbar(props) {
  const { user, logout } = useAuthContext();
  const path = useLocation();
  const { t } = useTranslation();
  const [languageOptions, setLanguageOptions] = useState([
    {
      label: 'Vietnamese',
      value: 'vi',
    },
    {
      label: 'English',
      value: 'en',
    },
  ]);

  const [selectedLanguage, setSelectedLanguage] = useState({
    label: 'Vietnamese',
    value: 'vi',
  });
  useEffect(() => {
    let init_lang = localStorage.getItem('language');
    if (init_lang === 'en') {
      setSelectedLanguage({
        label: 'English',
        value: 'en',
      });
    }
    if (init_lang === 'vi') {
      setSelectedLanguage({
        label: 'Vietnamese',
        value: 'vi',
      });
    }
  }, []);
  const handleChangeLanguage = (item) => {
    window.location.reload();
    setSelectedLanguage(item);
    i18n.changeLanguage(item.value);
    localStorage.setItem('language', item.value);
  };
  let navigate = useNavigate();
  const handleClickSignIn = () => {
    localStorage.setItem(
      'preUrl',
      JSON.stringify({
        pathname: path.pathname,
        state: path.state,
      })
    );
    navigate(`/sign-in`);
  };
  const handleClickSignUp = () => {
    navigate(`/sign-up`);
  };
  const handleLogout = () => {
    logout();
  };
  const handleViewUserInfo = () => {
    navigate('/user/profile');
  };
  const handleViewUserVoucher = () => {
    navigate('/user/voucher');
  };
  const handleViewUserHistory = () => {
    navigate('/user/history');
  };
  const handleViewUserSecurity = () => {
    navigate('/user/security');
  };
  const handleViewInvite = () => {
    navigate('user/invite');
  };
  const menu = (
    <Menu>
      <Menu.Item style={{ width: '150px' }} onClick={handleViewUserInfo}>
        {t('profile')}
      </Menu.Item>
      <Menu.Item style={{ width: '150px' }} onClick={handleLogout}>
        {t('logout')}
      </Menu.Item>
    </Menu>
  );
  const menuWeb = (
    <Menu style={{ borderRadius: '20px' }}>
      <div
        className='d-flex flex-column align-items-center'
        style={{ width: '300px' }}
      >
        <div className='py-2'>
          <img
            style={{ width: '50px', height: '50px', borderRadius: '50%' }}
            src={user?.avatar || Avatar}
            alt='avatar'
          />
        </div>
        <h5 className='fw-bold '>{user?.fullname}</h5>
        <div className='text-gray'>{user?.email}</div>
      </div>
      <hr className='mx-2' />
      <Menu.Item onClick={handleViewUserInfo} className='pt-2'>
        <Info height={20} className='me-2 mb-1' />
        <span> {t('personal_info')}</span>
      </Menu.Item>
      <Menu.Item onClick={handleViewUserVoucher} className='pt-2'>
        <Voucher height={20} className='me-2 mb-1' />
        <span> {t('my_voucher')}</span>
      </Menu.Item>
      <Menu.Item onClick={handleViewUserHistory} className='pt-2'>
        <Giaodich height={20} className='me-2 mb-1' />
        <span> {t('order_history')}</span>
      </Menu.Item>
      <Menu.Item onClick={handleViewUserSecurity} className='pt-2'>
        <Secure height={20} className='me-2 mb-1' />
        <span> {t('security')}</span>
      </Menu.Item>
      <Menu.Item onClick={handleViewInvite} className='pt-2'>
        <Invite height={20} className='me-2 mb-1' />
        <span> {t('invite')}</span>
      </Menu.Item>
      <hr className='mx-2 mb-2' />
      <Menu.Item onClick={handleLogout} className='mb-2 pt-2'>
        <Lockout height={20} className='me-2 mb-1' />
        <span> {t('logout')}</span>
      </Menu.Item>
    </Menu>
  );
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(true);
  };
  const handleHide = () => {
    setShow(false);
  };
  return (
    <Navbar
      variant='light'
      expand='xl'
      fixed='top'
      collapseOnSelect
      className='topbar'
    >
      <Container
        className='topbar-container'
        style={{ minHeight: '66px', maxWidth: '100%' }}
      >
        <Navbar.Toggle onClick={handleShow} />
        <Navbar.Brand>
          <Link to='/'>
            <img src={Logo} width={45} />
          </Link>
        </Navbar.Brand>
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav>
            {/* <Nav.Link eventKey='1'>
              <NavLink to='/' className='nav-item-link'>
                {t('home')}
              </NavLink>
            </Nav.Link> */}
            <Nav.Link eventKey='1'>
              <NavLink to='locations' className='nav-item-link'>
                {t('locations')}
              </NavLink>
            </Nav.Link>
            <Nav.Link eventKey='2'>
              <NavLink to='manage-hybrid-office' className='nav-item-link'>
                {t('manage_hybrid_office')}
              </NavLink>
            </Nav.Link>
            <Nav.Link eventKey='3'>
              <NavLink to='quote-flex-office' className='nav-item-link'>
                {t('quote_flex_office')}
              </NavLink>
            </Nav.Link>
            {/* <Nav.Link eventKey='3'>
              <NavLink to='business' className='nav-item-link'>
                {t('for_business')}
              </NavLink>
            </Nav.Link> */}
            <Nav.Link eventKey='4'>
              <NavLink to='space-partner' className='nav-item-link'>
                {t('space_partner')}
              </NavLink>
            </Nav.Link>
            <Nav.Link eventKey='5'>
              <NavLink to='lookup-order' className='nav-item-link'>
                {t('lookup_order')}
              </NavLink>
            </Nav.Link>
            {/* <Nav.Link eventKey='5'>
              <NavLink to='newsroom' className='nav-item-link'>
                {t('navbar.newsroom')}
              </NavLink>
            </Nav.Link> */}
            {/* <Nav.Link className='nav-item-link'>
              <NavDropdown title={t('language')} id='basic-nav-dropdown'>
                {languageOptions.map((item, index) => {
                  return (
                    <NavDropdown.Item
                      onClick={() => handleChangeLanguage(item)}
                      className={cx('dropdown-item', {
                        active: selectedLanguage.value === item.value,
                      })}
                    >
                      {item.label}
                    </NavDropdown.Item>
                  );
                })}
              </NavDropdown>
            </Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
        <div className='login-section'>
          <div className='change-language-section'>
            <ChangeLanguageEngine />
          </div>
          {user ? (
            <>
              <div className='isLoginWeb'>
                <div id='container-dropdown'>
                  <Dropdown
                    overlay={menuWeb}
                    placement='bottomRight'
                    forceRender
                    trigger={['click']}
                    getPopupContainer={() =>
                      document.getElementById('container-dropdown')
                    }
                  >
                    <Button className='btn-avatar'>
                      <img
                        className='avatar-image'
                        src={user?.avatar || Avatar}
                        alt='avatar'
                      />
                    </Button>
                  </Dropdown>
                </div>
              </div>
              <div className='isLoginMobile'>
                <div id='container-dropdown-moblie'>
                  <Dropdown
                    overlay={menu}
                    placement='bottomRight'
                    forceRender
                    trigger={['click']}
                  >
                    <Button className='btn-avatar'>
                      <img
                        className='avatar-image'
                        src={user?.avatar || Avatar}
                        alt='avatar'
                      />
                    </Button>
                  </Dropdown>
                </div>
              </div>
            </>
          ) : (
            <div className='isNotLogin'>
              <div className='btn-signin' onClick={handleClickSignIn}>
                <Lockout className='icon' /> {t('login')}
              </div>
              <div className='btn-signup' onClick={handleClickSignUp}>
                <AddUserIcon className='icon' /> {t('signup')}
              </div>
              <UserIcon
                className='btn-signin-mobile'
                onClick={handleClickSignIn}
              />
            </div>
          )}
        </div>
      </Container>
      <Offcanvas
        show={show}
        onHide={handleHide}
        placement='start'
        options={{
          backdrop: true,
        }}
        className='navbar-collapse-mobile'
      >
        <Offcanvas.Body className='navbar-collapse-mobile-body'>
          <Link to='locations' className='link-item' onClick={handleHide}>
            {t('locations')}
          </Link>
          <Link
            to='manage-hybrid-office'
            className='link-item'
            onClick={handleHide}
          >
            {t('manage_hybrid_office')}
          </Link>
          <Link
            to='quote-flex-office'
            className='link-item'
            onClick={handleHide}
          >
            {t('quote_flex_office')}
          </Link>
          <Link to='space-partner' className='link-item' onClick={handleHide}>
            {t('space_partner')}
          </Link>
          <Link to='lookup-order' className='link-item' onClick={handleHide}>
            {t('lookup_order')}
          </Link>
          <div className='change-language-section'>
            <ChangeLanguageEngine />
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </Navbar>
  );
}
