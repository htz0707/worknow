import React from 'react';
import '../assets/styles/NoData.scss';
import { ReactComponent as NoDataIcon } from '../assets/icons/nodata.svg';

export default function NoData() {
  return (
    <div className='no-data'>
      <NoDataIcon className='icon' />
      <div className='description'>Không tìm thấy kết quả</div>
    </div>
  );
}
