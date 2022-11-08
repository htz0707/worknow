import React from 'react';
import '../assets/styles/LocationCard.scss';
import { Carousel } from 'react-bootstrap';
import Img1 from '../assets/images/location_img1.png';
import Img2 from '../assets/images/location_img2.jpg';
import { useNavigate } from 'react-router-dom';
import Tag from './Tag';
import { ReactComponent as StarIcon } from '../assets/icons/start.svg';
import { ReactComponent as LocationIcon } from '../assets/icons/location.svg';
import { ReactComponent as BuildingIcon } from '../assets/icons/building.svg';
import { ReactComponent as AuthenIcon } from '../assets/icons/shield.svg';

export default function LocationCard() {
  let navigate = useNavigate();
  const handleClick = () => {
    navigate(`/locations/1`);
  };
  return (
    <div className='location-card'>
      <div className='location-card_left'>
        <Carousel variant='light' className='carousel' interval={null}>
          <Carousel.Item>
            <img alt='' src={Img1} />
          </Carousel.Item>
          <Carousel.Item>
            <img alt='' src={Img2} />
          </Carousel.Item>
        </Carousel>
      </div>
      <div className='location-card_right'>
        <div>
          <div className='location-name'>CirCo Đông Du</div>
          <div className='location-review'>
            <div>
              <StarIcon className='icon' />
              <StarIcon className='icon' />
              <StarIcon className='icon' />
              <StarIcon className='icon' />
              <StarIcon className='icon' />
            </div>
            <span>+1200 lượt đặt</span>
          </div>
          <div className='location-address'>
            <div className='icon-badge'>
              <LocationIcon className='icon' />
            </div>
            <div>
              <div>41 Đông Du, Bến Nghé, Quận 1, Tp.HCM</div>
              <div>Cách tôi 0,2km</div>
            </div>
          </div>
          <div className='location-type'>
            <div className='icon-badge'>
              <BuildingIcon className='icon' />
            </div>
            <div>Coffee shop</div>
          </div>
          <div className='location-authen'>
            <div className='icon-badge'>
              <AuthenIcon className='icon' />
            </div>
            <div>Đã xác thực bởi WORKNOW</div>
          </div>
          <div className='location-service'>
            <Tag text='Wifi miễn phí' />
            <Tag text='Đậu xe miễn phí' />
          </div>
        </div>
        <div>
          <div className='promotion'>50% giảm giá hôm nay</div>
          <div>
            <div className='old-price'>250,000Đ/H</div>
            <div className='new-price'>
              <span>Chỉ từ </span>125,000Đ/H
            </div>
            <button onClick={handleClick}>Xem chi tiết</button>
          </div>
        </div>
      </div>
    </div>
  );
}
