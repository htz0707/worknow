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
import { ReactComponent as StarIcon } from '../assets/icons/start.svg';
import { ReactComponent as CheckIcon } from '../assets/icons/check.svg';
import { ReactComponent as QuoteIcon } from '../assets/icons/quote.svg';
import { Avatar, DatePicker } from 'antd';
import moment from 'moment';

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
  const [showModal, setShowModal] = useState(false);
  const handleBooking = () => {
    setShowModal(true);
  };
  const handleConfirmBooking = () => {
    navigate('/create-booking/1');
  };
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
        <div className='general page-container'>
          <div className='row-1' onClick={handleGoback}>
            <MdKeyboardArrowLeft size={25} />
            Địa điểm
          </div>
          <div className='row-2'>
            Circo Đông Du <span>+1200 lượt đặt</span>
          </div>
          <div className='row-3'>
            <div>
              <GoLocation /> 41 Đông Du, Bến Nghé, Quận 1, Tp.HCM. Cách tôi
              0.2km{' '}
              <span
                onClick={() =>
                  showInMapClicked(10.788159959003151, 106.70259701063593)
                }
              >
                xem trên bản đồ
              </span>
            </div>
            <div>
              <div>
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
              </div>
              <div>120 Đánh giá từ khách hàng</div>
            </div>
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
                        <button>Xem thêm</button>
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
              <div className='outstanding'>
                <div className='title'>Nổi Bật</div>
                <div className='content'>
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
                  <div className='show-more'>Xem thêm</div>
                </div>
              </div>
              <div className='amenity'>
                <div className='title'>Tiện Nghi</div>
                <div className='content'>
                  <div>
                    <CheckIcon className='icon' /> Wifi miễn phí
                  </div>
                  <div>
                    <CheckIcon className='icon' /> Ghế công thái học
                  </div>
                  <div>
                    <CheckIcon className='icon' /> Loa giải trí
                  </div>
                  <div>
                    <CheckIcon className='icon' /> Máy chiếu
                  </div>
                  <div className='show-more'>Xem thêm</div>
                </div>
              </div>
              <div className='service'>
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
              </div>
              <div className='policy'>
                Chính sách hủy đặt chỗ và hoàn tiền dựa trên chính sách của
                Circo. <span>Xem chính sách</span>
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
              <a href='#section_1'>Tổng quan</a>
            </li>
            <li className='nav-item'>
              <a href='#section_2'>Giờ làm việc</a>
            </li>
            <li className='nav-item'>
              <a href='#section_3'>Không gian làm việc</a>
            </li>
            <li className='nav-item'>
              <a href='#section_4'>Đánh giá</a>
            </li>
            <li className='nav-item'>
              <a href='#section_5'>Hỗ trợ</a>
            </li>
          </ul>
        </ScrollspyNav>
        <div className='scrollspy-body page-container' id='scrollspy-body'>
          <div className='about-location' id='section_1'>
            <div className='header'>Tổng quan về Circo Đông Du</div>
            <p className='body'>
              Tọa lạc tại trung tâm thành phố Hồ Chí Minh, trên con phố nhộn
              nhịp Đông Du, quận 1. Không gian làm việc chung của cirCO Đông Du
              được xem là giải pháp văn phòng chia sẻ lý tưởng và chuyên nghiệp
              cho không chỉ những freelancer đa dạng và sáng tạo mà còn doanh
              nghiệp tiềm năng. Tại vị trí đắc địa này - cách Phố đi bộ Nguyễn
              Huệ khoảng 350m, gần nhiều trung tâm giải trí và nhà hàng nổi
              tiếng - cirCO Đông Du mang đến không gian rộng rãi và hiện đại.
              Với các giải pháp văn phòng riêng, bàn làm việc linh hoạt, phòng
              họp, phòng hội nghị và không gian tổ chức sự kiện. Không gian được
              thiết kế tỉ mỉ như một sự pha trộn thú vị giữa phong cách cổ điển
              và thiên nhiên, chủ yếu bao gồm vật liệu gỗ, hệ thống ánh sáng và
              các yếu tố tự nhiên. Sự kết hợp này tạo ra một cảm giác ấm cúng và
              đầy cảm hứng cho môi trường làm việc của doanh nghiệp. Liên hệ
              ngay để đặt chỗ trước và nhận khuyến mãi lớn từ cirCO.
            </p>
          </div>
          <div className='location-hours' id='section_2'>
            <div className='header'>Giờ làm việc</div>
            <div className='body'>
              <div>Thứ hai, 31 Tháng 2, 2022</div>
              <div>
                <div className='time-box active'>
                  <div className='day'>Thứ Hai</div>
                  <div className='time-range'>
                    <div>Giờ hoạt động</div>
                    <div>09:00 - 17:00</div>
                  </div>
                </div>
                <div className='time-box'>
                  <div className='day'>Thứ Ba</div>
                  <div className='time-range'>
                    <div>Giờ hoạt động</div>
                    <div>09:00 - 17:00</div>
                  </div>
                </div>
                <div className='time-box'>
                  <div className='day'>Thứ Tư</div>
                  <div className='time-range'>
                    <div>Giờ hoạt động</div>
                    <div>09:00 - 17:00</div>
                  </div>
                </div>
                <div className='time-box'>
                  <div className='day'>Thứ Năm</div>
                  <div className='time-range'>
                    <div>Giờ hoạt động</div>
                    <div>09:00 - 17:00</div>
                  </div>
                </div>
                <div className='time-box'>
                  <div className='day'>Thứ Sáu</div>
                  <div className='time-range'>
                    <div>Giờ hoạt động</div>
                    <div>09:00 - 17:00</div>
                  </div>
                </div>

                <div className='time-box'>
                  <div className='day'>Thứ Bảy</div>
                  <div className='time-range'>
                    <div>Giờ hoạt động</div>
                    <div>09:00 - 17:00</div>
                  </div>
                </div>
                <div className='time-box'>
                  <div className='day'>Chủ nhật</div>
                  <div className='time-range'>
                    <div>Giờ hoạt động</div>
                    <div>09:00 - 17:00</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='workspace' id='section_3'>
            <div className='header'>Không gian làm việc</div>
            <div className='body'>
              <div className='left'>
                <SelectBookingType />
              </div>
              <div className='right'>
                <div className='header'>
                  <div className='date-picker-custom'>
                    <DatePicker
                      allowClear={false}
                      format={'YYYY-MM-DD'}
                      value={moment(date)}
                    />
                  </div>
                </div>
                <div className='body'>
                  <WorkSpaceCard handleClick={handleBooking} />
                  <WorkSpaceCard handleClick={handleBooking} />
                  <WorkSpaceCard handleClick={handleBooking} />
                  <WorkSpaceCard handleClick={handleBooking} />
                </div>
              </div>
            </div>
          </div>
          <div className='comment' id='section_4'>
            <div className='header'>Đánh giá</div>
            <div className='body scroll-bar-custom'>
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
            </div>
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
