import React, { useState } from 'react';
import '../assets/styles/SignUp.scss';
import Logo from '../assets/images/logo_2.png';
import { useNavigate, useParams } from 'react-router-dom';
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
import { useTranslation } from 'react-i18next';

export default function SignUp() {
  const { t } = useTranslation();
  const { login } = useAuthContext();
  const { id } = useParams();
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
      handleMessage('error', t('sign_in_not_success'));
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
      $refereeBy: String!
    ) {
      signUpMember(
        data: {
          fullname: $fullname
          email: $email
          phoneCountryCode: $phoneCountryCode
          phoneNumber: $phoneNumber
          password: $password
          refereeBy: $refereeBy
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
        handleError(err.graphQLErrors[0]?.message, t('sign_up_not_success'))
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
      refereeBy: id
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

  const handleRedirectToHome = () => {
    navigate('/');
  };

  return (
    <div className='sign-up-page'>
      <div className='container-md'>
        <div className='row'>
          <div className='logo col-lg-5 d-flex justify-content-center align-items-center'>
            <img
              className='pointer'
              src={Logo}
              width={200}
              onClick={handleRedirectToHome}
            />
          </div>
          <div className='col-lg-7 d-flex justify-content-center align-items-center'>
            <div className='sign-up-form rounded px-3 py-4'>
              <h3 className='d-flex justify-content-center fw-bold text-uppercase'>
                {t('sign_up')}
              </h3>
              <p className='d-flex justify-content-center'>
                Đăng ký thành viên mời theo lời mời của bạn bè
              </p>
              <Form
                id='my_form'
                autoComplete='off'
                onFinish={handleSubmit}
                form={form}
              >
                <div className='mb-0'>
                  <label>
                    {t('first_last_name')} <span>*</span>
                  </label>
                  <Form.Item
                    name='full_name'
                    rules={[
                      {
                        required: true,
                        message: t('required_field'),
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
                  <label>{t('phone')}</label>
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
                                new Error(t('phone_invalid'))
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
                    {t('password')} <span>*</span>
                  </label>
                  <Form.Item
                    name='password'
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
                      value={userInfo.password}
                      onChange={(e) =>
                        handleChangeInfo('password', e.target.value)
                      }
                    />
                  </Form.Item>
                </div>
                <div className='mb-0'>
                  <label>
                    {t('confirm_password')} <span>*</span>
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
                          if (!value || getFieldValue('password') === value) {
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
                    t('sign_up')
                  )}
                </button>
              </Form>
              <div className='d-flex justify-content-center my-2'>
                <p className='link' onClick={handleSignIn}>
                  {t('already_have_account')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
