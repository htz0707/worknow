import React from 'react';
import '../assets/styles/SelectBookingType.scss';
import Desk from '../assets/images/desk_booking_type.png';
export default function SelectBookingType() {
  return (
    <div className='select-booking-type'>
      <div className='item active'>
        <img src={Desk} className='image' />
        <span className='title'>Desk</span>
      </div>
      <div className='item'>
        <img src={Desk} className='image' />
        <span className='title'>Booth</span>
      </div>
      <div className='item'>
        <img src={Desk} className='image' />
        <span className='title'>Private Office</span>
      </div>
      <div className='item'>
        <img src={Desk} className='image' />
        <span className='title'>Meeting Room</span>
      </div>
      <div className='item'>
        <img src={Desk} className='image' />
        <span className='title'>Event & Lifestyle</span>
      </div>
    </div>
  );
}
