import React from 'react';
import { Container, Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import '../assets/styles/Topbar.scss';
import { useTranslation } from 'react-i18next';
import i18n from '../translation/i18n';
import Logo from '../assets/images/logo.png';
export default function Topbar() {
  const { t } = useTranslation();
  function changeLanguage(value) {
    i18n.changeLanguage(value);
  }
  return (
    <Navbar
      bg='light'
      variant='light'
      expand='lg'
      fixed='top'
      className='topbar'
    >
      <Container fluid='md'>
        <Navbar.Brand>
          <Link to='/'>
            <img src={Logo} width={150} />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ms-auto'>
            <Nav.Link>
              <NavLink to='/' className='nav-link'>
                {t('navbar.home')}
              </NavLink>
            </Nav.Link>
            <Nav.Link>
              <NavLink to='locations' className='nav-link'>
                {t('navbar.locations')}
              </NavLink>
            </Nav.Link>
            <Nav.Link>
              <NavLink to='business' className='nav-link'>
                {t('navbar.for_business')}
              </NavLink>
            </Nav.Link>
            <Nav.Link>
              <NavLink to='space-partner' className='nav-link'>
                {t('navbar.space_partner')}
              </NavLink>
            </Nav.Link>
            <Nav.Link>
              <NavLink to='newsroom' className='nav-link'>
                {t('navbar.newsroom')}
              </NavLink>
            </Nav.Link>
            <Nav.Link>
              <NavDropdown title={t('navbar.language')} id='basic-nav-dropdown'>
                <NavDropdown.Item onClick={() => changeLanguage('vi')}>
                  Vietnamese
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => changeLanguage('en')}>
                  English
                </NavDropdown.Item>
              </NavDropdown>
            </Nav.Link>
            <Nav.Link>
              <Button
                variant='primary'
                className='text-white fw-bold rounded-pill px-5'
              >
                Login
              </Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
