import React from 'react';
import '../assets/styles/WorkSpaceCard.scss';
import Img1 from '../assets/images/location_img1.png';
import Tag from './Tag';
import TimeSlotView from './TimeSlotView';
import { Carousel } from 'react-bootstrap';
import { formatCurrency, returnTypeOfBooking } from '../helpers/helpers';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as ThreeUserIcon } from '../assets/icons/three_user.svg';
import { ReactComponent as ClockIcon } from '../assets/icons/clock.svg';
import { useTranslation } from 'react-i18next';

export default function WorkSpaceCard(props) {
  const { t } = useTranslation();
  const { data, isVerified } = props;
  const handleClick = () => {
    props.handleClick();
  };
  let navigate = useNavigate();
  const handleGoToWorkingSpaceDetail = (location_id, working_space_id) => {
    navigate(`/locations/${location_id}/working-space/${working_space_id}`);
  };
  const renderHourOrDay = (value) => {
    if (
      value === 'flexible_desk' ||
      value === 'fixed_desk' ||
      value === 'private_room'
    ) {
      return t('day');
    } else if (
      value === 'meeting_room' ||
      value === 'event' ||
      value === 'convience_room' ||
      value === 'booth'
    ) {
      return 'H';
    } else {
      return 'H';
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
          <ThreeUserIcon className='icon' /> {data?.capacity?.name}{' '}
          {t('person')}
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
        <button className='btn-primary' onClick={handleClick}>
          {isVerified ? t('book_now') : t('contact_now')}
        </button>
      </div>
    </div>
  );
}
