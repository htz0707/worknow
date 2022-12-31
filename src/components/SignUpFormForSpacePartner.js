/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Button, Input, Select } from 'antd';
import { useNavigate } from 'react-router-dom';

import '../assets/styles/SignUpForm.scss';

export default function SignUpForm(props) {
  const { Option } = Select;
  const { t } = useTranslation();
  let navigate = useNavigate();
  return (
    <div className='sign-up'>
      {/* <h1>
        {props.free
          ? t('business.section_signup.free-note')
          : t('business.section_signup.pay-note')}{' '}
      </h1> */}
      <Form
        name='free_signup'
        className='signup-form'
        initialValues={{ remember: true }}
      >
        <Form.Item
          name='company'
          rules={[
            {
              required: true,
              message: 'Vui Lòng Nhập Tên Công Ty!',
            },
          ]}
        >
          <label className='fw-bold'>
            {t('company_name')}
            <span className='required'>*</span>
          </label>
          <Input />
        </Form.Item>
        <Form.Item
          name='address'
          rules={[
            {
              required: false,
              message: 'Vui Lòng Nhập Địa Chỉ Công Ty!',
            },
          ]}
        >
          <label className='fw-bold'>{t('company_address')}</label>
          <Input />
        </Form.Item>
        <div className='d-flex'>
          <Form.Item
            name='last-name'
            className='last-name-block'
            rules={[
              {
                required: true,
                message: 'Vui Lòng Nhập Họ Của Bạn!',
              },
            ]}
          >
            <label className='fw-bold'>
              {t('last_name')}
              <span className='required'>*</span>
            </label>
            <Input />
          </Form.Item>
          <Form.Item
            name='first-name'
            rules={[
              {
                required: true,
                message: 'Vui Lòng Nhập Tên Của Bạn!',
              },
            ]}
          >
            <label className='fw-bold'>
              {t('first_name')}
              <span className='required'>*</span>
            </label>
            <Input />
          </Form.Item>
        </div>
        <div className='row'>
          <label className='fw-bold'>
            {t('phone_number')} <span className='required'>*</span>
          </label>
          <div className='col-2'>
            <Form.Item name='phone-code'>
              <Select>
                <Option value='+65'>+65</Option>
                <Option value='+84'>+84</Option>
              </Select>
            </Form.Item>
          </div>
          <div className='col-10'>
            <Form.Item
              name='phone-number'
              rules={[
                {
                  required: true,
                  message: 'Vui Lòng Nhập Số Điện Thoại!',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </div>
        </div>
        <Form.Item
          name='work-email'
          rules={[
            {
              required: true,
              message: 'Vui Lòng Nhập Email!',
            },
          ]}
        >
          <label className='fw-bold'>
            {t('email')}
            <span className='required'>*</span>
          </label>
          <Input />
        </Form.Item>
        <Form.Item
          name='position'
          rules={[
            {
              required: false,
              message: 'Vui Lòng Nhập Chức Danh!',
            },
          ]}
        >
          <label className='fw-bold'>{t('job_title')}</label>
          <Input />
        </Form.Item>
        <Form.Item
          name='message'
          rules={[
            {
              required: false,
              message: 'Vui Lòng Nhập Tin Nhắn!',
            },
          ]}
        >
          <label className='fw-bold'>{t('message')}</label>
          <Input />
        </Form.Item>
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
