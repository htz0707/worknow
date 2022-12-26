import React, { useState } from 'react';
import '../assets/styles/SignUp.scss';
import Logo from '../assets/images/logo_2.png';
import { useNavigate } from 'react-router-dom';
import { Form, Input } from 'antd';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import parsePhoneNumber from 'libphonenumber-js';
import { gql, useMutation } from '@apollo/client';
import {
  handleError,
  handleMessage,
  redirectAfterLogin,
} from '../helpers/helpers';
import { Spinner } from 'react-bootstrap';
import { useAuthContext } from '../context/auth';

export default function SignUp() {
  const { login } = useAuthContext();
  const [form] = Form.useForm();
  const [userInfo, setUserInfo] = useState({
    full_name: '',
    email: '',
    phone_number: '',
    password: '',
    confirm_password: '',
  });
  const handleChangeInfo = (field, value) => {
    setUserInfo({ ...userInfo, [field]: value });
  };
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
      handleMessage('error', 'Đăng nhập không thành công');
      setLoading(false);
      // console.log(err.graphQLErrors[0].extensions.exception.errors);
    },
  });
  const SIGN_UP_MEMBER = gql`
    mutation SignUpMember(
      $fullname: String!
      $email: String!
      $phoneCountryCode: String
      $phoneNumber: String
      $password: String!
    ) {
      signUpMember(
        data: {
          fullname: $fullname
          email: $email
          phoneCountryCode: $phoneCountryCode
          phoneNumber: $phoneNumber
          password: $password
        }
      ) {
        id
      }
    }
  `;
  const [signUpMember] = useMutation(SIGN_UP_MEMBER, {
    update(_, { data: { signUp: userData } }) {
      signIn({
        variables: {
          email: userInfo.email,
          password: userInfo.password,
        },
      });
    },
    onError(err) {
      console.log(err);
      handleMessage(
        'error',
        handleError(err.graphQLErrors[0]?.message, 'Đăng kí không thành công.')
      );
      setLoading(false);
      // console.log(err.graphQLErrors[0].extensions.exception.errors);
    },
  });
  const handleSubmit = async () => {
    setLoading(true);
    let bodyData = {
      fullname: userInfo.full_name,
      email: userInfo.email,
      password: userInfo.password,
    };
    if (userInfo.phone_number) {
      let parse_phone = await parsePhoneNumber('+' + userInfo.phone_number);
      bodyData.phoneCountryCode = parse_phone.countryCallingCode;
      bodyData.phoneNumber = parse_phone.nationalNumber;
    }
    signUpMember({
      variables: bodyData,
    });
  };

  const navigate = useNavigate();
  const handleSignIn = () => {
    navigate('/sign-in');
  };

  const handleLogIn = () => {
    navigate('/');
  };

  return (
    <div className='sign-up-page'>
      <div className='container-md'>
        <div className='row'>
          <div className='logo col-lg-5 d-flex justify-content-center align-items-center'>
            <img src={Logo} width={200} onClick={handleLogIn} />
          </div>
          <div className='col-lg-7 d-flex justify-content-center align-items-center'>
            <div className='sign-up-form rounded px-3 py-4'>
              <h3 className='d-flex justify-content-center fw-bold'>ĐĂNG KÝ</h3>
              <p className='d-flex justify-content-center'>
                Trở thành thành viên của WorkNow!
              </p>
              <Form
                id='my_form'
                autoComplete='off'
                onFinish={handleSubmit}
                form={form}
              >
                <div className='mb-0'>
                  <label>
                    Họ và tên <span>*</span>
                  </label>
                  <Form.Item
                    name='full_name'
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng điền vào trường này.',
                      },
                    ]}
                  >
                    <input
                      className='form-control custom-input'
                      value={userInfo.full_name}
                      onChange={(e) =>
                        handleChangeInfo('full_name', e.target.value)
                      }
                    />
                  </Form.Item>
                </div>
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
                  <label>Di động</label>
                  <Form.Item
                    name='phone'
                    rules={[
                      {
                        async validator(_, value) {
                          if (userInfo.phone_number) {
                            let parse_phone = await parsePhoneNumber(
                              '+' + userInfo.phone_number
                            );
                            if (parse_phone?.isValid() !== true) {
                              return Promise.reject(
                                new Error('Số điện thoại không hợp lệ')
                              );
                            }
                            return Promise.resolve();
                          }
                          return Promise.resolve();
                        },
                      },
                    ]}
                  >
                    <div className='phone-input-engine'>
                      <PhoneInput
                        inputProps={{
                          id: 'phone_number',
                          name: 'phone',
                        }}
                        placeholder=''
                        country={'vn'}
                        enableSearch={true}
                        value={userInfo.phone_number}
                        onChange={(phone) =>
                          handleChangeInfo('phone_number', phone)
                        }
                      />
                    </div>
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
                      {
                        min: 6,
                        message: 'Mật khẩu yêu cầu tối thiểu 6 kí tự',
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
                <div className='mb-0'>
                  <label>
                    Xác nhận mật khẩu <span>*</span>
                  </label>
                  <Form.Item
                    name='confirm_password'
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng điền vào trường này.',
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error('Hai mật khẩu bạn đã nhập không khớp!')
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password
                      value={userInfo.confirm_password}
                      onChange={(e) =>
                        handleChangeInfo('confirm_password', e.target.value)
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
                    'Đăng Kí'
                  )}
                </button>
              </Form>
              {/* <form autoComplete=''>
                <input
                  type='text'
                  className='form-control single-line-input mb-4'
                  placeholder='Tên'
                />
                <input
                  type='email'
                  className='form-control single-line-input mb-4'
                  aria-describedby='emailHelp'
                  placeholder='Tài khoản'
                />
                <input
                  type='tel'
                  className='form-control single-line-input mb-4'
                  placeholder='Số điện thoại'
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
                <button type='submit' className='btn w-100 rounded-pill'>
                  Đăng Nhập
                </button>
              </form> */}
              <div className='d-flex justify-content-center my-2'>
                <p className='link' onClick={handleSignIn}>
                  Tôi đã có tài khoản!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
