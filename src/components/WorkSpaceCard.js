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
        <div>Bàn làm việc số 1</div>
        <div>
          <div>Gần cửa sổ</div>
          <div>Tầm nhìn ra thành phố</div>
          <div>09:00 - 21:00</div>
        </div>
        <div>
          <TimeSlotView start='09:00' end='23:00' />
        </div>
      </div>
      <div className='right'>
        <div className='old-price'>250,000Đ/H</div>
        <div className='new-price'>125,000Đ/H</div>
        <button onClick={handleClick}>Đặt ngay</button>
      </div>
    </div>
  );
}
