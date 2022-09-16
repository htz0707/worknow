import React, { useState } from 'react';
import { Form, Button, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import PasswordStrengthBar from 'react-password-strength-bar';

import '../assets/styles/VerifyAccount.scss';
import welcome from '../assets/images/welcome.jpg';

export default function VerifyAccount() {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [pass, setPass] = useState('')

  const handleChange = (step) => {
    if (step === 'back') {
      setStep(1);
    } else {
      setStep(2);
    }
  };
  return (
    <div className='verifyAccount'>
      <div className='row'>
        <div className='col-5'>
          <img src={welcome} alt='welcome' />
        </div>
        <div className='col-7'>
          <h1>{t('verify_account.title')} Customer</h1>
          {step === 1 ? (
            <>
              <p>{t('verify_account.step')}</p>
              <p>{t('verify_account.complete')}</p>
            </>
          ) : (
            <p>{t('verify_account.last')}</p>
          )}

          <Form
            name='verify_account'
            className='verify-form'
            initialValues={{ remember: true }}
          >
            {step === 1 ? (
              <>
                <Form.Item
                  name='company'
                  rules={[
                    {
                      required: true,
                      message: 'Please input your company name!',
                    },
                  ]}
                >
                  <label>
                    {t('verify_account.company')}
                    <span className='required'>*</span>
                  </label>
                  <Input />
                </Form.Item>
                <Form.Item
                  name='number'
                  rules={[
                    {
                      required: true,
                      message: 'Please input your company number!',
                    },
                  ]}
                >
                  <label>
                    {t('verify_account.number')}
                    <span className='required'>*</span>
                  </label>
                  <Input />
                </Form.Item>
                <Form.Item name='size'>
                  <label>{t('verify_account.size')}</label>
                  <Input />
                </Form.Item>
                <div className='btn-group'>
                  <Form.Item>
                    <Button
                      type='primary'
                      className='submit-btn'
                      onClick={() => handleChange('next')}
                    >
                      {t('verify_account.next')}
                    </Button>
                  </Form.Item>
                </div>
              </>
            ) : (
              <>
                <Form.Item
                  name='pass'
                  rules={[
                    {
                      required: true,
                      message: 'Please input your password!',
                    },
                  ]}
                >
                  <label>
                    {t('verify_account.pass')}
                    <span className='required'>*</span>
                  </label>
                  <Input.Password />
                  <PasswordStrengthBar password={pass} className='pass-strength'/>
                </Form.Item>
                <Form.Item
                  name='re-pass'
                  rules={[
                    {
                      required: true,
                      message: 'Please confirm your password!',
                    },
                  ]}
                >
                  <label>
                    {t('verify_account.re-pass')}
                    <span className='required'>*</span>
                  </label>
                  <Input.Password />
                </Form.Item>
                <div className='btn-group'>
                  <Form.Item>
                    <Button
                      type='primary'
                      className='submit-btn'
                      onClick={() => handleChange('back')}
                    >
                      {t('verify_account.back')}
                    </Button>
                  </Form.Item>
                  <Form.Item>
                    <Button type='primary' className='submit-btn'>
                      {t('verify_account.done')}
                    </Button>
                  </Form.Item>
                </div>
              </>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
}
