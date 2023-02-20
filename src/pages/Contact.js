import React from 'react';
import '../assets/styles/Contact.scss';
import { ReactComponent as MailIcon } from '../assets/icons/mail.svg';
import { useTranslation } from 'react-i18next';

export default function Contact() {
  const { t } = useTranslation();
  return (
    <div className='contact page-container'>
      <h3 className='title'>{t('support_center')}</h3>
      <div className='contact-block'>
        <h5 className='name'>{t('vietnam')}</h5>
        <div className='content'>
          <MailIcon className='icon' />
          <div className='email-info'>
            <a href='mailto:worknowcenter@gmail.com'>worknowcenter@gmail.com</a>
            <small>{t('response_mail_description')}</small>
          </div>
        </div>
      </div>
    </div>
  );
}
