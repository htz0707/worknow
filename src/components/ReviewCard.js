import React from 'react';
import '../assets/styles/ReviewCard.scss';
import { ReactComponent as StarIcon } from '../assets/icons/start.svg';
import { ReactComponent as DeskIcon } from '../assets/icons/desk.svg';
import Avatar from '../assets/images/default_avatar.png';
import Dotdotdot from 'react-dotdotdot';

export default function ReviewCard(props) {
  const { data } = props;
  return (
    <div className='review-card'>
      <div className='review-info'>
        <div className='star-rate'>
          <StarIcon className='icon' />{' '}
          <span className='value'>{data?.avgRate}</span>
        </div>
        <Dotdotdot clamp={4}>
          <p className='note'>{data?.comment}</p>
        </Dotdotdot>
      </div>
      <div className='customer-info'>
        <div className='avatar'>
          <img
            className='avatar-image'
            src={data?.user?.avatar || Avatar}
            alt='avatar'
          />
        </div>
        <div className='info'>
          <div className='customer-name'>{data?.user?.fullname}</div>
          <div className='location-name'>
            <DeskIcon className='icon' /> {data?.workingSpaces?.locationName}
          </div>
        </div>
      </div>
    </div>
  );
}
