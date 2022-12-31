import React from 'react';
import '../assets/styles/WorkSpaceCard.scss';
import Img1 from '../assets/images/location_img1.png';
import Tag from './Tag';
import TimeSlotView from './TimeSlotView';
import { Carousel } from 'react-bootstrap';
import {
  formatCurrency,
  renderHourOrDay,
  returnTypeOfBooking,
} from '../helpers/helpers';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as ThreeUserIcon } from '../assets/icons/three_user.svg';
import { ReactComponent as ClockIcon } from '../assets/icons/clock.svg';

export default function WorkSpaceCard(props) {
  const { data } = props;
  const handleClick = () => {
    props.handleClick();
  };
  let navigate = useNavigate();
  const handleGoToWorkingSpaceDetail = (location_id, working_space_id) => {
    navigate(`/locations/${location_id}/working-space/${working_space_id}`);
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
        <div
          className='name'
          onClick={() => handleGoToWorkingSpaceDetail(data.locationId, data.id)}
        >
          {data?.name}
        </div>
        <div className='description'>
          <div>{data.description}</div>
        </div>
        <div className='capacity'>
          <ThreeUserIcon className='icon' /> {data?.capacity?.name} Người
        </div>
        <div className='working-time'>
          <ClockIcon className='icon' /> {props.workingTime}
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
        {returnTypeOfBooking(data?.type) === 'hour' && (
          <div className='new-price'>
            {formatCurrency(data?.priceByHour)}/{renderHourOrDay(data?.type)}
          </div>
        )}
        {returnTypeOfBooking(data?.type) === 'day' && (
          <div className='new-price'>
            {formatCurrency(data?.priceByDay)}/{renderHourOrDay(data?.type)}
          </div>
        )}
        <button onClick={handleClick}>Đặt ngay</button>
      </div>
    </div>
  );
}
