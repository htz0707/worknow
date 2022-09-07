import React from 'react';
import '../assets/styles/ActionButton.scss';

export default function ActionButton(props) {
  const { icon, text, handleClick } = props;
  return (
    <button className='action-button' onClick={handleClick}>
      {icon} {text}
    </button>
  );
}
