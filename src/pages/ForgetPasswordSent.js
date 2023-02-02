import React from 'react';
import '../assets/styles/ForgetPasswordSent.scss';
import Logo from '../assets/images/logo_2.png';
import { ReactComponent as MailSentIcon } from '../assets/icons/mailSent.svg';
import { useTranslation } from 'react-i18next';

export default function ForgetPasswordSent() {
  const { t } = useTranslation();
  return (
    <div className='forget-password-sent'>
      <div className='container-md'>
        <div className='row'>
          <div className='logo col-lg-5 d-flex justify-content-center align-items-center'>
            <img src={Logo} width={200} alt='logo' />
          </div>
          <div className='col-lg-7 d-flex justify-content-center align-items-center'>
            <div className='forget-password-sent-form rounded px-3 py-4'>
              <div className='d-flex justify-content-center mb-3'>
                <MailSentIcon />
              </div>
              <h4 className='text-center fw-bold text-uppercase'>
                {t('verified_email_sent')}
              </h4>
              <p className='text-center'>
                {t('verified_email_sent_description')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
