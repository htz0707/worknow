/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Button, Input, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import parsePhoneNumber from 'libphonenumber-js';
import '../assets/styles/SignUpForm.scss';
import { gql, useMutation } from '@apollo/client';
import { handleError, handleMessage } from '../helpers/helpers';

export default function SignUpForm(props) {
  const { Option } = Select;
  const { t } = useTranslation();
  let navigate = useNavigate();
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const [partnerInfo, setPartnerInfo] = useState({
    companyName: '',
    companyAddress: '',
    email: '',
    phone_number: '',
    firstName: '',
    lastName: '',
    title: '',
    message: '',
  });
  const handleChangeInfo = (field, value) => {
    setPartnerInfo({ ...partnerInfo, [field]: value });
  };
  const CREATE_PARTNER = gql`
    mutation CreatePartner(
      $email: String!
      $phoneCountryCode: String!
      $phoneNumber: String!
      $companyName: String!
      $companyAddress: String
      $lastName: String!
      $firstName: String!
      $title: String
      $message: String
    ) {
      createPartner(
        input: {
          email: $email
          phoneCountryCode: $phoneCountryCode
          phoneNumber: $phoneNumber
          companyName: $companyName
          companyAddress: $companyAddress
          lastName: $lastName
          firstName: $firstName
          title: $title
          message: $message
        }
      ) {
        id
      }
    }
  `;
  const [createPartner, { loading }] = useMutation(CREATE_PARTNER, {
    update(_, { data }) {
      handleMessage('success', t('create_inquiry_success'));
      form.resetFields();
      setPartnerInfo({
        companyName: '',
        companyAddress: '',
        email: '',
        phone_number: '',
        firstName: '',
        lastName: '',
        title: '',
        message: '',
      });
    },
    onError(err) {
      console.log(err);
      handleMessage(
        'error',
        handleError(err.graphQLErrors[0]?.message, t('create_inquiry_failed'))
      );
    },
  });
  const handleSubmit = async () => {
    let bodyData = {
      companyName: partnerInfo.companyName,
      companyAddress: partnerInfo.companyAddress,
      email: partnerInfo.email,
      firstName: partnerInfo.firstName,
      lastName: partnerInfo.lastName,
      title: partnerInfo.title,
      message: partnerInfo.message,
    };
    if (partnerInfo.phone_number) {
      let parse_phone = await parsePhoneNumber('+' + partnerInfo.phone_number);
      bodyData.phoneCountryCode = parse_phone.countryCallingCode;
      bodyData.phoneNumber = parse_phone.nationalNumber;
    }
    createPartner({
      variables: bodyData,
    });
  };
  return (
    <div className='sign-up'>
      {/* <h1>
        {props.free
          ? t('business.section_signup.free-note')
          : t('business.section_signup.pay-note')}{' '}
      </h1> */}
      <Form
        id='inquiry_form'
        name='inquiry_form'
        className='signup-form'
        autoComplete='off'
        onFinish={handleSubmit}
        form={form}
        scrollToFirstError
      >
        <div className='mb-0'>
          <label className='fw-bold'>
            {t('company_name')}
            <span className='required'>*</span>
          </label>
          <Form.Item
            name='company_name'
            rules={[
              {
                required: true,
                message: t('required_field'),
              },
            ]}
          >
            <Input
              className='input-field'
              value={partnerInfo.companyName}
              onChange={(e) => handleChangeInfo('companyName', e.target.value)}
            />
          </Form.Item>
        </div>
        <div className='mb-0'>
          <label className='fw-bold'>{t('company_address')}</label>
          <Form.Item
            name='company_address'
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Input
              className='input-field'
              value={partnerInfo.companyAddress}
              onChange={(e) =>
                handleChangeInfo('companyAddress', e.target.value)
              }
            />
          </Form.Item>
        </div>
        <div className='row'>
          <div className='col-6'>
            <label className='fw-bold'>
              {t('last_name')}
              <span className='required'>*</span>
            </label>
            <Form.Item
              name='last_name'
              rules={[
                {
                  required: true,
                  message: t('required_field'),
                },
              ]}
            >
              <Input
                className='input-field'
                value={partnerInfo.lastName}
                onChange={(e) => handleChangeInfo('lastName', e.target.value)}
              />
            </Form.Item>
          </div>
          <div className='col-6'>
            <label className='fw-bold'>
              {t('first_name')}
              <span className='required'>*</span>
            </label>
            <Form.Item
              name='first_name'
              rules={[
                {
                  required: true,
                  message: t('required_field'),
                },
              ]}
            >
              <Input
                className='input-field'
                value={partnerInfo.firstName}
                onChange={(e) => handleChangeInfo('firstName', e.target.value)}
              />
            </Form.Item>
          </div>
        </div>
        <div className='mb-0'>
          <label className='fw-bold'>{t('phone')}</label>
          <Form.Item
            name='phone'
            rules={[
              {
                async validator(_, value) {
                  let parse_phone = await parsePhoneNumber(
                    '+' + partnerInfo.phone_number
                  );
                  if (parse_phone?.isValid() !== true) {
                    return Promise.reject(new Error(t('phone_invalid')));
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
                value={partnerInfo.phone_number}
                onChange={(phone) => handleChangeInfo('phone_number', phone)}
              />
            </div>
          </Form.Item>
        </div>
        <div className='mb-0'>
          <label className='fw-bold'>
            {t('email')}
            <span className='required'>*</span>
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
              className='input-field'
              value={partnerInfo.email}
              onChange={(e) => handleChangeInfo('email', e.target.value)}
            />
          </Form.Item>
        </div>
        <div className='mb-0'>
          <label className='fw-bold'>{t('job_title')}</label>
          <Form.Item
            name='title'
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Input
              className='input-field'
              value={partnerInfo.title}
              onChange={(e) => handleChangeInfo('title', e.target.value)}
            />
          </Form.Item>
        </div>
        <div className='mb-0'>
          <label className='fw-bold'>{t('message')}</label>
          <Form.Item
            name='message'
            rules={[
              {
                required: false,
              },
            ]}
          >
            <TextArea
              className='input-field'
              rows={4}
              value={partnerInfo.message}
              onChange={(e) => handleChangeInfo('message', e.target.value)}
            />
          </Form.Item>
        </div>
        {/* {props.free ? (
          <>
            <Form.Item name='referral-code'>
              <label>{t('business.section_signup.code')}</label>
              <Input />
            </Form.Item>
            <div className='sign-up-term'>
              By submitting, you agree with Work Now for{' '}
              <a href='#'>
                Work Now for Business Terms of Service,Work Now's Terms of
                Service
              </a>{' '}
              and <a href='#'>Privacy Policy.</a>
            </div>
          </>
        ) : (
          <>
            <Form.Item name='location'>
              <label>{t('business.section_signup.location')}v</label>
              <Select>
                <Option value='Singapore'>Singapore</Option>
                <Option value='VietNam'>VietNam</Option>
              </Select>
            </Form.Item>
            <Form.Item name='job-title'>
              <label>{t('business.section_signup.job-title')}</label>
              <Input />
            </Form.Item>
            <Form.Item name='message'>
              <label>{t('business.section_signup.message')}</label>
              <Input.TextArea showCount maxLength={500} />
            </Form.Item>
            <Form.Item name='company-size'>
              <label>{t('business.section_signup.size')}</label>
              <Select>
                <Option value='1-10'>1-10</Option>
                <Option value='10-100'>10-100</Option>
                <Option value='101-500'>101-500</Option>
                <Option value='500+'>500+</Option>
              </Select>
            </Form.Item>
          </>
        )} */}
        <Form.Item>
          <Button type='primary' htmlType='submit' className='sign-up-btn'>
            {t('submit')}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
