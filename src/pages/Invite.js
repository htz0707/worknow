import React,  { useState }  from 'react';
import UserLayout from '../layouts/UserLayout';
import '../assets/styles/Invite.scss';
import { Input } from 'antd';
import { ReactComponent as Copy } from '../assets/icons/copy.svg';
import 'react-phone-input-2/lib/style.css';
import { useTranslation } from 'react-i18next';

export default function UserProfile() {
  const { t } = useTranslation();
  const [link, setLink] = useState('http//:linkgioithieu.com');
  const [subs, setSubs] = useState(2);
  const [vouchers, setVouchers] = useState(1);
  return (
    <UserLayout currentTab='invite'>
      <div className='invite p-4'>
        <h4 className='fw-bold text-uppercase'>{t('invite_friend')}</h4>
        <div>
          <label className='invite-label fw-bold'>{t('invite_link')}</label>
          <Input
            className='input-field py-2'
            value={link}
            suffix={
              <Copy
                className='pointer'
                onClick={() => navigator.clipboard.writeText(link)}
              />
            }
          />
        </div>
        <p className='mt-3 invite-to-earn'>
          {t('invite_to_earn_1')}
          <span>{' '}{t('invite_to_earn_2')}</span>
        </p>
        <hr />
        <label className='data'>{t('data')}</label>

        <div className='row'>
          <div className='col-6'>
            <div>
              <label className='invite-label fw-bold'>{t('subs')}</label>
              <Input
                className='input-field fw-bold subs py-4'
                value={subs}
              />
            </div>
          </div>
          <div className='col-6'>
            <div>
              <label className='invite-label fw-bold'>{t('vouchers_recieved')}</label>
              <Input
                className='input-field fw-bold vouchers py-4'
                value={vouchers}
              />
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}
