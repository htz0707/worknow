import React, { useEffect } from 'react';
import '../assets/styles/OrderCard.scss';
import { ReactComponent as Calendar } from '../assets/icons/calendar_2.svg';
import { ReactComponent as Clock } from '../assets/icons/clock_2.svg';
import { ReactComponent as EditIcon } from '../assets/icons/edit.svg';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function OrderCard(props) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data, handleReview } = props;
  const renderStatus = (status) => {
    if (status === 'confirming') {
      return (
        <div className='status pending'>
          {t('wait_for_confirm_from_worknow')}
        </div>
      );
    }
    if (status === 'confirmed') {
      return (
        <div className='status pending'>
          {t('wait_for_confirm_from_provider')}
        </div>
      );
    }
    if (status === 'extended') {
      return <div className='status pending'>{t('wait_for_payment')}</div>;
    }
    if (status === 'booking') {
      return <div className='status pending'>{t('wait_for_payment')}</div>;
    }
    if (status === 'payment_fail') {
      return <div className='status cancelled'>{t('payment_failed')}</div>;
    }
    if (status === 'canceled') {
      return <div className='status cancelled'>{t('order_cancelled')}</div>;
    }
  };
  const handleClick = (status) => {
    if (status === 'booking' || status === 'extended') {
      navigate(
        `/create-booking/payment/${data?.orderDetails[0]?.workingSpaces?.locationId}/${data?.id}`
      );
    } else {
      navigate(
        `/create-booking/status/${data?.orderDetails[0]?.workingSpaces?.locationId}/${data?.id}`
      );
    }
  };
  return (
    <div className='order-card py-2'>
      <div className='order-card-left'>
        <img
          src={data?.orderDetails[0]?.workingSpaces?.images[0]?.publicUrl}
          className='image'
        />
      </div>
      <div className='order-card-right'>
        <div
          className='ordercode-locationname mb-2'
          onClick={() => handleClick(data?.status)}
        >
          <span>#{data?.orderId}</span> -{' '}
          <span>{data?.orderDetails[0]?.workingSpaces?.locationName}</span>
        </div>
        <div className='workingspace-name mb-2'>
          {data?.orderDetails[0]?.workingSpaces?.name}
        </div>
        {data?.orderDetails[0]?.bookingType === 'hour' && (
          <>
            <div className='date mb-1'>
              <Calendar height={20} />{' '}
              {moment(data?.orderDetails[0]?.startDate).format('DD/MM/YYYY')}
            </div>
            <div className='time'>
              <Clock height={20} />{' '}
              {moment(data?.orderDetails[0]?.startDate).format('HH:mm')}
              {' - '}
              {moment(data?.orderDetails[0]?.endDate).format('HH:mm')}{' '}
            </div>
          </>
        )}
        {data?.orderDetails[0]?.bookingType === 'day' && (
          <>
            <div className='date mb-1'>
              <Calendar height={20} />{' '}
              {moment(data?.orderDetails[0]?.startDate).format('DD/MM/YYYY')}
              {' - '}
              {moment(data?.orderDetails[0]?.endDate).format('DD/MM/YYYY')}
            </div>
          </>
        )}
        {renderStatus(data?.status)}
        {(data?.status === 'completed' || data?.status === 'checked_in') && (
          <div className='review-section'>
            <button className='btn-review' onClick={() => handleReview(data)}>
              <EditIcon className='icon' /> Đánh giá
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
