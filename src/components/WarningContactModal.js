import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { ReactComponent as WarningIcon } from '../assets/icons/warning.svg';
import '../assets/styles/WarningContactModal.scss';
import { Form, Input, Radio } from 'antd';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import parsePhoneNumber from 'libphonenumber-js';
import { useTranslation } from 'react-i18next';
import { gql, useMutation } from '@apollo/client';
import { handleMessage } from '../helpers/helpers';
import { handleError } from '@apollo/client/link/http/parseAndCheckHttpResponse';

export default function WarningContactModal(props) {
  const { t } = useTranslation();
  const { show, handleClose, selectedWorkingSpace } = props;
  const [form] = Form.useForm();

  const [userInfo, setUserInfo] = useState({
    full_name: '',
    email: '',
    phone_number: '',
    sex: 'male',
  });
  const handleChangeInfo = (field, value) => {
    setUserInfo({ ...userInfo, [field]: value });
  };
  const handleCancel = () => {
    form.resetFields();
    setUserInfo({
      full_name: '',
      email: '',
      phone_number: '',
      sex: 'male',
    });
    handleClose();
  };
  const CREATE_INQUIRY = gql`
    mutation CreateInquiry(
      $fullname: String!
      $email: String!
      $phoneCountryCode: String!
      $phoneNumber: String!
      $sex: Sex!
      $workingSpaceId: UUID!
    ) {
      createInquiry(
        input: {
          fullname: $fullname
          email: $email
          phoneCountryCode: $phoneCountryCode
          phoneNumber: $phoneNumber
          sex: $sex
          workingSpaceId: $workingSpaceId
        }
      ) {
        id
      }
    }
  `;
  const [createInquiry] = useMutation(CREATE_INQUIRY, {
    update() {
      handleCancel();
      handleMessage('success', t('create_inquiry_success'));
    },
    onError(err) {
      handleCancel();
      console.log(err);
      handleMessage(
        'error',
        handleError(err.graphQLErrors[0]?.message, t('create_inquiry_failed'))
      );
    },
  });
  const handleSubmit = async () => {
    let bodyData = {
      fullname: userInfo.full_name,
      email: userInfo.email,
      sex: userInfo.sex,
      workingSpaceId: selectedWorkingSpace.id,
    };
    if (userInfo.phone_number) {
      let parse_phone = await parsePhoneNumber('+' + userInfo.phone_number);
      bodyData.phoneCountryCode = parse_phone.countryCallingCode;
      bodyData.phoneNumber = parse_phone.nationalNumber;
    }
    createInquiry({
      variables: bodyData,
    });
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
        <div className='title'>{t('receive_quote_now')}</div>
        <div className='description'>{t('please_fill_info_description')} </div>
        <div className='form-contact'>
          <div className='title'>{t('contact')}</div>
          <Form
            id='user_info_form'
            autoComplete='off'
            onFinish={handleSubmit}
            // initialValues={{ remember: true }}
            form={form}
          >
            <div className='mb-0'>
              <label className='fw-bold'>{t('first_last_name')}</label>
              <Form.Item
                name='full_name'
                rules={[
                  {
                    required: true,
                    message: t('required_field'),
                  },
                ]}
              >
                <Input
                  className='input-field py-2'
                  placeholder={t('enter_your_full_name')}
                  value={userInfo.full_name}
                  onChange={(e) =>
                    handleChangeInfo('full_name', e.target.value)
                  }
                />
              </Form.Item>
            </div>
            <div className='mb-3'>
              <Radio.Group
                value={userInfo.sex}
                onChange={(e) => handleChangeInfo('sex', e.target.value)}
              >
                <Radio value={'male'}>{t('male')}</Radio>
                <Radio value={'female'}>{t('female')}</Radio>
              </Radio.Group>
            </div>
            <div className='mb-0'>
              <label className='fw-bold'>{t('email')}</label>
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
                  className='input-field py-2'
                  placeholder={t('enter_your_email')}
                  value={userInfo.email}
                  onChange={(e) => handleChangeInfo('email', e.target.value)}
                />
              </Form.Item>
            </div>
            <div className='mb-0'>
              <label className='fw-bold'>{t('phone_number')}</label>
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
                          return Promise.reject(new Error(t('phone_invalid')));
                        }
                        return Promise.resolve();
                      } else {
                        return Promise.reject(new Error(t('required_field')));
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
                    placeholder={t('enter_your_phone_number')}
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
                onClick={handleCancel}
              >
                {t('cancel')}
              </button>
              <button
                type='submit'
                form='user_info_form'
                className='btn-confirm'
              >
                {t('require_support')}
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
