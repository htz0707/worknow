import React, { useState } from 'react';
import '../assets/styles/UserLayout.scss';
import Bcrumb from '../components/Bcrumb';
import { useAuthContext } from '../context/auth';
import { ReactComponent as Info } from '../assets/icons/thongtin.svg';
import { ReactComponent as Voucher } from '../assets/icons/voucher.svg';
import { ReactComponent as Giaodich } from '../assets/icons/giaodich.svg';
import { ReactComponent as Invite } from '../assets/icons/invite.svg';
import { ReactComponent as Lockout } from '../assets/icons/lockout.svg';
import { ReactComponent as Secure } from '../assets/icons/secure.svg';
import { ReactComponent as Camera } from '../assets/icons/camera.svg';
import Avatar from '../assets/images/default_avatar.png';
import cx from 'classnames';
import { useNavigate } from 'react-router-dom';
import { handleMessage } from '../helpers/helpers';
import UploadAvatarModal from '../components/UploadAvatarModal';
import { useTranslation } from 'react-i18next';

export default function UserLayout(props) {
  const { t } = useTranslation();
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
  const [showUpload, setShowUpload] = useState(false);
  const inputRef = React.useRef();
  const triggerFileSelectPopup = () => {
    inputRef.current.click();
  };
  const [file, setFile] = useState();
  const onSelectFile = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      if (file.size < 5242880) {
        setFile(file);
        setShowUpload(true);
      } else {
        handleMessage('error', t('size_image_too_large'));
      }
    }
  };
  return (
    <div className='user-layout page-container'>
      <div className='user-layout_header'>
        <Bcrumb
          data={[
            {
              label: t('account_info'),
              path: true,
            },
          ]}
        />
      </div>
      <div className='user-layout_body container-fluid'>
        <div className='control-pannel py-2 px-4'>
          <div className='info-section'>
            <div className='avatar-block' onClick={triggerFileSelectPopup}>
              <Camera className='position-absolute camera' />
              <img
                className='avatar-image'
                src={user.avatar || Avatar}
                alt='avatar'
              />
              <input
                type='file'
                accept='image/*'
                ref={inputRef}
                onChange={onSelectFile}
                style={{ display: 'none' }}
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
              <div className='text'>{t('personal_info')}</div>
            </div>
            <div
              className={cx('tab rounded-pill', {
                active: currentTab === 'voucher',
              })}
              onClick={() => handleNavigate('/user/voucher')}
            >
              <Voucher className='tab-icon-2' />
              <div className='text'>{t('my_voucher')}</div>
            </div>
            <div
              className={cx('tab rounded-pill', {
                active: currentTab === 'history',
              })}
              onClick={() => handleNavigate('/user/history')}
            >
              <Giaodich className='tab-icon-2' />
              <div className='text'> {t('order_history')}</div>
            </div>
            <div
              className={cx('tab rounded-pill', {
                active: currentTab === 'invite',
              })}
              onClick={() => handleNavigate('/user/invite')}
            >
              <Invite className='tab-icon-2' />
              <div className='text'> {t('invite')}</div>
            </div>
          </div>
          <div className='footer-section'>
            <div
              className='item'
              onClick={() => handleNavigate('/user/security')}
            >
              <Secure className='icon' />
              <div>{t('security')}</div>
            </div>
            <div className='item logout' onClick={handleLogout}>
              <Lockout className='icon' />
              <div>{t('logout')}</div>
            </div>
          </div>
        </div>
        <div className='children'>{children}</div>
      </div>
      <UploadAvatarModal
        show={showUpload}
        file={file}
        handleClose={() => setShowUpload(false)}
      />
    </div>
  );
}
