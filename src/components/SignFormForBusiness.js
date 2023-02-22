/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Button, Input, Select, Modal } from 'antd';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import parsePhoneNumber from 'libphonenumber-js';
import { gql, useMutation } from '@apollo/client';
import { handleError, handleMessage } from '../helpers/helpers';

import '../assets/styles/SignUpForm.scss';

export default function SignUpForm(props) {
  const { Option } = Select;
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [show, setShow] = useState(false);

  const SIGN_UP_BUSINESS = gql`
    mutation SignUpBusiness(
      $email: String!
      $phoneCountryCode: String!
      $phoneNumber: String!
      $companyName: String!
    ) {
      signUpBusiness(
        data: {
          email: $email
          phoneCountryCode: $phoneCountryCode
          phoneNumber: $phoneNumber
          companyName: $companyName
        }
      )
    }
  `;
  const [signUpBusiness] = useMutation(SIGN_UP_BUSINESS, {
    update(_) {
      setShow(true);
      setPhone('');
      setCompanyName('');
      setEmail('');
      form.resetFields();
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
    let parse_phone = await parsePhoneNumber('+' + phone);
    signUpBusiness({
      variables: {
        email: email,
        phoneCountryCode: parse_phone.countryCallingCode,
        phoneNumber: parse_phone.nationalNumber,
        companyName: companyName
      }
    })
  };
  return (
    <div className='sign-up'>
      <Form
        name='sign-up-business'
        className='signup-form'
        autoComplete='off'
        onFinish={handleSubmit}
        form={form}
        scrollToFirstError
      >
        <div>
          <label className='fw-bold'>
            {t('company_name')}
            <span className='required'>*</span>
          </label>
          <Form.Item
            name='company'
            rules={[
              {
                required: true,
                message: 'Vui Lòng Nhập Tên Công Ty!',
              },
            ]}
          >
            <Input
              className='input-field'
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder='Nhập vào tên công ty của bạn'
            />
          </Form.Item>
        </div>
        <label className='fw-bold'>
          {t('email')}
          <span className='required'>*</span>
        </label>
        <Form.Item
          name='work-email'
          rules={[
            {
              required: true,
              message: 'Vui Lòng Nhập Email!',
            },
            {
              type: 'email',
              message: 'Vui Lòng Nhập Email hợp lệ!',
            }
          ]}
        >
          <Input
            className='input-field'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Nhập vào email của bạn'
          />
        </Form.Item>
        <div>
          <label className='fw-bold'>
            Số Điện Thoại <span className='required'>*</span>
          </label>
          <Form.Item
            name='phone'
            rules={[
              {
                required: true,
                message: 'Vui lòng điền vào trường này.',
              },
              {
                async validator(_, value) {
                  if (phone) {
                    let parse_phone = await parsePhoneNumber(
                      '+' + phone
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
                placeholder='Nhập vào số điện thoại của bạn'
                country={'vn'}
                enableSearch={true}
                value={phone}
                onChange={(phone) =>
                  setPhone(phone)
                }
              />
            </div>
          </Form.Item>
        </div>
        <Form.Item>
          <Button type='primary' htmlType='submit' className='sign-up-btn'>
            {t('submit')}
          </Button>
        </Form.Item>
      </Form>
      <Modal
        centered
        open={show}
        footer={null}
        onCancel={() => setShow(false)}
      >
        <h3 className='fw-bold mb-5'>
          <span className='pb-2 border-bottom border-dark border-5'>ĐĂNG KÝ MIỄN PHÍ</span>
        </h3>
        <div>
          <p>
            Email xác minh đã được gửi đến hộp thư đến của bạn. Vui lòng truy cập hộp thư đến của bạn để xác minh email và thiết lập tài khoản.
          </p>
          <p>
            Nếu bạn không thấy email sau vài phút, hãy kiểm tra thư mục thư rác hoặc thư.
          </p>
        </div>
      </Modal>
    </div>
  );
}
