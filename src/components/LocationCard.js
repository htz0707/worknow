import React from 'react';
import '../assets/styles/LocationCard.scss';
import { Carousel } from 'react-bootstrap';
import Img1 from '../assets/images/location_img1.png';
import Img2 from '../assets/images/location_img2.jpg';
import { useNavigate } from 'react-router-dom';
import Tag from './Tag';

export default function LocationCard() {
  let navigate = useNavigate();
  const handleClick = () => {
    navigate(`/locations/details/1`);
  };
  return (
    <div className='location-card'>
      <div className='left'>
        <Carousel variant='light' className='carousel' interval={null}>
          <Carousel.Item>
            <img alt='' src={Img1} />
          </Carousel.Item>
          <Carousel.Item>
            <img alt='' src={Img2} />
          </Carousel.Item>
        </Carousel>
      </div>
      <div className='right'>
        <div>
          <div className='location-name'>CirCo Đông Du</div>
          <div className='location-company'>Công ty Circo</div>
          <div className='location-address'>
            41 Đông Du, Bến Nghé, Quận 1, Tp.HCM
          </div>
          <div className='location-service'>
            <Tag text='Wifi miễn phí' />
            <Tag text='Đậu xe miễn phí' />
          </div>
        </div>
        <div>
          <div className='promotion'>50% giảm giá hôm nay</div>
          <div className='old-price'>250,000đ/ giờ</div>
          <div className='new-price'>
            <span>Chỉ từ </span>125,000đ/ giờ
          </div>
          <button onClick={handleClick}>Xem chi tiết</button>
        </div>
      </div>
    </div>
  );
}
