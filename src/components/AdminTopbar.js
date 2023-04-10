import React from 'react';
import '../assets/styles/AdminTopbar.scss';
import { useAuthContext } from '../context/auth';
import { Button, Dropdown, Menu } from 'antd';
import { ReactComponent as Info } from '../assets/icons/user_2.svg';
import { ReactComponent as Lockout } from '../assets/icons/lockout.svg';
import { ReactComponent as Secure } from '../assets/icons/secure.svg';
import { useNavigate } from 'react-router-dom';
import ChangeLanguageEngine from './ChangeLanguageEngine';
import { useTranslation } from 'react-i18next';

export default function Topbar(props) {
  const { t } = useTranslation();
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
  };
  const menuWeb = (
    <Menu style={{ borderRadius: '20px' }}>
      <div
        className='d-flex flex-column align-items-center'
        style={{ width: '300px' }}
      >
        <div className='py-2'>
          <img
            style={{ width: '50px', height: '50px', borderRadius: '50%' }}
            src={user?.avatar}
            alt='avatar'
          />
        </div>
        <h5 className='fw-bold '>{user?.fullname}</h5>
        <div className='text-gray'>{user?.email}</div>
      </div>
      <hr className='mx-2' />
      <Menu.Item className='pt-2' onClick={() => navigate('/user/profile')}>
        <Info height={20} className='me-2 mb-1' />
        <span>{t('personal_info')}</span>
      </Menu.Item>
      <Menu.Item className='pt-2' onClick={() => navigate('/user/security')}>
        <Secure height={20} className='me-2 mb-1' />
        <span>{t('security')}</span>
      </Menu.Item>
      <hr className='mx-2 mb-2' />
      <Menu.Item onClick={handleLogout} className='mb-2 pt-2'>
        <Lockout height={20} className='me-2 mb-1' />
        <span>{t('logout')}</span>
      </Menu.Item>
    </Menu>
  );
  return (
    <div className='admin-topbar'>
      <div className='title'>{props.title}</div>
      <div className='action'>
        <ChangeLanguageEngine />
        <Dropdown
          overlay={menuWeb}
          placement='bottomRight'
          forceRender
          trigger={['click']}
        >
          <Button className='btn-avatar'>
            <span className='user-name'>{user?.fullname}</span>
            <img
              className='avatar-image'
              src={user?.avatar}
              alt='avatar'
            />
          </Button>
        </Dropdown>
      </div>
    </div>
  );
}
