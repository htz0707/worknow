import React from 'react';
import '../assets/styles/LocationCard.scss';
import { Carousel } from 'react-bootstrap';
import Img1 from '../assets/images/location_img1.png';
import Img2 from '../assets/images/location_img2.jpg';
import { useNavigate } from 'react-router-dom';

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
            <img src={Img1} />
          </Carousel.Item>
          <Carousel.Item>
            <img src={Img2} />
          </Carousel.Item>
        </Carousel>
      </div>
      <div className='right'>
        <div>
          <div className='location-name' onClick={handleClick}>
            Changi Lounge
          </div>
          <div>{'> 10km'}</div>
        </div>
        <div>
          <div className='location-company'>Changi Airport Group</div>
          Many seats{' '}
        </div>
        <div>78 Airport Blvd</div>
        <div>
          <div className='location-feature'>Instant Booking</div>
          <div className='location-feature'>Open on Wknds</div>
          <div className='location-feature'>Late Hours</div>
        </div>
        <div>
          ${' '}
          <span className='location-price'>
            <span>7.80</span>/hr
          </span>
        </div>
      </div>
    </div>
  );
}
