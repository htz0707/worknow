import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { ReactComponent as WarningIcon } from '../assets/icons/warning.svg';
import '../assets/styles/WarningContactModal.scss';
import { Form, Input } from 'antd';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import parsePhoneNumber from 'libphonenumber-js';

export default function WarningContactModal(props) {
  const { show, handleClose } = props;
  const [form] = Form.useForm();
  const [userInfo, setUserInfo] = useState({
    full_name: '',
    email: '',
    phone_number: '',
  });
  const handleChangeInfo = (field, value) => {
    setUserInfo({ ...userInfo, [field]: value });
  };
  return (
    <Modal
      show={show}
      backdrop='static'
      keyboard={false}
      aria-labelledby='contained-modal-title-vcenter'
      centered
      className='warning-contact-modal'
    >
      <Modal.Body className='warning-contact-modal_body'>
        <div className='icon-container'>
          <WarningIcon />
        </div>
        <div className='title'>Nhận Báo Giá Ngay</div>
        <div className='description'>
          Vui lòng để lại thông tin của bạn, chuyên viên tư vấn của chúng tôi sẽ
          liên hệ với bạn ngay lập tức.{' '}
        </div>
        <div className='form-contact'>
          <div className='title'>Liên hệ</div>
          <Form
            id='user_info_form'
            autoComplete='off'
            //   onFinish={handleSubmit}
            // initialValues={{ remember: true }}
            form={form}
          >
            <div className='mb-0'>
              <label className='fw-bold'>Họ Tên</label>
              <Form.Item
                name='full_name'
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng điền vào trường này.',
                  },
                ]}
              >
                <Input
                  className='input-field py-2'
                  placeholder='Nhập vào tên của bạn'
                  value={userInfo.full_name}
                  onChange={(e) =>
                    handleChangeInfo('full_name', e.target.value)
                  }
                />
              </Form.Item>
            </div>
            <div className='mb-0'>
              <label className='fw-bold'>Email</label>
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
                <Input
                  className='input-field py-2'
                  placeholder='Nhập vào email của bạn'
                  value={userInfo.email}
                  onChange={(e) => handleChangeInfo('email', e.target.value)}
                />
              </Form.Item>
            </div>
            <div className='mb-0'>
              <label className='fw-bold'>Số điện thoại</label>
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
                      } else {
                        return Promise.reject(
                          new Error('Vui lòng điền vào trường này.')
                        );
                      }
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
                    placeholder='Nhập vào SĐT của bạn'
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
            <Form.Item className='btn-group'>
              <button
                type='button'
                className='btn-cancel'
                onClick={handleClose}
              >
                Hủy
              </button>
              <button
                type='submit'
                form='user_info_form'
                className='btn-confirm'
              >
                Yêu cầu hỗ trợ
              </button>
            </Form.Item>
          </Form>
        </div>
        {/* <div className='description'>
          Đơn hàng <span>#{order_code}</span> của bạn đã quá hạn thanh toán.
          <br /> Vui lòng đặt lại!
        </div>
        <button className='btn-home' onClick={() => navigate('/locations')}>
          Về Trang Chủ
        </button> */}
      </Modal.Body>
    </Modal>
  );
}
