import React from 'react';
import '../assets/styles/LocationCard.scss';
import { Carousel } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Tag from './Tag';
import { ReactComponent as StarIcon } from '../assets/icons/star_percentage.svg';
import { ReactComponent as LocationIcon } from '../assets/icons/location.svg';
import { ReactComponent as BuildingIcon } from '../assets/icons/building.svg';
import { ReactComponent as AuthenIcon } from '../assets/icons/shield.svg';
import Empty from '../assets/images/empty.svg';
import { formatCurrency, renderAddress } from '../helpers/helpers';
import { useTranslation } from 'react-i18next';
import Rating from './Rating';

export default function LocationCard(props) {
  const { t } = useTranslation();
  const { data } = props;
  let navigate = useNavigate();
  const handleClick = (id) => {
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
    <div className='location-card'>
      <div className='location-card_left'>
        <Carousel variant='light' className='carousel' interval={null}>
          {data.images?.map((item, index) => {
            return (
              <Carousel.Item key={index}>
                <img alt='' src={item.publicUrl} />
              </Carousel.Item>
            );
          })}
          {
            data.images.length === 0 &&
            <Carousel.Item>
              <img alt='' src={Empty} />
            </Carousel.Item>
          }
        </Carousel>
      </div>
      <div className='location-card_right'>
        <div>
          <Link className='location-name' to={`/locations/${data.id}`}>
            {data.name}
          </Link>
          <div className='location-review'>
            <span>{parseFloat(data?.locationRate)?.toFixed(1)}</span>{' '}
            <Rating value={data?.locationRate} />{' '}
            {/* <div>
              <StarIcon className='icon' />
              <StarIcon className='icon' />
              <StarIcon className='icon' />
              <StarIcon className='icon' />
              <StarIcon className='icon' />
            </div> */}
            {/* <span>+1200 lượt đặt</span> */}
          </div>
          <div className='location-address'>
            <div className='icon-badge'>
              <LocationIcon className='icon' />
            </div>
            <div>
              <div className='text-address'>{renderAddress(data)}</div>
            </div>
          </div>
          <div className='location-type'>
            <div className='icon-badge'>
              <BuildingIcon className='icon' />
            </div>
            <div>{data?.category?.name}</div>
          </div>
          {data.isVerified && (
            <div className='location-authen'>
              <div className='icon-badge'>
                <AuthenIcon className='icon' />
              </div>
              <div>{t('verified_by_worknow')}</div>
            </div>
          )}
          <div className='location-service'>
            {data.amenities?.map((item, index) => {
              if (index < 3) {
                return <Tag text={item.name} key={index} />;
              }
            })}
          </div>
        </div>
        <div>
          <div className='price-section'>
            {/* <div className='old-price'>250,000Đ/H</div> */}
            <div className='new-price'>
              <span>{t('just_from')} </span>
              {returnLowestPrice(data.priceByHour, data.priceByDay)}
            </div>
            <button
              className='btn-primary'
              onClick={() => handleClick(data.id)}
            >
              {t('view_detail')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
