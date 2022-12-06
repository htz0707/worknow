import React from 'react';
import '../assets/styles/LocationCard.scss';
import { Carousel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Tag from './Tag';
import { ReactComponent as StarIcon } from '../assets/icons/start.svg';
import { ReactComponent as LocationIcon } from '../assets/icons/location.svg';
import { ReactComponent as BuildingIcon } from '../assets/icons/building.svg';
import { ReactComponent as AuthenIcon } from '../assets/icons/shield.svg';
import { renderAddress } from '../helpers/helpers';

export default function LocationCard(props) {
  const { data } = props;
  let navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/locations/${id}`);
  };
  return (
    <div className='location-card'>
      <div className='location-card_left'>
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
      <div className='location-card_right'>
        <div>
          <div className='location-name' onClick={() => handleClick(data.id)}>
            {data.name}
          </div>
          <div className='location-review'>
            <div>
              <StarIcon className='icon' />
              <StarIcon className='icon' />
              <StarIcon className='icon' />
              <StarIcon className='icon' />
              <StarIcon className='icon' />
            </div>
            {/* <span>+1200 lượt đặt</span> */}
          </div>
          <div className='location-address'>
            <div className='icon-badge'>
              <LocationIcon className='icon' />
            </div>
            <div>
              <div>{renderAddress(data)}</div>
              <div>Cách tôi 0,2km</div>
            </div>
          </div>
          <div className='location-type'>
            <div className='icon-badge'>
              <BuildingIcon className='icon' />
            </div>
            <div>Working space</div>
          </div>
          <div className='location-authen'>
            <div className='icon-badge'>
              <AuthenIcon className='icon' />
            </div>
            <div>Đã xác thực bởi WORKNOW</div>
          </div>
          <div className='location-service'>
            {data.amenities?.map((item, index) => {
              if (index < 3) {
                return <Tag text={item.name} key={index} />;
              }
            })}
          </div>
        </div>
        <div>
          <div className='d-flex mt-auto'>
            {/* <div className='old-price'>250,000Đ/H</div> */}
            <div className='new-price'>
              <span>Chỉ từ </span>125,000Đ/H
            </div>
            <button onClick={() => handleClick(data.id)}>Xem chi tiết</button>
          </div>
        </div>
      </div>
    </div>
  );
}
