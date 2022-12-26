import React from 'react';
import '../assets/styles/ChangePassword.scss';
import Bcrumb from '../components/Bcrumb';
import { Form, Input, Button } from 'antd';

export default function ChangePassword() {
  const [form] = Form.useForm();
  return (
    <div className='change-password page-container'>
      <div className='change-password_header'>
        <Bcrumb
          data={[
            {
              label: 'Bảo mật',
              path: true,
            },
          ]}
        />
      </div>
      <div className='change-password_body p-4'>
        <h4 className='fw-bold'>THÔNG TIN BẢO MẬT</h4>
        <Form
          name='change_password'
          form={form}
          initialValues={{ remember: true }}
        >
          <Form.Item name='old-pwd'>
            <label className='fw-bold'>Mật Khẩu Cũ</label>
            <Input.Password
              className='input-field py-2'
              placeholder='Nhập vào mật khẩu cũ của bạn'
            />
          </Form.Item>
          <Form.Item name='new-pwd'>
            <label className='fw-bold'>Mật Khẩu Mới</label>
            <Input.Password
              className='input-field py-2'
              placeholder='Nhập vào mật khẩu mới của bạn'
            />
          </Form.Item>
          <div>
            <label className='fw-bold'>Xác Thực Mật Khẩu Mới</label>
            <Form.Item
              name='verify-pwd'
              rules={[
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('new-pwd') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error('Không trùng khớp, vui lòng nhập lại')
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                className='input-field py-2'
                placeholder='Nhập vào chính xác mật khẩu mới của bạn'
              />
            </Form.Item>
          </div>
          <Form.Item className='text-end'>
            <Button type='primary' htmlType='submit' className='update-btn'>
              Cập Nhật
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
