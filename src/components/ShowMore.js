import React from 'react';
import '../assets/styles/ShowMore.scss';
export default function ShowMore(props) {
  const { show, setShow } = props;
  return (
    <div className='show-more' onClick={() => setShow(!show)}>
      {show ? 'Rút gọn' : 'Xem thêm'}
    </div>
  );
}
