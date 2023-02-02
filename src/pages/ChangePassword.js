import React, { useState } from 'react';
import '../assets/styles/ChangePassword.scss';
import Bcrumb from '../components/Bcrumb';
import { Form, Input, Button } from 'antd';
import { gql, useMutation } from '@apollo/client';
import { handleError, handleMessage } from '../helpers/helpers';
import { useTranslation } from 'react-i18next';

export default function ChangePassword() {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [userInfo, setUserInfo] = useState({
    old_password: '',
    new_password: '',
    confirm_password: '',
  });
  const handleChangeInfo = (field, value) => {
    setUserInfo({ ...userInfo, [field]: value });
  };
  const CHANGE_PASSWORD = gql`
    mutation ChangePassword($newPassword: String!, $oldPassword: String) {
      changePassword(
        data: { newPassword: $newPassword, oldPassword: $oldPassword }
      ) {
        id
      }
    }
  `;
  const [changePassword] = useMutation(CHANGE_PASSWORD, {
    update(_, { data: { changePassword: userData } }) {
      handleMessage('success', t('update_success'));
      setUserInfo({
        old_password: '',
        new_password: '',
        confirm_password: '',
      });
      form.resetFields();
    },
    onError(err) {
      console.log(err);
      handleMessage(
        'error',
        handleError(err.graphQLErrors[0]?.message, t('update_not_success'))
      );
    },
  });
  const handleSubmit = async () => {
    let bodyData = {
      oldPassword: userInfo.old_password,
      newPassword: userInfo.new_password,
    };
    changePassword({
      variables: bodyData,
    });
  };
  return (
    <div className='change-password page-container'>
      <div className='change-password_header'>
        <Bcrumb
          data={[
            {
              label: t('security'),
              path: true,
            },
          ]}
        />
      </div>
      <div className='change-password_body p-4'>
        <h4 className='fw-bold text-uppercase'>{t('security_info')}</h4>
        <Form
          id='change_password_form'
          autoComplete='off'
          onFinish={handleSubmit}
          form={form}
        >
          <div className='input-section mb-0'>
            <label>
              {t('old_password')}
              <span>*</span>
            </label>
            <Form.Item
              name='old_password'
              rules={[
                {
                  required: true,
                  message: t('required_field'),
                },
              ]}
            >
              <Input.Password
                className='py-2'
                value={userInfo.old_password}
                onChange={(e) =>
                  handleChangeInfo('old_password', e.target.value)
                }
              />
            </Form.Item>
          </div>
          <div className='input-section mb-0'>
            <label>
              {t('new_password')}
              <span>*</span>
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
                value={userInfo.new_password}
                onChange={(e) =>
                  handleChangeInfo('new_password', e.target.value)
                }
              />
            </Form.Item>
          </div>
          <div className='input-section mb-0'>
            <label>
              {t('confirm_new_password')}
              <span>*</span>
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
                    if (!value || getFieldValue('new_password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error(t('password_not_match')));
                  },
                }),
              ]}
            >
              <Input.Password
                className='py-2'
                value={userInfo.confirm_password}
                onChange={(e) =>
                  handleChangeInfo('confirm_password', e.target.value)
                }
              />
            </Form.Item>
          </div>
          <Form.Item className='text-end'>
            <button
              type='submit'
              form='change_password_form'
              className='update-btn'
            >
              {t('update')}
            </button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
