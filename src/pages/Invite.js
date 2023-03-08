import React, { useState, useEffect } from 'react';
import UserLayout from '../layouts/UserLayout';
import '../assets/styles/Invite.scss';
import { Input } from 'antd';
import { ReactComponent as Copy } from '../assets/icons/copy.svg';
import 'react-phone-input-2/lib/style.css';
import { useTranslation } from 'react-i18next';
import { handleMessage } from '../helpers/helpers';
import { useNavigate, useParams } from 'react-router-dom';
import { gql, useLazyQuery } from '@apollo/client';

export default function UserProfile() {
  const { t } = useTranslation();
  const GET_ME = gql`
    query GetMe {
      me {
        id
        usersReferee {
          id
        }
        vouchers {
          id
        }
      }
    }
  `;
  const [getMe] = useLazyQuery(GET_ME, {
    fetchPolicy: 'no-cache',
    onError(err) {
      console.log(err);
    },
  });
  const [user, setUser] = useState({});
  const [link, setLink] = useState('');
  const [subs, setSubs] = useState(0);
  const [vouchers, setVouchers] = useState(0);
  const handleGetMe = async () => {
    let res = await getMe();
    if (res.data) {
      setUser(res.data.me);
      setLink(`${window.location.host}/${res.data.me.id}`)
      setSubs(res.data.me.usersReferee.length);
      setVouchers(res.data.me.vouchers.length);
    }
  };
  useEffect(() => {
    handleGetMe();
  }, []);
  const copyToClipboard = (link) => {
    navigator.clipboard.writeText(link)
    handleMessage('success', 'Copied To Clipboard!');
  }
  const navigate = useNavigate();
  const id = useParams();

  return (
    <UserLayout currentTab='invite'>
      <div className='invite p-4'>
        <h4 className='fw-bold text-uppercase'>{t('invite_friend')}</h4>
        <div>
          <label className='invite-label fw-bold'>{t('invite_link')}</label>
          <Input
            className='input-field py-2'
            onClick={() => navigate(`/${user?.id}`)}
            value={link}
            suffix={
              <Copy
                className='pointer'
                onClick={() => copyToClipboard(link)}
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
