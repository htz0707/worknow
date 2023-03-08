import React from 'react';
import { ReactComponent as IconStar } from '../assets/icons/star_percentage.svg';
import '../assets/styles/Rating.scss';
const RatingRender = ({ value, max }) => {
  /* Calculate how much of the stars should be "filled" */
  const percentage = Math.round((value / max) * 100);

  return (
    <div className='rating-container'>
      {/* Create an array based on the max rating, render a star for each */}
      {Array.from(Array(max).keys()).map((_, i) => (
        <IconStar key={i} className='rating-star' />
      ))}
      {/* Render a div overlayed on top of the stars that should not be not filled */}
      <div className='overlay' style={{ width: `${100 - percentage}%` }} />
    </div>
  );
};
export default function Rating(props) {
  const { value, max } = props;
  return (
    <div className='rating'>
      <RatingRender value={value} max={max || 5} />
    </div>
  );
}
