import React from 'react';
import '../assets/styles/WorkSpaceCard.scss';
import Img1 from '../assets/images/location_img1.png';
import Tag from './Tag';
import TimeSlotView from './TimeSlotView';

export default function WorkSpaceCard(props) {
  const handleClick = () => {
    props.handleClick();
  };
  return (
    <div className='workspace-card'>
      <div className='left'>
        <img src={Img1} />
      </div>
      <div className='center'>
        <div>Lounge Area (4 Hours Promotion)</div>
        <div>Simply show your booking at the front desk</div>
        <div>09:00 - 21:00</div>
        <div>
          <Tag text='Instant Booking' />
        </div>
        <div>
          <TimeSlotView start='09:00' end='23:00' />
        </div>
      </div>
      <div className='right'>
        <div className='price'>
          <span>$</span>
          <span className='number'>
            <span>7</span>
            <span>.80</span>
          </span>
          <span>/hr</span>
        </div>
        <div className='booking' onClick={handleClick}>
          Book
        </div>
      </div>
    </div>
  );
}
