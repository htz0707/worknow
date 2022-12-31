import React from 'react';
import '../assets/styles/SelectBookingType.scss';
import Desk from '../assets/images/desk_booking_type.png';
export default function SelectBookingType() {
  return (
    <div className='select-booking-type'>
      <div className='item active'>
        <img alt='' src={Desk} className='image' />
        <span className='title'>Bàn làm việc cá nhân</span>
      </div>
      <div className='item'>
        <img alt='' src={Desk} className='image' />
        <span className='title'>Phòng họp</span>
      </div>
      <div className='item'>
        <img alt='' src={Desk} className='image' />
        <span className='title'>Văn phòng riêng</span>
      </div>
      <div className='item'>
        <img alt='' src={Desk} className='image' />
        <span className='title'>Sự kiện</span>
      </div>
    </div>
  );
}
