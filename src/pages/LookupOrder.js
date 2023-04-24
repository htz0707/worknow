import React, { useState } from 'react';
import '../assets/styles/LookupOrder.scss';
import { Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { ReactComponent as DangerIcon } from '../assets/icons/danger.svg';
import { ReactComponent as CloseIcon } from '../assets/icons/close.svg';

export default function LookupOrder() {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [orderCode, setOrderCode] = useState('');
  const [status, setStatus] = useState(false);
  const handleClose = () => {
    setStatus(false);
  };
  return (
    <div className='lookup-order'>
      <div className='lookup-order-container'>
        <div className='title'>{t('lookup_order')}</div>
        <Form
          name='lookup-form'
          autoComplete='off'
          form={form}
          scrollToFirstError
        >
          <div>
            <Form.Item
              name='order_code'
              rules={[
                {
                  required: true,
                  message: t('required_field'),
                },
              ]}
            >
              <Input
                placeholder={t('fill_order_code')}
                className='form-input'
                value={orderCode}
                onChange={(e) => {
                  setOrderCode(e.target.value);
                  handleClose();
                }}
              />
            </Form.Item>
            {status && (
              <div className='no-result'>
                <div className='content'>
                  <DangerIcon className='danger-icon' />
                  {t('no_found_order')}
                </div>
                <CloseIcon className='close-icon' onClick={handleClose} />
              </div>
            )}
          </div>
        </Form>
        <button className='btn-submit' type='submit' form='lookup-form'>
          {t('search')}
        </button>
      </div>
    </div>
  );
}
