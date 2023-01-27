import React from 'react';
import '../assets/styles/NoData.scss';
import { ReactComponent as NoDataIcon } from '../assets/icons/nodata.svg';
import { useTranslation } from 'react-i18next';

export default function NoData() {
  const { t } = useTranslation();
  return (
    <div className='no-data'>
      <NoDataIcon className='icon' />
      <div className='description'>{t('no_found_result')}</div>
    </div>
  );
}
