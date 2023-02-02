import React, { useState } from 'react';
import '../assets/styles/SignIn.scss';
import Logo from '../assets/images/logo_2.png';
import { ReactComponent as FacebookIcon } from '../assets/icons/facebook.svg';
import { ReactComponent as GoogleIcon } from '../assets/icons/google.svg';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import {
  handleError,
  handleMessage,
  redirectAfterLogin,
} from '../helpers/helpers';
import { Form, Input } from 'antd';
import { Spinner } from 'react-bootstrap';
import { useAuthContext } from '../context/auth';
import { useTranslation } from 'react-i18next';

export default function SignIn() {
  const { t } = useTranslation();
  const { login } = useAuthContext();
  const [form] = Form.useForm();
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });
  const handleChangeInfo = (field, value) => {
    setUserInfo({ ...userInfo, [field]: value });
  };
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
  const [signIn, { loading }] = useMutation(SIGN_IN, {
    update(_, { data: { signIn: userData } }) {
      console.log(userData);
      if (userData?.roles[0]?.name === 'Space provider') {
        handleMessage('error', t('account_provider_not_sign_in_this_page'));
        return;
      }
      if (userData?.roles[0]?.name === 'WorkNow admin') {
        login(userData);
        navigate('/admin/orders');
      }
      if (userData?.roles[0]?.name === 'Member') {
        login(userData);
        redirectAfterLogin(navigate, '/');
      }
    },
    onError(err) {
      console.log(err);
      handleMessage(
        'error',
        handleError(err.graphQLErrors[0]?.message, t('sign_in_not_success'))
      );
    },
  });
  const handleSubmit = async () => {
    signIn({
      variables: {
        email: userInfo.email,
        password: userInfo.password,
      },
    });
  };
  const navigate = useNavigate();
  const handleSignUp = () => {
    navigate('/sign-up');
  };
  const handleRedirectToHome = () => {
    navigate('/');
  };
  return (
    <div className='sign-in-page'>
      <div className='container-md'>
        <div className='row'>
          <div className='logo col-lg-5 d-flex justify-content-center align-items-center'>
            <img
              className='pointer'
              src={Logo}
              width={200}
              alt='logo'
              onClick={handleRedirectToHome}
            />
          </div>
          <div className='col-lg-7 d-flex justify-content-center align-items-center'>
            <div className='sign-in-form rounded px-3 py-4'>
              <h3 className='d-flex justify-content-center fw-bold text-uppercase'>
                {t('sign_in')}
              </h3>
              <p className='d-flex justify-content-center'>
                {t('sign_in_to_receive_more_promotions')}
              </p>
              <Form
                id='my_form'
                autoComplete='off'
                onFinish={handleSubmit}
                form={form}
              >
                <div className='mb-0'>
                  <label>
                    {t('email')}
                    <span>*</span>
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
                    <input
                      className='form-control custom-input'
                      value={userInfo.email}
                      onChange={(e) =>
                        handleChangeInfo('email', e.target.value)
                      }
                    />
                  </Form.Item>
                </div>
                <div className='mb-0'>
                  <label>
                    {t('password')} <span>*</span>
                  </label>
                  <Form.Item
                    name='password'
                    rules={[
                      {
                        required: true,
                        message: t('required_field'),
                      },
                    ]}
                  >
                    <Input.Password
                      value={userInfo.password}
                      onChange={(e) =>
                        handleChangeInfo('password', e.target.value)
                      }
                    />
                  </Form.Item>
                </div>
                <button
                  type='submit'
                  form='my_form'
                  className='btn w-100 rounded-pill'
                  disabled={loading}
                >
                  {loading ? (
                    <Spinner animation='border' size='sm' />
                  ) : (
                    t('sign_in')
                  )}
                </button>
              </Form>
              {/* <form autoComplete='off'>
                <input
                  type='email'
                  className='form-control single-line-input mb-4'
                  aria-describedby='emailHelp'
                  placeholder='Tài khoản'
                />
                <div className='password-field mb-4'>
                  <input
                    type={!passwordShown ? 'password' : 'text'}
                    className='form-control single-line-input'
                    placeholder='Mật Khẩu'
                  />
                  {!passwordShown ? (
                    <BsEye className='eye-icon' onClick={togglePassword} />
                  ) : (
                    <BsEyeSlash className='eye-icon' onClick={togglePassword} />
                  )}
                </div>
                <button
                  type='submit'
                  onClick={handleLogIn}
                  className='btn w-100 rounded-pill'
                >
                  Đăng Nhập
                </button>
              </form> */}
              <div className='row mt-2'>
                <div className='col'>
                  {t('dont_have_an_account')}{' '}
                  <span onClick={handleSignUp} className='link'>
                    {t('sign_up')}
                  </span>
                </div>
                <div className='col-auto text-end'>
                  <span
                    className='link'
                    onClick={() => navigate('/forget-password')}
                  >
                    {t('forgot_password')}?
                  </span>
                </div>
              </div>
              {/* <div className='d-flex justify-content-center my-2 text-gray'>
                - Hoặc -
              </div>
              <button className='btn btn-white w-100 border rounded mb-2'>
                <FacebookIcon className='icon me-3' /> Đăng nhập với Facebook
              </button>
              <button className='btn btn-white w-100 border rounded'>
                <GoogleIcon className='icon me-3' /> Đăng nhập với Google
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
