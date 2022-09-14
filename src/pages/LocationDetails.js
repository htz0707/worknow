import React, { useState } from 'react';
import '../assets/styles/LocationDetails.scss';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { GrMapLocation } from 'react-icons/gr';
import { IoShareOutline } from 'react-icons/io5';
import { GiExitDoor, GiMeal } from 'react-icons/gi';
import { HiOutlineWifi } from 'react-icons/hi';
import { BiPrinter, BiCar } from 'react-icons/bi';
import { MdOutlineAttachMoney } from 'react-icons/md';
import { TbCoffee, TbCup, TbParking } from 'react-icons/tb';
import { GiRoundTable } from 'react-icons/gi';
import { GrTrain } from 'react-icons/gr';
import { GoLocation } from 'react-icons/go';
import { AiOutlineRight } from 'react-icons/ai';
import Tag from '../components/Tag';
import ActionButton from '../components/ActionButton';
import Img1 from '../assets/images/location_img1.png';
import Img2 from '../assets/images/location_img2.jpg';
import SelectBookingType from '../components/SelectBookingType';
import { Accordion, Carousel } from 'react-bootstrap';
import MapWrapper from '../components/MapWrapper';
import WorkSpaceCard from '../components/WorkSpaceCard';
import SlideshowImage from '../components/SlideshowImage';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import ScrollspyNav from 'react-scrollspy-nav';
import ConfirmBookingModal from '../components/ConfirmBookingModal';

export default function LocationDetails() {
  //const key = 'AIzaSyAB2XLp4egET-NJES-1OB1AApzuY6K7UoU';
  let navigate = useNavigate();
  const showInMapClicked = (your_lat, your_lng) => {
    window.open('https://maps.google.com?q=' + your_lat + ',' + your_lng);
  };
  const [imageUrl, setImageUrl] = useState([Img1, Img2, Img1, Img2]);
  // const defaultProps = {
  //   center: {
  //     lat: 10.788159959003151,
  //     lng: 106.70259701063593,
  //   },
  //   zoom: 15,
  // };
  // const GOOGLE_MAP_DEFAULT_PROPS = {
  //   defaultCenter: {
  //     lat: 10.788159959003151,
  //     lng: 106.70259701063593,
  //   },
  //   defaultZoom: 15,
  //   bootstrapURLKeys: {
  //     libraries: 'drawing',
  //     key: 'AIzaSyDq38-QJCuQZk8-QoTeuLO-diT-HCPohCA',
  //   },
  // };
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
      (window.pageYOffset >= 600 && window.innerWidth > 768) ||
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
  const [showModal, setShowModal] = useState(false);
  const handleBooking = () => {
    setShowModal(true);
  };
  const handleConfirmBooking = () => {
    navigate('/create-booking/1');
  };
  return (
    <div className='location-details container-md'>
      <div className='general-responsive'>
        <div className='location-image'>
          <Carousel
            variant='light'
            className='carousel'
            interval={null}
            controls={false}
          >
            <Carousel.Item>
              <img alt='' src={Img1} />
            </Carousel.Item>
            <Carousel.Item>
              <img alt='' src={Img2} />
            </Carousel.Item>
          </Carousel>
          <div className='back-icon' onClick={handleGoback}>
            <MdKeyboardArrowLeft size={25} />
          </div>
          <div className='share-icon'>
            <IoShareOutline size={20} />
          </div>
        </div>
        <div className='location-name'>Circo Đông Du</div>
        <div className='location-company'>Công ty Circo</div>
        <div className='location-tags'>
          {/* <Tag text='Open on Wknds' />
          <Tag text='Late Hours' /> */}
        </div>
        <div className='location-address'>
          <div>
            <div>41 Đông Du, Bến Nghé, Quận 1, Tp.HCM</div>
            <div>{'>10km'}</div>
          </div>
          <div>
            <button
              onClick={() =>
                showInMapClicked(10.788159959003151, 106.70259701063593)
              }
            >
              <GoLocation />
            </button>
          </div>
        </div>
      </div>
      <div className='general'>
        <div className='row-1' onClick={handleGoback}>
          <MdKeyboardArrowLeft size={25} />
          Địa điểm
        </div>
        <div className='row-2'>Circo Đông Du</div>
        <div className='row-3'>Công ty Circo</div>
        <div className='row-4'>
          <div>
            <GoLocation /> 41 Đông Du, Bến Nghé, Quận 1, Tp.HCM
          </div>
          <div>
            <ActionButton
              icon={<GrMapLocation className='me-2' />}
              text={'Xem trên bản đồ'}
              handleClick={() =>
                showInMapClicked(10.788159959003151, 106.70259701063593)
              }
            />
            <ActionButton
              icon={<IoShareOutline className='me-2' />}
              text={'Chia sẻ'}
            />
          </div>
        </div>
        <div className='row-5'>
          {imageUrl.length >= 3 && (
            <div className='location-images three'>
              <div className='left'>
                <img alt='' src={imageUrl[0]} onClick={handleShowMoreImage} />
              </div>
              <div className='right'>
                <div className='right-item'>
                  <img alt='' src={imageUrl[1]} onClick={handleShowMoreImage} />
                </div>
                <div className='right-item'>
                  <img alt='' src={imageUrl[2]} onClick={handleShowMoreImage} />
                  {imageUrl.length > 3 && (
                    <div className='view-more' onClick={handleShowMoreImage}>
                      <button>Xem thêm</button>
                    </div>
                  )}
                </div>
              </div>
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
          <div className='location-map'>
            <div className='map'>
              {' '}
              <MapWrapper />
            </div>
            <div className='address'>
              <div>
                <span>41 Đông Du, Bến Nghé, Quận 1, Tp.HCM</span>
              </div>
              <button>Copy</button>
            </div>
            {/* <GoogleMapReact {...GOOGLE_MAP_DEFAULT_PROPS}></GoogleMapReact> */}
            {/* <Map
              googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${key}&v=3.exp&libraries=geometry,drawing,places`}
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={
                <div
                  style={{
                    height: `100%`,
                    width: '100%',
                  }}
                />
              }
              mapElement={<div style={{ height: `100%` }} />}
            /> */}
          </div>
        </div>
      </div>
      {/* <nav id='navbar-location-detail' className='navbar-custom navbar'>
        <ul className='nav nav-pills'>
          <li className='nav-item'>
            <a className='nav-link' href='#scrollspyHeading1'>
              Tổng quan
            </a>
          </li>
          <li className='nav-item'>
            <a className='nav-link' href='#scrollspyHeading2'>
              Không gian
            </a>
          </li>
          <li className='nav-item'>
            <a className='nav-link' href='#scrollspyHeading3'>
              Tiện nghi
            </a>
          </li>
          <li className='nav-item'>
            <a className='nav-link' href='#scrollspyHeading4'>
              Đánh giá
            </a>
          </li>
          <li className='nav-item'>
            <a className='nav-link' href='#scrollspyHeading5'>
              Hỗ trợ
            </a>
          </li>
        </ul>
      </nav> */}
      <ScrollspyNav
        scrollTargetIds={['section_1', 'section_2', 'section_3']}
        offset={-120}
        activeNavClass='active'
        scrollDuration='100'
        headerBackground='true'
      >
        <ul id='navbar-location-detail' className='navbar-custom'>
          <li className='nav-item'>
            <a href='#section_1'>Tổng quan</a>
          </li>
          <li className='nav-item'>
            <a href='#section_2'>Không gian làm việc</a>
          </li>
          <li className='nav-item'>
            <a href='#section_3'>Tiện nghi</a>
          </li>
          <li className='nav-item'>
            <a href='#section_4'>Đánh giá</a>
          </li>
          <li className='nav-item'>
            <a href='#section_5'>Hỗ trợ</a>
          </li>
        </ul>
      </ScrollspyNav>
      <div className='scrollspy-body' id='scrollspy-body'>
        <div className='about-location' id='section_1'>
          <div className='header'>Tổng quan về Circo Đông Du</div>
          <p>
            Tọa lạc tại trung tâm thành phố Hồ Chí Minh, trên con phố nhộn nhịp
            Đông Du, quận 1. Không gian làm việc chung của cirCO Đông Du được
            xem là giải pháp văn phòng chia sẻ lý tưởng và chuyên nghiệp cho
            không chỉ những freelancer đa dạng và sáng tạo mà còn doanh nghiệp
            tiềm năng. Tại vị trí đắc địa này - cách Phố đi bộ Nguyễn Huệ khoảng
            350m, gần nhiều trung tâm giải trí và nhà hàng nổi tiếng - cirCO
            Đông Du mang đến không gian rộng rãi và hiện đại. Với các giải pháp
            văn phòng riêng, bàn làm việc linh hoạt, phòng họp, phòng hội nghị
            và không gian tổ chức sự kiện. Không gian được thiết kế tỉ mỉ như
            một sự pha trộn thú vị giữa phong cách cổ điển và thiên nhiên, chủ
            yếu bao gồm vật liệu gỗ, hệ thống ánh sáng và các yếu tố tự nhiên.
            Sự kết hợp này tạo ra một cảm giác ấm cúng và đầy cảm hứng cho môi
            trường làm việc của doanh nghiệp. Liên hệ ngay để đặt chỗ trước và
            nhận khuyến mãi lớn từ cirCO.
          </p>
        </div>
        <div className='location-hours'>
          <div className='header'>Giờ làm việc</div>
          <div className='body'>
            <Accordion>
              <Accordion.Item eventKey='0'>
                <Accordion.Header>
                  <div className='accordion-header'>
                    <span>Hôm nay</span>
                    <span>9:00 AM - 9:00 PM</span>
                  </div>
                </Accordion.Header>
                <Accordion.Body>
                  <div className='accordion-body'>
                    <div>
                      <GiExitDoor size={25} />
                    </div>
                    <div className='info'>
                      <div>Giờ hoạt động</div>
                      <div>Mon - Sun, 9:00 AM to 9:00 PM</div>
                    </div>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>
        <div className='workspace' id='section_2'>
          <div className='header'>Không gian làm việc</div>
          <div className='body'>
            <div className='left'>
              <SelectBookingType />
            </div>
            <div className='right'>
              <div className='header'></div>
              <div className='body'>
                <WorkSpaceCard handleClick={handleBooking} />
                <WorkSpaceCard handleClick={handleBooking} />
                <WorkSpaceCard handleClick={handleBooking} />
                <WorkSpaceCard handleClick={handleBooking} />
              </div>
            </div>
          </div>
        </div>

        <div className='amenities' id='section_3'>
          <div className='header'>Tiện nghi</div>
          <div className='body'>
            <div className='amenity-item'>
              <div>
                <HiOutlineWifi size={25} />
              </div>
              <p>High Speed Wifi</p>
            </div>
            <div className='amenity-item'>
              <div>
                <BiPrinter size={25} />
              </div>
              <p>Printing Facilities</p>
              <div className='paid-service'>
                <MdOutlineAttachMoney size={20} />
              </div>
            </div>
            <div className='amenity-item'>
              <div>
                <TbCoffee size={25} />
              </div>
              <p>Coffee & Tea</p>
              <div className='paid-service'>
                <MdOutlineAttachMoney size={20} />
              </div>
            </div>
            <div className='amenity-item'>
              <div>
                <TbCoffee size={25} />
              </div>
              <p>Snack</p>
              <div className='paid-service'>
                <MdOutlineAttachMoney size={20} />
              </div>
            </div>
            <div className='amenity-item'>
              <div>
                <GiRoundTable size={25} />
              </div>
              <p>Meeting Room</p>
              <div className='paid-service'>
                <MdOutlineAttachMoney size={20} />
              </div>
            </div>
            <div className='amenity-item'>
              <div>
                <TbCup size={25} />
              </div>
              <p>Beverage</p>
              <div className='paid-service'>
                <MdOutlineAttachMoney size={20} />
              </div>
            </div>
            <div className='amenity-item'>
              <div>
                <GiMeal size={25} />
              </div>
              <p>Meal</p>
              <div className='paid-service'>
                <MdOutlineAttachMoney size={20} />
              </div>
            </div>
          </div>
        </div>
        {/* <div className='transportation'>
          <div className='header'>Làm thế nào để đến Circo Đông Du?</div>
          <div className='body'>
            <div className='transport-item'>
              <div className='icon'>
                <BiCar size={30} />
              </div>
              <div className='info'>
                <div>Car drop-off point</div>
                <div>Jewel Changi Airport L2 Drop-off</div>
              </div>
            </div>
            <div className='transport-item'>
              <div className='icon'>
                <GrTrain size={30} />
              </div>
              <div className='info'>
                <div>Nearest MRT station</div>
                <div>
                  Changi Airport Branch Line/Thomson-East Coast (Brown Line) -
                  Changi Airport
                </div>
              </div>
            </div>
            <div className='transport-item'>
              <div className='icon'>
                <GoLocation size={30} />
              </div>
              <div className='info'>
                <div>Front entrance of the location</div>
                <div>L1, Jewel Changi Airport (Near Lift Lobby E)</div>
              </div>
            </div>
          </div>
        </div>
        <div className='parking'>
          <div className='header'>Thông tin nơi đỗ xe</div>
          <div className='body'>
            <div className='parking-item'>
              <div className='icon'>
                <TbParking size={30} />
              </div>
              <div className='info'>
                <div>Jewel/Terminal 1 Carpark</div>
                <div>
                  Jewel/Terminal 1 Carpark, General Parking, Level B3 - B5
                </div>
              </div>
            </div>
          </div>
        </div> */}
        <div className='comment' id='section_4'>
          <div className='header'>Đánh giá</div>
          <div className='body'></div>
        </div>
        <div className='support' id='section_5'>
          <div className='header'>Hỗ trợ</div>
          <div className='body'>
            <div className='support-item'>
              <span>How to Check In</span> <AiOutlineRight />
            </div>
            <div className='support-item'>
              <span>How to Check Out</span> <AiOutlineRight />
            </div>
            <div className='support-item'>
              <span>Customer support</span> <AiOutlineRight />
            </div>
            <div className='support-item'>
              <span>House Rules</span> <AiOutlineRight />
            </div>
          </div>
        </div>
      </div>
      <ConfirmBookingModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleConfirm={handleConfirmBooking}
      />
      <SlideshowImage
        show={showMoreImage}
        handleClose={handleCloseShowMoreImage}
      />
    </div>
  );
}
