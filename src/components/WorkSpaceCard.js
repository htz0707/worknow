import React from 'react';
import '../assets/styles/WorkSpaceCard.scss';
import Img1 from '../assets/images/location_img1.png';
import Tag from './Tag';
import TimeSlotView from './TimeSlotView';
import { Carousel } from 'react-bootstrap';
import { formatCurrency } from '../helpers/helpers';

export default function WorkSpaceCard(props) {
  const { data } = props;
  const handleClick = () => {
    props.handleClick();
  };
  const renderHourOrDay = (value) => {
    if (
      value === 'Bàn làm việc linh hoạt' ||
      value === 'Bàn làm việc cố định' ||
      value === 'Phòng làm việc riêng'
    ) {
      return 'Ngày';
    } else if (
      value === 'Phòng họp' ||
      value === 'Sảnh sự kiện' ||
      value === 'Phòng hội nghị' ||
      value === 'Phone booth'
    ) {
      return 'h';
    } else {
      return 'h';
    }
  };
  return (
    <div className='workspace-card'>
      <div className='left'>
        <Carousel variant='light' className='carousel' interval={null}>
          {data.images?.map((item, index) => {
            return (
              <Carousel.Item key={index}>
                <img alt='' src={item.publicUrl} />
              </Carousel.Item>
            );
          })}
        </Carousel>
      </div>
      <div className='center'>
        <div className='name'>{data?.name}</div>
        <div className='description'>
          <div>{data.description}</div>
        </div>
        <div className='amenity'>
          {data.amenities?.map((item, index) => {
            if (index < 3) {
              return <Tag text={item.name} key={index} />;
            }
          })}
        </div>
      </div>
      <div className='right'>
        {/* <div className='old-price'>250,000Đ/H</div> */}
        <div className='new-price'>
          {formatCurrency(data?.price)}/{renderHourOrDay(data?.type)}
        </div>
        <button onClick={handleClick}>Đặt ngay</button>
      </div>
    </div>
  );
}
