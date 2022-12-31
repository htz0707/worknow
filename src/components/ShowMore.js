import React from 'react';
import { useTranslation } from 'react-i18next';
import '../assets/styles/ShowMore.scss';
export default function ShowMore(props) {
  const { t } = useTranslation();
  const { show, setShow } = props;
  return (
    <div className='show-more' onClick={() => setShow(!show)}>
      {show ? t('collapse') : t('readmore')}
    </div>
  );
}
