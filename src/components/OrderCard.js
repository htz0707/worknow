import React, { useEffect } from 'react';
import '../assets/styles/OrderCard.scss';
import Room from '../assets/images/room.png';
import { ReactComponent as Calendar } from '../assets/icons/calendar_2.svg';
import { ReactComponent as Clock } from '../assets/icons/clock_2.svg';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

export default function OrderCard(props) {
  const navigate = useNavigate();
  const { data } = props;
  const renderStatus = (status) => {
    if (status === 'confirming') {
      return (
        <div className='status pending'>Chờ xác thực từ WorkNow Admin</div>
      );
    }
    if (status === 'confirmed') {
      return (
        <div className='status pending'>
          Đã xác thực bởi Admin, đang chờ NCC duyệt
        </div>
      );
    }
    if (status === 'extended') {
      return <div className='status pending'>Chờ thanh toán</div>;
    }
    if (status === 'booking') {
      return <div className='status pending'>Chờ thanh toán</div>;
    }
    if (status === 'payment_fail') {
      return <div className='status cancelled'>Thanh toán thất bại</div>;
    }
    if (status === 'canceled') {
      return <div className='status cancelled'>Chỗ đặt bị hủy</div>;
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
    <div className='order-card py-2 px-3'>
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
      </div>
    </div>
  );
}