import React from 'react';
import '../assets/styles/ReviewCard.scss';
import { ReactComponent as StarIcon } from '../assets/icons/start.svg';
import { ReactComponent as DeskIcon } from '../assets/icons/desk.svg';
import Avatar from '../assets/images/default_avatar.png';
import Dotdotdot from 'react-dotdotdot';

export default function ReviewCard() {
  return (
    <div className='review-card'>
      <div className='review-info'>
        <div className='star-rate'>
          <StarIcon className='icon' /> <span className='value'>4.5</span>
        </div>
        <Dotdotdot clamp={4}>
          <p className='note'>
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Velit officia consequat duis enim velit mollit. Exercitation
            veniam consequat sunt nostrud amet. Amet minim mollit non deserunt
            ullamco est sit aliqua dolor do amet sint. Velit officia consequat
            duis enim velit mollit. Exercitation veniam consequat sunt nostrud
            amet.
          </p>
        </Dotdotdot>
      </div>
      <div className='customer-info'>
        <div className='avatar'>
          <img className='avatar-image' src={Avatar} alt='avatar' />
        </div>
        <div className='info'>
          <div className='customer-name'>Steve Harvey</div>
          <div className='location-name'>
            <DeskIcon className='icon' /> Landmark 81
          </div>
        </div>
      </div>
    </div>
  );
}
