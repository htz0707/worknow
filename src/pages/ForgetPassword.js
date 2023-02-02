import React from 'react';
import '../assets/styles/ForgetPassword.scss';
import Logo from '../assets/images/logo_2.png';
import { Form, Input } from 'antd';
import { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { handleError, handleMessage } from '../helpers/helpers';
import { useTranslation } from 'react-i18next';

export default function ForgetPassword() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [email, setEmail] = useState('');
  const FORGOT_PASSWORD = gql`
    mutation ForgotPassword(
      $email: String!
      $redirectTo: ForgotPasswordRedirectTo!
    ) {
      forgotPassword(data: { email: $email, redirectTo: $redirectTo })
    }
  `;
  const [forgotPassword, { loading }] = useMutation(FORGOT_PASSWORD, {
    update(_, { data }) {
      navigate('/forget-password-sent');
    },
    onError(err) {
      console.log(err);
      handleMessage(
        'error',
        handleError(err.graphQLErrors[0]?.message, t('reset_password_failed'))
      );
    },
  });
  const handleSubmit = async () => {
    forgotPassword({
      variables: {
        email: email,
        redirectTo: 'landing_page',
      },
    });
  };
  return (
    <div className='forget-password'>
      <div className='container-md'>
        <div className='row'>
          <div className='logo col-lg-5 d-flex justify-content-center align-items-center'>
            <img src={Logo} width={200} alt='logo' />
          </div>
          <div className='col-lg-7 d-flex justify-content-center align-items-center'>
            <div className='forget-password-form rounded px-3 py-4'>
              <h6 className='d-flex justify-content-center text-gray'>
                {t('reset_pasword')}
              </h6>
              <h3 className='d-flex justify-content-center fw-bold text-uppercase'>
                {t('verify')}
              </h3>
              <p className='d-flex justify-content-center'>
                {t('reset_password_email_will_sent_to_you')}
              </p>
              <Form
                id='forgot_password_form'
                autoComplete='off'
                onFinish={handleSubmit}
                // initialValues={{ remember: true }}
                form={form}
              >
                <div className='mb-0'>
                  <label className='label'>
                    {t('email')} <span>*</span>
                  </label>
                  <Form.Item
                    name='email'
                    rules={[
                      {
                        type: 'email',
                        message: t('email_invalid'),
                      },
                      {
                        required: true,
                        message: t('required_field'),
                      },
                    ]}
                  >
                    <Input
                      className='form-control custom-input'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Item>
                </div>
                <button
                  type='submit'
                  form='forgot_password_form'
                  className='btn w-100 btn-submit'
                  disabled={loading}
                >
                  {loading ? (
                    <Spinner animation='border' size='sm' />
                  ) : (
                    t('continue')
                  )}
                </button>
              </Form>
              <div
                className='mt-2 link'
                onClick={() => navigate('/sign-in')}
                // onClick={handleForgetPassword}
              >
                {t('sign_in')}
              </div>
              {/* <form autoComplete='off'>
                <input
                  type='email'
                  className='form-control single-line-input mb-4'
                  aria-describedby='emailHelp'
                  placeholder='Email'
                />
                <button type='submit' className='btn w-100 rounded'>
                  Tiếp Theo
                </button>
              </form> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
