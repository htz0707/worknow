import React from 'react';
import '../assets/styles/Marker.scss';
import { formatCurrency, renderAddress } from '../helpers/helpers';
import cx from 'classnames';
import { Carousel } from 'react-bootstrap';
import { ReactComponent as LocationIcon } from '../assets/icons/location.svg';
import { ReactComponent as BuildingIcon } from '../assets/icons/building.svg';
import { ReactComponent as AuthenIcon } from '../assets/icons/shield.svg';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Marker(props) {
  const { t } = useTranslation();
  const { data, activeLocation, setActiveLocation } = props;
  const handleClick = (item) => {
    console.log(item);
    setActiveLocation(item);
  };
  let navigate = useNavigate();
  const handleRedirect = (id) => {
    navigate(`/locations/${id}`);
  };
  const returnLowestPrice = (priceByHour, priceByDay) => {
    if (priceByHour && priceByDay) {
      if (priceByHour <= priceByDay) {
        let price = formatCurrency(priceByHour);
        return price + '/H';
      } else {
        let price = formatCurrency(priceByDay);
        return price + '/' + t('day');
      }
    } else {
      if (priceByHour) {
        let price = formatCurrency(priceByHour);
        return price + '/H';
      }
      if (priceByDay) {
        let price = formatCurrency(priceByDay);
        return price + '/' + t('day');
      }
    }
  };
  return (
    <div
      className={cx('marker', {
        active: data.id === activeLocation.id,
      })}
    >
      <div className='arrow'></div>
      <div
        className='card'
        id='style-1'
        onClick={() => handleClick(data)}
        tabIndex='0'
        onBlur={() => handleClick({})}
      >
        {data.id === activeLocation.id ? (
          <div className='card-body' onMouseDown={(e) => e.preventDefault()}>
            <div className='location-image'>
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
            <div
              className='location-name'
              onClick={() => handleRedirect(data.id)}
            >
              {data.name}
            </div>
            <div className='location-address'>
              <div className='icon-badge'>
                <LocationIcon className='icon' />
              </div>
              <div className='text-address'>{renderAddress(data)}</div>
            </div>
            <div className='location-type'>
              <div className='icon-badge'>
                <BuildingIcon className='icon' />
              </div>
              <div>Working space</div>
            </div>
            <div className='location-authen'>
              <div className='icon-badge'>
                <AuthenIcon className='icon' />
              </div>
              <div>{t('verified_by_worknow')}</div>
            </div>
            <div className='location-price'>
              {t('just_from')}
              <div className='price'>
                {returnLowestPrice(data.priceByHour, data.priceByDay)}
              </div>
            </div>
          </div>
        ) : (
          <div className='card-body'>
            {t('just_from')}
            <br />
            {returnLowestPrice(data.priceByHour, data.priceByDay)}
          </div>
        )}
      </div>
    </div>
  );
}
