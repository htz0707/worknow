import React from 'react';
import '../assets/styles/UserLayout.scss';
import Bcrumb from '../components/Bcrumb';
import { useAuthContext } from '../context/auth';
import { ReactComponent as Info } from '../assets/icons/thongtin.svg';
import { ReactComponent as Voucher } from '../assets/icons/voucher.svg';
import { ReactComponent as Giaodich } from '../assets/icons/giaodich.svg';
import { ReactComponent as Lockout } from '../assets/icons/lockout.svg';
import { ReactComponent as Secure } from '../assets/icons/secure.svg';
import { ReactComponent as Camera } from '../assets/icons/camera.svg';
import Avatar from '../assets/images/default_avatar.png';
import cx from 'classnames';
import { useNavigate } from 'react-router-dom';

export default function UserLayout(props) {
  const { currentTab, children } = props;
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/locations');
  };
  const handleNavigate = (url) => {
    navigate(url);
  };
  return (
    <div className='user-layout page-container'>
      <div className='user-layout_header'>
        <Bcrumb
          data={[
            {
              label: 'Thông tin tài khoản',
              path: true,
            },
          ]}
        />
      </div>
      <div className='user-layout_body container-fluid'>
        <div className='control-pannel py-2 px-4'>
          <div className='info-section'>
            <div className='avatar-block'>
              <Camera className='position-absolute camera' />
              <img
                className='avatar-image'
                src={user.avatar || Avatar}
                alt='avatar'
              />
            </div>
            <div className='info-block'>
              <div className='fullname'>{user.fullname}</div>
              <div className='email'>{user.email}</div>
            </div>
          </div>
          <div className='control-section'>
            <div
              className={cx('tab rounded-pill', {
                active: currentTab === 'profile',
              })}
              onClick={() => handleNavigate('/user/profile')}
            >
              <Info className='tab-icon-1' />
              <div className='text'>Thông Tin Cá Nhân</div>
            </div>
            <div
              className={cx('tab rounded-pill', {
                active: currentTab === 'voucher',
              })}
              onClick={() => handleNavigate('/user/voucher')}
            >
              <Voucher className='tab-icon-2' />
              <div className='text'>Voucher Của Tôi</div>
            </div>
            <div
              className={cx('tab rounded-pill', {
                active: currentTab === 'history',
              })}
              onClick={() => handleNavigate('/user/history')}
            >
              <Giaodich className='tab-icon-2' />
              <div className='text'>Giao Dịch Của Tôi</div>
            </div>
          </div>
          <div className='footer-section'>
            <div
              className='item'
              onClick={() => handleNavigate('/user/security')}
            >
              <Secure className='icon' />
              <div>Bảo mật</div>
            </div>
            <div className='item logout' onClick={handleLogout}>
              <Lockout className='icon' />
              <div>Đăng xuẩt</div>
            </div>
          </div>
        </div>
        <div className='children'>{children}</div>
      </div>
    </div>
  );
}
