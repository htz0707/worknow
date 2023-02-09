import React from 'react';
import '../assets/styles/WorkingSpaceDetails.scss';
import Bcrumb from '../components/Bcrumb';
import { ReactComponent as LocationIcon } from '../assets/icons/location.svg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ReactComponent as TickIcon } from '../assets/icons/tick.svg';
import { ReactComponent as ClockIcon } from '../assets/icons/clock.svg';
import { ReactComponent as AirIcon } from '../assets/icons/air.svg';
import { ReactComponent as BoardIcon } from '../assets/icons/board.svg';
import { ReactComponent as BookIcon } from '../assets/icons/book.svg';
import { ReactComponent as ElectricityIcon } from '../assets/icons/electricity.svg';
import { ReactComponent as CleanIcon } from '../assets/icons/clean.svg';
import { ReactComponent as MuteIcon } from '../assets/icons/mute.svg';
import { ReactComponent as WindowIcon } from '../assets/icons/window.svg';
import { ReactComponent as ConferenceIcon } from '../assets/icons/conference.svg';
import { ReactComponent as TvIcon } from '../assets/icons/tv.svg';
import { ReactComponent as NotesIcon } from '../assets/icons/notes.svg';
import { ReactComponent as OfficeSuppliesIcon } from '../assets/icons/office-supplies.svg';
import { ReactComponent as ProjectorBoardIcon } from '../assets/icons/projector-board.svg';
import { ReactComponent as OfficeChairIcon } from '../assets/icons/office-chair.svg';
import { ReactComponent as ProjectorsIcon } from '../assets/icons/projectors.svg';
import { ReactComponent as SecurityIcon } from '../assets/icons/security.svg';
import { ReactComponent as WaterIcon } from '../assets/icons/water.svg';
import { ReactComponent as WifiIcon } from '../assets/icons/wifi.svg';
import { ReactComponent as ThreeUserIcon } from '../assets/icons/three_user.svg';
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
  renderWorkingHour,
  returnTypeOfBooking,
} from '../helpers/helpers';
import ConfirmBookingModal from '../components/ConfirmBookingModal';
import { useTranslation } from 'react-i18next';
import WarningContactModal from '../components/WarningContactModal';

export default function WorkingSpaceDetails() {
  const { t } = useTranslation();
  const { location_id, working_space_id } = useParams();
  const GET_WORKING_SPACE_DETAILS = gql`
    query GetWorkingSpaceDetails(
      $location_id: UUID!
      $working_space_id: UUID!
    ) {
      location(id: $location_id) {
        id
        name
        isVerified
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
        worksHour {
          closeHour
          day
          openHour
        }
      }
      workingSpace(id: $working_space_id) {
        id
        name
        images {
          publicUrl
        }
        capacity {
          name
        }
        minHourBooking
        description
        priceByDay
        priceByHour
        type
        amenities {
          name
          id
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
  const amenities = [
    {
      id: '26989fe3-a02a-4e11-8970-27b2fa35fad8',
      name: t('personal_locker'),
      icon: <BookIcon />,
    },
    {
      id: 'eef072cc-b73c-40a8-8fe0-36d5d6c39024',
      name: t('projector'),
      icon: <ProjectorsIcon />,
    },
    {
      id: 'f41c821a-759c-4c28-b198-fe952cfa2adc',
      name: t('air_conditioner'),
      icon: <AirIcon />,
    },
    {
      id: 'fd4580ae-7fe1-4742-a762-4c0dcce3a15f',
      name: t('personal_locker_1'),
      icon: <BookIcon />,
    },
    {
      id: 'c0c37835-6661-4841-8f77-f33cc36cdfa3',
      name: t('spin_chair'),
      icon: <OfficeChairIcon />,
    },
    {
      id: '3f8f2381-17ac-48e2-86b7-71f3d027a476',
      name: t('white_board'),
      icon: <BoardIcon />,
    },
    {
      id: '298eb9f8-874c-42d3-9fa0-bd66623a2e58',
      name: t('personal_power_outlet'),
      icon: <ElectricityIcon />,
    },
    {
      id: '102d09c0-08e4-4454-a858-ec77a0bacf24',
      name: t('daily_clean'),
      icon: <CleanIcon />,
    },
    {
      id: 'e03adc7b-5bfc-40f1-9f70-ebdd0da6ed69',
      name: t('free_beverage'),
      icon: <WaterIcon />,
    },
    {
      id: 'ad54aa43-9fb1-4165-9424-d24738f30e21',
      name: t('high_speed_internet'),
      icon: <WifiIcon />,
    },
    {
      id: 'f333738a-85f0-4064-ad28-459f5ecf2584',
      name: t('soundprooding'),
      icon: <MuteIcon />,
    },
    {
      id: 'be34c93f-421f-4307-9469-e32afa1d71f8',
      name: t('24_7_security'),
      icon: <SecurityIcon />,
    },
    {
      id: '3b6464af-0bf2-40e3-8326-1b04183353ea',
      name: t('window'),
      icon: <WindowIcon />,
    },
    {
      id: '2665ba21-1563-4ae7-8e09-02a03a094037',
      name: t('teleconference'),
      icon: <ConferenceIcon />,
    },
    {
      id: '3be8472b-1a2a-4659-85c3-98a4e7538929',
      name: t('projector'),
      icon: <ProjectorsIcon />,
    },
    {
      id: '8747a5c5-025d-4618-b479-8f7fa72d8eef',
      name: t('tivi'),
      icon: <TvIcon />,
    },
    {
      id: 'bb741d17-64ef-4214-bae7-e4ca9bcdc378',
      name: t('white_board'),
      icon: <BoardIcon />,
    },
    {
      id: '54cf8fc4-b66a-40f1-b74b-77afe456c5e1',
      name: t('note_paper'),
      icon: <NotesIcon />,
    },
    {
      id: '6d33adda-b3de-442c-a1d9-cc6ae80f0270',
      name: t('stationery'),
      icon: <OfficeSuppliesIcon />,
    },
    {
      id: '5082303d-bdca-45bd-b564-06497088d9f3',
      name: t('screen_projector'),
      icon: <ProjectorBoardIcon />,
    },
  ];
  useEffect(() => {
    handleGetWorkingSpaceDetail();
  }, [location_id, working_space_id]);
  const [showModal, setShowModal] = useState(false);
  const handleBooking = (item) => {
    setShowModal(true);
  };
  const [showContactModal, setShowContactModal] = useState(false);
  const handleShowWarningContact = () => {
    setShowContactModal(true);
  };
  const renderHourOrDay = (value) => {
    if (
      value === 'flexible_desk' ||
      value === 'fixed_desk' ||
      value === 'private_room'
    ) {
      return t('day');
    } else if (
      value === 'meeting_room' ||
      value === 'event' ||
      value === 'convience_room' ||
      value === 'booth'
    ) {
      return 'H';
    } else {
      return 'H';
    }
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
          <div className='title'>{t('reserve')}</div>
          <div className='content'>
            <div className='content-info'>
              <div>{t('seat_info')}</div>
              {workingSpaceInfo?.description && (
                <div className='description'>
                  <TickIcon className='icon' /> {workingSpaceInfo?.description}
                </div>
              )}
              <div className='capacity'>
                <ThreeUserIcon className='icon' />
                {workingSpaceInfo?.capacity?.name} {t('person')}
              </div>
              <div className='working-hour'>
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
              <button
                className='btn-booking'
                onClick={() => {
                  if (locationInfo.isVerified) {
                    handleBooking();
                  } else {
                    handleShowWarningContact();
                  }
                }}
              >
                {locationInfo.isVerified ? t('book_now') : t('contact_now')}
              </button>
            </div>
          </div>
        </div>
        <div className='working-space-condition'>
          <div className='title'>{t('condition_booking')}</div>
          <ul className='listing'>
            <li>
              {t('minimum_booking_hour')}:{' '}
              {workingSpaceInfo?.minHourBooking || 1} tiếng
            </li>
            <li>{t('condition_booking_des_1')}</li>
            <li>{t('condition_booking_des_2')}</li>
            <li>{t('condition_booking_des_3')}</li>
          </ul>
        </div>
        <div className='working-space-amenity'>
          <div className='title'>{t('amenity')}</div>
          <div className='listing'>
            {workingSpaceInfo?.amenities?.map((item, index) => {
              return (
                <div className='item' key={index}>
                  {amenities.map(
                    (amenity) => item?.id === amenity.id && amenity.icon
                  )}
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
        worksHour={locationInfo?.worksHour}
      />
      <WarningContactModal
        show={showContactModal}
        selectedWorkingSpace={workingSpaceInfo}
        handleClose={() => setShowContactModal(false)}
      />
    </div>
  );
}
