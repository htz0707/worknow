import React, { useState } from 'react';
import '../assets/styles/LocationDetails.scss';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { IoShareOutline } from 'react-icons/io5';
import { GoLocation } from 'react-icons/go';
import { AiOutlineRight } from 'react-icons/ai';
import { Carousel } from 'react-bootstrap';
import WorkSpaceCard from '../components/WorkSpaceCard';
import SlideshowImage from '../components/SlideshowImage';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import ScrollspyNav from 'react-scrollspy-nav';
import ConfirmBookingModal from '../components/ConfirmBookingModal';
import { ReactComponent as StarIcon } from '../assets/icons/start.svg';
import { ReactComponent as CheckIcon } from '../assets/icons/check.svg';
import { ReactComponent as LocationIcon } from '../assets/icons/location.svg';
import { Avatar } from 'antd';
import moment from 'moment';
import Bcrumb from '../components/Bcrumb';
import { gql, useLazyQuery } from '@apollo/client';
import cx from 'classnames';
import 'moment/locale/vi'; // without this line it didn't work
import ShowMore from '../components/ShowMore';
import { renderAddress, renderWorkingHour } from '../helpers/helpers';
import { useTranslation } from 'react-i18next';
import WarningContactModal from '../components/WarningContactModal';
import Rating from '../components/Rating';
import ReviewCard from '../components/ReviewCard';
import ReviewListModal from '../components/ReviewListModal';

export default function LocationDetails() {
  const { t, i18n } = useTranslation();
  useEffect(() => {
    moment.locale(i18n.language);
  }, [i18n.language]);

  const { id } = useParams();
  let navigate = useNavigate();
  const showInMapClicked = (your_lat, your_lng) => {
    window.open('https://maps.google.com?q=' + your_lat + ',' + your_lng);
  };
  const [imageUrl, setImageUrl] = useState([]);
  const [showMoreImage, setShowMoreImage] = useState(false);
  const handleShowMoreImage = () => {
    setShowMoreImage(true);
  };
  const handleCloseShowMoreImage = () => {
    setShowMoreImage(false);
  };
  const handleGoback = () => {
    navigate(`/locations`);
  };
  const listener = (e) => {
    var navbar_location_detail = document.getElementById(
      'navbar-location-detail'
    );
    var scrollspy_body = document.getElementById('scrollspy-body');
    if (
      (window.pageYOffset >= 820 && window.innerWidth > 768) ||
      (window.pageYOffset >= 380 && window.innerWidth <= 768)
    ) {
      navbar_location_detail.classList.add('sticky');
      scrollspy_body.classList.add('sticky');
    } else {
      navbar_location_detail.classList.remove('sticky');
      scrollspy_body.classList.remove('sticky');
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', listener);
    return () => {
      window.removeEventListener('scroll', listener);
    };
  });
  //
  const [date, setDate] = useState('');
  const getDateDefault = () => {
    var current_date = new Date();
    var current_date_format = moment(current_date).format('YYYY-MM-DD');
    setDate(current_date_format);
    return current_date_format;
  };
  useEffect(() => {
    getDateDefault();
  }, []);
  //
  const GET_LOCATION_DETAILS = gql`
    query GetLocationDetails(
      $id: UUID!
      $limit: Int
      $page: Int
      $hasComment: Boolean
    ) {
      location(id: $id) {
        id
        name
        isVerified
        address
        city {
          name
        }
        country {
          name
        }
        district {
          name
        }
        images {
          publicUrl
        }
        lat
        long
        openTime
        ward {
          name
        }
        amenities {
          name
        }
        closeTime
        description
        worksHour {
          closeHour
          day
          openHour
        }
        highlight
        locationRate
      }
      workingSpaces(params: { locationId: $id }) {
        edges {
          id
          name
          description
          priceByDay
          priceByHour
          images {
            publicUrl
          }
          capacity {
            name
          }
          locationId
          status
          type
          amenities {
            name
          }
        }
      }
      feedbacks(
        params: {
          locationId: $id
          limit: $limit
          page: $page
          hasComment: $hasComment
        }
      ) {
        edges {
          amenitiesRate
          avgRate
          comment
          servicesRate
          user {
            fullname
            avatar
          }
          workingSpaces {
            locationName
            name
          }
        }
      }
    }
  `;
  const [getLocationDetails] = useLazyQuery(GET_LOCATION_DETAILS);
  const [locationInfo, setLocationInfo] = useState({});
  const [workingSpaces, setWorkingSpaces] = useState([]);
  const [typeWorkingSpace, setTypeWorkingSpace] = useState([]);
  const [selectedTypeWorkingSpace, setSelectedTypeWorkingSpace] = useState('');
  const [currentWorkingSpace, setCurrentWorkingSpace] = useState([]);
  const [feedbackList, setFeedbackList] = useState([]);
  const handleGetLocationDetails = async () => {
    if (id) {
      let res = await getLocationDetails({
        variables: {
          id: id,
          limit: 10,
          page: 1,
          hasComment: true,
        },
      });
      if (res.data) {
        setLocationInfo(res.data.location);
        if (res.data.location?.images?.length) {
          setImageUrl(res.data.location?.images?.map((item) => item.publicUrl));
        }
        setWorkingSpaces(res.data.workingSpaces.edges);
        setFeedbackList(res.data.feedbacks.edges);
      }
    }
  };
  const defaultType = [
    'flexible_desk',
    'fixed_desk',
    'private_room',
    'meeting_room',
    'convience_room',
    'event',
    'booth',
  ];
  const handleCreateTypeWorkingSpace = (data) => {
    let arr = [];
    data.forEach((item) => {
      if (!arr.includes(item.type)) {
        arr.push(item.type);
      }
    });
    if (arr.length) {
      let real_arr = [];
      defaultType.forEach((item) => {
        if (arr.includes(item)) {
          real_arr.push(item);
        }
      });
      setTypeWorkingSpace(real_arr);
      console.log(real_arr);
      let save_wspace_type = localStorage.getItem('selectedWspaceType');
      if (save_wspace_type) {
        let find = real_arr.find((item) => item === save_wspace_type);
        if (find) {
          handleSelectTypeWorkingSpace(find);
          return;
        }
      }
      handleSelectTypeWorkingSpace(real_arr[0]);
    } else {
      setTypeWorkingSpace([]);
      setCurrentWorkingSpace([]);
    }
  };
  const handleSelectTypeWorkingSpace = (value) => {
    localStorage.setItem('selectedWspaceType', value);
    setSelectedTypeWorkingSpace(value);
    let arr = workingSpaces.filter((item) => item.type === value);
    setCurrentWorkingSpace(arr);
  };
  useEffect(() => {
    handleGetLocationDetails();
  }, [id]);
  useEffect(() => {
    handleCreateTypeWorkingSpace(workingSpaces);
  }, [workingSpaces]);
  //
  const [showMoreAmenities, setShowMoreAmenities] = useState(false);
  //
  const dayArray = [
    {
      id: 1,
      name: t('monday'),
    },
    {
      id: 2,
      name: t('tuesday'),
    },
    {
      id: 3,
      name: t('wednesday'),
    },
    {
      id: 4,
      name: t('thursday'),
    },
    {
      id: 5,
      name: t('friday'),
    },
    {
      id: 6,
      name: t('saturday'),
    },
    {
      id: 0,
      name: t('sunday'),
    },
  ];
  // //
  // const GET_WORKING_SPACE = gql`
  //   query GetWorkingSpace($id: UUID!) {
  //     workingSpaces(params: {locationId: $id}) {
  //       edges {
  //         name
  //         price
  //         images {
  //           publicUrl
  //         }
  //         locationId
  //         status
  //       }
  //     }
  //   }
  // `;
  // const [getWorkingSpace] = useLazyQuery(GET_WORKING_SPACE);
  // const handleGetWorkingSpace = async () => {
  //   if (id) {
  //     let res = await getWorkingSpace({
  //       variables: {
  //         id: id,
  //       },
  //     });
  //     if (res.data) {
  //       console.log(res.data)

  //     }
  //   }
  // };
  // useEffect(() => {
  //   handleGetWorkingSpace();
  // }, [id]);
  const defineWorkingType = {
    flexible_desk: t('flexible_desk'),
    fixed_desk: t('fixed_desk'),
    private_room: t('private_room'),
    meeting_room: t('meeting_room'),
    event: t('event_hall'),
    convience_room: t('convience_room'),
    booth: t('phone_booth'),
  };
  const [selectedWorkingSpace, setSelectedWorkingSpace] = useState({});
  const [showModal, setShowModal] = useState(false);
  const handleBooking = (item) => {
    setSelectedWorkingSpace(item);
    setShowModal(true);
  };
  const [showContactModal, setShowContactModal] = useState(false);
  const handleShowWarningContact = (item) => {
    setSelectedWorkingSpace(item);
    setShowContactModal(true);
  };
  const handleConfirmBooking = () => {
    navigate(`/create-booking/${id}/${selectedWorkingSpace.id}`);
  };
  function replaceWithBr(haiku) {
    return haiku?.replace(/\n/g, '<br />');
  }
  const returnWorkingHour = () => {
    let day = moment().day();
    let working_hour = locationInfo?.worksHour?.find(
      (item) => item.day === day
    );
    if (working_hour?.openHour && working_hour?.closeHour) {
      return renderWorkingHour(working_hour?.openHour, working_hour?.closeHour);
    } else {
      return t('close_today');
    }
  };
  useEffect(() => {
    if (document.getElementById('location_hour_active')) {
      var leftPos = document.getElementById('location_hour_active').offsetLeft;
      document.getElementById('location_hours').scrollLeft = leftPos - 40;
    }
  }, [document.getElementById('location_hour_active')]);
  const handleOnClick = () => {
    if (navigator.share) {
      navigator
        .share({
          title: locationInfo?.name,
          url: window.location.href,
        })
        .then(() => {
          console.log('Successfully shared');
        })
        .catch((error) => {
          console.error('Something went wrong sharing', error);
        });
    }
  };
  //
  const [showFeedbacks, setShowFeedbacks] = useState(false);
  return (
    <div className='location-details'>
      <div className='location-details_header'></div>
      <div className='location-details_body '>
        <div className='general-responsive'>
          <div className='location-image'>
            <Carousel
              variant='light'
              className='carousel'
              interval={null}
              controls={false}
            >
              {imageUrl.map((item, index) => {
                return (
                  <Carousel.Item key={index}>
                    <img alt='' src={item} />
                  </Carousel.Item>
                );
              })}
            </Carousel>
            <div className='back-icon' onClick={handleGoback}>
              <MdKeyboardArrowLeft size={25} />
            </div>
            <div className='share-icon' onClick={handleOnClick}>
              <IoShareOutline size={20} />
            </div>
          </div>
          <div className='location-name'>{locationInfo?.name}</div>
          <div className='location-rating'>
            <span>{parseFloat(locationInfo?.locationRate)?.toFixed(1)}</span>{' '}
            <Rating value={locationInfo?.locationRate} />
          </div>
          <div className='location-tags'>
            {/* <Tag text='Open on Wknds' />
          <Tag text='Late Hours' /> */}
          </div>
          <div className='location-address'>
            <div>
              <div>{renderAddress(locationInfo)}</div>
            </div>
            <div>
              <div
                className='btn-location'
                onClick={() =>
                  showInMapClicked(locationInfo.lat, locationInfo.long)
                }
              >
                <LocationIcon />
              </div>
            </div>
          </div>
        </div>
        <div className='general page-container'>
          <div className='row-1'>
            <Bcrumb
              data={[
                {
                  label: t('location_list'),
                  path: '/locations',
                },
                {
                  label: t('office_info'),
                  active: true,
                },
              ]}
            />
          </div>
          <div className='row-2'>
            {locationInfo?.name} <span>+1200 {t('booking_amount')}</span>
          </div>
          <div className='row-3'>
            <div>
              <GoLocation /> {renderAddress(locationInfo)}.{' '}
              {/* <span className='distance'>{t('from_me')} 0.2km</span> */}
              <span
                className='view-on-map'
                onClick={() =>
                  showInMapClicked(locationInfo.lat, locationInfo.long)
                }
              >
                {t('view_on_map')}
              </span>
            </div>
            <div className='location-rating'>
              <span>{parseFloat(locationInfo?.locationRate)?.toFixed(1)}</span>{' '}
              <Rating value={locationInfo?.locationRate} />
            </div>
            {/* <div>
              <div>
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
              </div>
              <div>120 {t('comment_from_customer')}</div>
            </div> */}
          </div>
          <div className='row-4'>
            {imageUrl.length >= 3 && (
              <div className='location-images three'>
                <div className='top'>
                  <img alt='' src={imageUrl[0]} onClick={handleShowMoreImage} />
                </div>
                <div className='bottom'>
                  <div>
                    <img
                      alt=''
                      src={imageUrl[1]}
                      onClick={handleShowMoreImage}
                    />
                  </div>
                  <div>
                    <img
                      alt=''
                      src={imageUrl[2]}
                      onClick={handleShowMoreImage}
                    />
                    {imageUrl.length > 3 && (
                      <div className='view-more' onClick={handleShowMoreImage}>
                        <button>{t('read_more')}</button>
                      </div>
                    )}
                  </div>
                </div>
                {/* <div className='right'>
                  <div className='right-item'>
                    <img
                      alt=''
                      src={imageUrl[1]}
                      onClick={handleShowMoreImage}
                    />
                  </div>
                  <div className='right-item'>
                    <img
                      alt=''
                      src={imageUrl[2]}
                      onClick={handleShowMoreImage}
                    />
                    {imageUrl.length > 3 && (
                      <div className='view-more' onClick={handleShowMoreImage}>
                        <button>Xem thêm</button>
                      </div>
                    )}
                  </div>
                </div> */}
              </div>
            )}
            {imageUrl.length === 2 && (
              <div className='location-images two'>
                <div className='left'>
                  <img alt='' src={imageUrl[0]} onClick={handleShowMoreImage} />
                </div>
                <div className='right'>
                  <img alt='' src={imageUrl[1]} onClick={handleShowMoreImage} />
                </div>
              </div>
            )}
            {imageUrl.length === 1 && (
              <div className='location-images one'>
                <img alt='' src={imageUrl[0]} onClick={handleShowMoreImage} />
              </div>
            )}
            <div className='location-services'>
              {locationInfo?.highlight && (
                <div className='outstanding'>
                  <div className='title'>{t('outstanding')}</div>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: replaceWithBr(locationInfo?.highlight),
                    }}
                    className='content'
                  />
                  {/* <div className='content'>
                    {locationInfo?.highlight}
                    <div>
                    <CheckIcon className='icon' /> Hơn 1200 lượt đặt chỗ
                  </div>
                  <div>
                    <CheckIcon className='icon' /> Vị trí trung tâm
                  </div>
                  <div>
                    <CheckIcon className='icon' /> Thiết bị hiện đại
                  </div>
                  <div>
                    <CheckIcon className='icon' /> Môi trường yên tĩnh
                  </div>
                  <div className='show-more'>{t('read_more')}</div>
                  </div> */}
                </div>
              )}
              <div className='amenity'>
                <div className='title'>{t('amenity')}</div>
                <div className='content'>
                  {locationInfo?.amenities?.map((item, index) => {
                    if (showMoreAmenities) {
                      return (
                        <div key={index}>
                          <CheckIcon className='icon' /> {item?.name}
                        </div>
                      );
                    } else {
                      if (index < 10) {
                        return (
                          <div key={index}>
                            <CheckIcon className='icon' /> {item?.name}
                          </div>
                        );
                      }
                    }
                  })}
                  {locationInfo?.amenities?.length > 10 && (
                    <ShowMore
                      show={showMoreAmenities}
                      setShow={setShowMoreAmenities}
                    />
                  )}
                </div>
              </div>
              {/* <div className='service'>
                <div className='title'>Dịch vụ</div>
                <div className='content'>
                  <div>
                    <CheckIcon className='icon' /> Cà phê, trà chiều
                  </div>
                  <div>
                    <CheckIcon className='icon' /> Happy Hours
                  </div>
                  <div>
                    <CheckIcon className='icon' /> Chăm sóc thú cưng
                  </div>
                  <div>
                    <CheckIcon className='icon' /> Phòng tập tích hợp
                  </div>
                  <div className='show-more'>Xem thêm</div>
                </div>
              </div> */}
              <div className='policy'>
                {t('policy_booking_and_refund')} <span>{t('view_policy')}</span>
              </div>
            </div>
          </div>
        </div>
        <ScrollspyNav
          scrollTargetIds={[
            'section_1',
            'section_2',
            'section_3',
            'section_4',
            'section_5',
          ]}
          offset={-150}
          activeNavClass='active'
          scrollDuration='100'
          headerBackground='true'
        >
          <ul
            id='navbar-location-detail'
            className='navbar-custom page-container'
          >
            <li className='nav-item'>
              <a href='#section_1'>{t('overview')}</a>
            </li>
            <li className='nav-item'>
              <a href='#section_2'>{t('working_hour')}</a>
            </li>
            <li className='nav-item'>
              <a href='#section_3'>{t('working_space')}</a>
            </li>
            <li className='nav-item'>
              <a href='#section_4'>{t('evaluation')}</a>
            </li>
            <li className='nav-item'>
              <a href='#section_5'>{t('support')}</a>
            </li>
          </ul>
        </ScrollspyNav>
        <div className='scrollspy-body page-container' id='scrollspy-body'>
          <div className='about-location' id='section_1'>
            <div className='header'>
              {t('overview_about')} {locationInfo?.name}
            </div>
            <p
              dangerouslySetInnerHTML={{
                __html: replaceWithBr(locationInfo?.description),
              }}
              className='body'
            />
          </div>
          <div className='location-hours' id='section_2'>
            <div className='header'>{t('working_hour')} </div>
            <div className='body'>
              <div>
                {t('today')}:{' '}
                <span className='today-text'>
                  {moment().format('dddd, LL')}
                </span>
              </div>
              <div id='location_hours'>
                {locationInfo.worksHour &&
                  dayArray.map((item, index) => {
                    return (
                      <div
                        className={cx('time-box', {
                          active: item.id == moment().day(),
                          close: !locationInfo?.worksHour[index]?.openHour,
                        })}
                        key={index}
                        id={
                          item.id == moment().day()
                            ? 'location_hour_active'
                            : 'location_hour_inactive'
                        }
                      >
                        <div className='day'>{item.name}</div>
                        <div className='time-range'>
                          <div>{t('operation_hour')}</div>
                          <div>
                            {locationInfo?.worksHour[index]?.openHour ? (
                              renderWorkingHour(
                                locationInfo?.worksHour[index]?.openHour,
                                locationInfo?.worksHour[index]?.closeHour
                              )
                            ) : (
                              <>Đóng cửa</>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          <div className='workspace' id='section_3'>
            <div className='header'>{t('working_space')}</div>
            <div className='body'>
              <div className='left'>
                <div className='filter-workspace'>
                  {typeWorkingSpace.map((item, index) => {
                    return (
                      <div
                        className={cx('filter-workspace_item', {
                          active: item === selectedTypeWorkingSpace,
                        })}
                        key={index}
                        onClick={() => handleSelectTypeWorkingSpace(item)}
                      >
                        {defineWorkingType[item]}
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className='right'>
                {/* <div className='header'>
                  <div className='date-picker-custom'>
                    <DatePicker
                      allowClear={false}
                      format={'YYYY-MM-DD'}
                      value={moment(date)}
                    />
                  </div>
                </div> */}
                <div className='body'>
                  {currentWorkingSpace.map((item, index) => {
                    return (
                      <WorkSpaceCard
                        data={item}
                        workingTime={returnWorkingHour()}
                        isVerified={locationInfo?.isVerified}
                        handleClick={() => {
                          if (locationInfo.isVerified) {
                            handleBooking(item);
                          } else {
                            handleShowWarningContact(item);
                          }
                        }}
                        key={index}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          {feedbackList.length > 0 && (
            <div className='comment' id='section_4'>
              <div className='d-flex justify-content-between align-items-center'>
                <div className='header'>Đánh giá</div>
                <div
                  className='view-all'
                  onClick={() => setShowFeedbacks(true)}
                >
                  Đọc tất cả đánh giá
                </div>
              </div>
              <div className='body scroll-bar-custom'>
                {feedbackList.map((item, index) => {
                  return <ReviewCard index={index} data={item} />;
                })}
                {/* <div className='comment-card'>
                <Avatar
                  size={60}
                  src='https://cdn.popsww.com/blog/sites/2/2022/02/Edogawa-Conan-.jpg'
                  className='avatar'
                />
                <div className='content'>
                  <div className='customer-name'>Steve Harvey</div>
                  <div className='rating'>
                    <span>Bàn làm việc 1</span>
                    <span>
                      <StarIcon className='icon' /> 4.8
                    </span>
                  </div>
                  <p className='review'>
                    Amet minim mollit non deserunt ullamco est sit aliqua dolor
                    do amet sint. Velit officia consequat duis enim velit
                    mollit. Exercitation veniam consequat sunt nostrud amet.
                  </p>
                </div>
                <QuoteIcon className='quote-icon-open' />
                <QuoteIcon className='quote-icon-close' />
              </div>
              <div className='comment-card'>
                <Avatar
                  size={60}
                  src='https://cdn.popsww.com/blog/sites/2/2022/02/Edogawa-Conan-.jpg'
                  className='avatar'
                />
                <div className='content'>
                  <div className='customer-name'>Steve Harvey</div>
                  <div className='rating'>
                    <span>Bàn làm việc 1</span>
                    <span>
                      <StarIcon className='icon' /> 4.8
                    </span>
                  </div>
                  <p className='review'>
                    Amet minim mollit non deserunt ullamco est sit aliqua dolor
                    do amet sint. Velit officia consequat duis enim velit
                    mollit. Exercitation veniam consequat sunt nostrud amet.
                  </p>
                </div>
                <QuoteIcon className='quote-icon-open' />
                <QuoteIcon className='quote-icon-close' />
              </div>
              <div className='comment-card'>
                <Avatar
                  size={60}
                  src='https://cdn.popsww.com/blog/sites/2/2022/02/Edogawa-Conan-.jpg'
                  className='avatar'
                />
                <div className='content'>
                  <div className='customer-name'>Steve Harvey</div>
                  <div className='rating'>
                    <span>Bàn làm việc 1</span>
                    <span>
                      <StarIcon className='icon' /> 4.8
                    </span>
                  </div>
                  <p className='review'>
                    Amet minim mollit non deserunt ullamco est sit aliqua dolor
                    do amet sint. Velit officia consequat duis enim velit
                    mollit. Exercitation veniam consequat sunt nostrud amet.
                  </p>
                </div>
                <QuoteIcon className='quote-icon-open' />
                <QuoteIcon className='quote-icon-close' />
              </div> */}
              </div>
            </div>
          )}
          <div className='support' id='section_5'>
            <div className='header'>{t('support')}</div>
            <div className='body'>
              <div
                className='support-item'
                onClick={() => {
                  navigate('/faq');
                }}
              >
                <span>{t('how_to_checkin_checkout')}</span>
                <AiOutlineRight />
              </div>
              <div
                className='support-item'
                onClick={() => {
                  navigate('/contact');
                }}
              >
                <span>{t('contact_support')}</span>
                <AiOutlineRight />
              </div>
            </div>
          </div>
        </div>
      </div>
      <ConfirmBookingModal
        show={showModal}
        locationId={id}
        selectedWorkingSpace={selectedWorkingSpace}
        openTime={locationInfo?.openTime}
        closeTime={locationInfo?.closeTime}
        handleClose={() => setShowModal(false)}
        worksHour={locationInfo?.worksHour}
      />
      <WarningContactModal
        show={showContactModal}
        selectedWorkingSpace={selectedWorkingSpace}
        handleClose={() => setShowContactModal(false)}
      />
      <SlideshowImage
        show={showMoreImage}
        handleClose={handleCloseShowMoreImage}
        images={imageUrl}
      />
      <ReviewListModal
        show={showFeedbacks}
        handleClose={() => setShowFeedbacks(false)}
        locationId={id}
      />
    </div>
  );
}
