import React, { useState } from 'react';
import '../assets/styles/LookupOrder.scss';
import { Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { ReactComponent as DangerIcon } from '../assets/icons/danger.svg';
import { ReactComponent as CloseIcon } from '../assets/icons/close.svg';
import { gql, useLazyQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';

export default function LookupOrder() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [orderCode, setOrderCode] = useState('');
  const [status, setStatus] = useState(false);
  const handleClose = () => {
    setStatus(false);
  };
  const GET_ORDER_DETAILS = gql`
    query GetOrderDetailByOrderCode($orderCode: String!) {
      getOrderDetailByOrderCode(orderCode: $orderCode) {
        id
        status
        orderDetails {
          bookingType
          day
          endDate
          hour
          price
          startDate
          workingSpaces {
            locationId
            locationName
            name
            images {
              publicUrl
            }
          }
        }
      }
    }
  `;
  const [getOrderDetails] = useLazyQuery(GET_ORDER_DETAILS, {
    fetchPolicy: 'no-cache',
    onCompleted(data) {
      let orderData = data.getOrderDetailByOrderCode;
      if (orderData.status === 'booking' || orderData.status === 'extended') {
        navigate(
          `/create-booking/payment?location_id=${orderData?.orderDetails[0]?.workingSpaces?.locationId}&order_id=${orderData?.id}`
        );
      } else {
        navigate(
          `/create-booking/status?location_id=${orderData?.orderDetails[0]?.workingSpaces?.locationId}&order_id=${orderData?.id}`
        );
      }
    },
    onError(err) {
      console.log(err);
      setStatus(true);
    },
  });
  const handleSubmit = async () => {
    getOrderDetails({
      variables: {
        orderCode: orderCode,
      },
    });
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
          onFinish={handleSubmit}
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
