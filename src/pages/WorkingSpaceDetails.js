import React from 'react';
import '../assets/styles/WorkingSpaceDetails.scss';
import Bcrumb from '../components/Bcrumb';
import { ReactComponent as LocationIcon } from '../assets/icons/location.svg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ReactComponent as BuildingIcon } from '../assets/icons/building.svg';
import { ReactComponent as TickIcon } from '../assets/icons/tick.svg';
import { ReactComponent as ClockIcon } from '../assets/icons/clock.svg';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper';
import { useParams } from 'react-router-dom';
import { gql, useLazyQuery } from '@apollo/client';
import { useEffect } from 'react';
import { useState } from 'react';
import {
  formatCurrency,
  renderAddress,
  renderHourOrDay,
  renderWorkingHour,
  returnTypeOfBooking,
} from '../helpers/helpers';
import ConfirmBookingModal from '../components/ConfirmBookingModal';

export default function WorkingSpaceDetails() {
  const { location_id, working_space_id } = useParams();
  const GET_WORKING_SPACE_DETAILS = gql`
    query GetWorkingSpaceDetails(
      $location_id: UUID!
      $working_space_id: UUID!
    ) {
      location(id: $location_id) {
        id
        name
        address
        ward {
          name
        }
        district {
          name
        }
        city {
          name
        }
        country {
          name
        }
        closeTime
        openTime
      }
      workingSpace(id: $working_space_id) {
        id
        name
        images {
          publicUrl
        }
        description
        priceByDay
        priceByHour
        type
        amenities {
          name
        }
      }
    }
  `;
  const [getWorkingSpaceDetails] = useLazyQuery(GET_WORKING_SPACE_DETAILS);
  const [locationInfo, setLocationInfo] = useState({});
  const [workingSpaceInfo, setWorkingSpaceInfo] = useState({});
  const handleGetWorkingSpaceDetail = async () => {
    if (location_id && working_space_id) {
      let res = await getWorkingSpaceDetails({
        variables: {
          location_id: location_id,
          working_space_id: working_space_id,
        },
      });
      if (res.data) {
        setLocationInfo(res.data.location);
        setWorkingSpaceInfo(res.data.workingSpace);
      }
    }
  };
  useEffect(() => {
    handleGetWorkingSpaceDetail();
  }, [location_id, working_space_id]);
  const [showModal, setShowModal] = useState(false);
  const handleBooking = (item) => {
    setShowModal(true);
  };
  return (
    <div className='working-space-details page-container'>
      <div className='working-space-details_header'>
        <Bcrumb
          data={[
            {
              label: locationInfo?.name,
              path: `/locations/${locationInfo?.id}`,
            },
            {
              label: workingSpaceInfo?.name,
              active: true,
            },
          ]}
        />
      </div>
      <div className='working-space-details_body'>
        <div className='working-space-name'>{workingSpaceInfo?.name}</div>
        <div className='working-space-address'>
          <LocationIcon className='icon' />
          <span className='text'>{renderAddress(locationInfo)}</span>
        </div>
        <div className='working-space-image'>
          <Swiper
            slidesPerView={4}
            spaceBetween={10}
            grabCursor={true}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            breakpoints={{
              '@0.00': {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              '@0.75': {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              '@1.00': {
                slidesPerView: 3,
                spaceBetween: 10,
              },
              '@1.50': {
                slidesPerView: 4,
                spaceBetween: 10,
              },
            }}
            modules={[Navigation]}
            className='mySwiper'
          >
            {workingSpaceInfo?.images?.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <img src={item.publicUrl} alt='' />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <div className='working-space-info'>
          <div className='title'>Đặt Chỗ</div>
          <div className='content'>
            <div className='content-info'>
              <div>Thông tin chỗ ngồi</div>
              {workingSpaceInfo?.description && (
                <div>
                  <TickIcon className='icon' /> {workingSpaceInfo?.description}
                </div>
              )}
              <div>
                <ClockIcon className='icon' />{' '}
                {renderWorkingHour(
                  locationInfo?.openTime,
                  locationInfo?.closeTime
                )}
              </div>
            </div>
            <div className='content-booking'>
              {returnTypeOfBooking(workingSpaceInfo?.type) === 'hour' && (
                <div className='price'>
                  {formatCurrency(workingSpaceInfo?.priceByHour)}/
                  {renderHourOrDay(workingSpaceInfo?.type)}
                </div>
              )}
              {returnTypeOfBooking(workingSpaceInfo?.type) === 'day' && (
                <div className='price'>
                  {formatCurrency(workingSpaceInfo?.priceByDay)}/
                  {renderHourOrDay(workingSpaceInfo?.type)}
                </div>
              )}
              <button className='btn-booking' onClick={handleBooking}>
                Đặt ngay
              </button>
            </div>
          </div>
        </div>
        <div className='working-space-condition'>
          <div className='title'>Điều Kiện Đặt Bàn</div>
          <ul className='listing'>
            <li>
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit officia consequat duis enim velit mollit.
              Exercitation veniam consequat sunt nostrud amet.{' '}
            </li>
            <li>
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit officia consequat duis enim velit mollit.
              Exercitation veniam consequat sunt nostrud amet.{' '}
            </li>
            <li>
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit officia consequat duis enim velit mollit.
              Exercitation veniam consequat sunt nostrud amet.{' '}
            </li>
            <li>
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit officia consequat duis enim velit mollit.
              Exercitation veniam consequat sunt nostrud amet.{' '}
            </li>
          </ul>
        </div>
        <div className='working-space-amenity'>
          <div className='title'>Tiện Nghi</div>
          <div className='listing'>
            {workingSpaceInfo?.amenities?.map((item, index) => {
              return (
                <div className='item' key={index}>
                  <BuildingIcon />
                  <div>{item?.name}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <ConfirmBookingModal
        show={showModal}
        locationId={location_id}
        selectedWorkingSpace={workingSpaceInfo}
        openTime={locationInfo?.openTime}
        closeTime={locationInfo?.closeTime}
        handleClose={() => setShowModal(false)}
      />
    </div>
  );
}
