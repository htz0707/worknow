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

export default function SignIn() {
  const [form] = Form.useForm();
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });
  const handleChangeInfo = (field, value) => {
    setUserInfo({ ...userInfo, [field]: value });
  };
  const SIGN_IN_GUEST = gql`
    mutation SignInGuest($email: String!, $password: String!) {
      signInGuest(data: { email: $email, password: $password }) {
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
  const [signInGuest, { loading }] = useMutation(SIGN_IN_GUEST, {
    update(_, { data: { signInGuest: userData } }) {
      console.log(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      redirectAfterLogin(navigate, '/');
    },
    onError(err) {
      console.log(err);
      handleMessage(
        'error',
        handleError(
          err.graphQLErrors[0]?.message,
          'Đăng nhập không thành công.'
        )
      );
    },
  });
  const handleSubmit = async () => {
    signInGuest({
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
              src={Logo}
              width={200}
              alt='logo'
              onClick={handleRedirectToHome}
            />
          </div>
          <div className='col-lg-7 d-flex justify-content-center align-items-center'>
            <div className='sign-in-form rounded px-3 py-4'>
              <h3 className='d-flex justify-content-center fw-bold'>
                ĐĂNG NHẬP
              </h3>
              <p className='d-flex justify-content-center'>
                Đăng nhập để nhận được nhiều ưu đãi hơn!
              </p>
              <Form
                id='my_form'
                autoComplete='off'
                onFinish={handleSubmit}
                form={form}
              >
                <div className='mb-0'>
                  <label>
                    Email <span>*</span>
                  </label>
                  <Form.Item
                    name='email'
                    rules={[
                      {
                        type: 'email',
                        message: 'Email không hợp lệ.',
                      },
                      {
                        required: true,
                        message: 'Vui lòng điền vào trường này.',
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
                    Mật khẩu <span>*</span>
                  </label>
                  <Form.Item
                    name='password'
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng điền vào trường này.',
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
                    'Đăng nhập'
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
                <div className='col-lg-8'>
                  Bạn chưa có tài khoản?{' '}
                  <span onClick={handleSignUp} className='link'>
                    Đăng ký
                  </span>
                </div>
                <div className='col-lg-4 text-end'>
                  <span className='link'>Quên mật khẩu?</span>
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
