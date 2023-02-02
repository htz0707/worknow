import React from 'react';
import '../assets/styles/ResetPassword.scss';
import Logo from '../assets/images/logo_2.png';
import { Form, Input } from 'antd';
import { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { gql, useMutation } from '@apollo/client';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  handleError,
  handleMessage,
  redirectAfterLogin,
} from '../helpers/helpers';
import { useAuthContext } from '../context/auth';
import { useTranslation } from 'react-i18next';

export default function ResetPassword() {
  const { t } = useTranslation();
  const { login } = useAuthContext();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const email = searchParams.get('email');
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const SIGN_IN = gql`
    mutation SignIn($email: String!, $password: String!) {
      signIn(data: { email: $email, password: $password }) {
        avatar
        avatarId
        birthday
        token
        email
        fullname
        id
        status
        roles {
          id
          name
          permissions {
            description
            id
            permission
          }
          description
        }
        employeeId
        phoneCountryCode
        phoneNumber
      }
    }
  `;
  const [signIn] = useMutation(SIGN_IN, {
    update(_, { data: { signIn: userData } }) {
      console.log(userData);
      login(userData);
      redirectAfterLogin(navigate, '/');
      setLoading(false);
      // context.login(userData);
      // props.history.push('/');
    },
    onError(err) {
      handleMessage('error', t('sign_in_not_success'));
      setLoading(false);
      // console.log(err.graphQLErrors[0].extensions.exception.errors);
    },
  });
  const RESET_PASSWORD = gql`
    mutation ResetPassword($token: String!, $password: String!) {
      resetPassword(data: { token: $token, password: $password })
    }
  `;

  const [resetPassword] = useMutation(RESET_PASSWORD, {
    update(_, { data }) {
      signIn({
        variables: {
          email: email,
          password: password,
        },
      });
    },
    onError(err) {
      console.log(err);
      handleMessage(
        'error',
        handleError(err.graphQLErrors[0]?.message, t('reset_password_failed'))
      );
      setLoading(false);
    },
  });
  const handleSubmit = async () => {
    setLoading(true);
    resetPassword({
      variables: {
        token: token,
        password: password,
      },
    });
  };
  return (
    <div className='reset-password'>
      <div className='container-md'>
        <div className='row'>
          <div className='logo col-lg-5 d-flex justify-content-center align-items-center'>
            <img src={Logo} width={200} alt='logo' />
          </div>
          <div className='col-lg-7 d-flex justify-content-center align-items-center'>
            <div className='reset-password-form rounded px-3 py-4'>
              <h6 className='d-flex justify-content-center text-gray'>
                {t('reset_pasword')}
              </h6>
              <h3 className='d-flex justify-content-center fw-bold text-uppercase'>
                {t('reset')}
              </h3>
              <p className='d-flex justify-content-center'>
                {t('reset_password_description')}
              </p>
              <Form
                id='forgot_password_form'
                autoComplete='off'
                onFinish={handleSubmit}
                // initialValues={{ remember: true }}
                form={form}
              >
                <div className='input-section mb-0'>
                  <label className='label'>
                    {t('new_password')} <span>*</span>
                  </label>
                  <Form.Item
                    name='new_password'
                    rules={[
                      {
                        required: true,
                        message: t('required_field'),
                      },
                      {
                        min: 6,
                        message: t('password_require_minimum_6_character'),
                      },
                    ]}
                  >
                    <Input.Password
                      className='py-2'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Item>
                </div>
                <div className='input-section mb-0'>
                  <label className='label'>
                    {t('confirm_new_password')} <span>*</span>
                  </label>
                  <Form.Item
                    name='confirm_password'
                    rules={[
                      {
                        required: true,
                        message: t('required_field'),
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (
                            !value ||
                            getFieldValue('new_password') === value
                          ) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error(t('password_not_match'))
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password
                      className='py-2'
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </Form.Item>
                </div>
                <div className='row gx-3'>
                  <div className='col-6'>
                    <button
                      type='button'
                      className='btn w-100 btn-cancel'
                      onClick={() => navigate('/sign-in')}
                    >
                      {t('exit')}
                    </button>
                  </div>
                  <div className='col-6'>
                    <button
                      type='submit'
                      form='forgot_password_form'
                      className='btn w-100 btn-submit'
                      disabled={loading}
                    >
                      {loading ? (
                        <Spinner animation='border' size='sm' />
                      ) : (
                        t('sign_in')
                      )}
                    </button>
                  </div>
                </div>
              </Form>
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
