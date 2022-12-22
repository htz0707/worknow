import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import '../assets/styles/Home.scss'

import { Button } from 'react-bootstrap';
import { BiPaperPlane } from 'react-icons/bi';
import { BsPlayCircle } from 'react-icons/bs';
import { ReactComponent as Reason1 } from '../assets/images/reason1.svg';
import { ReactComponent as Reason2 } from '../assets/images/reason2.svg';
import { ReactComponent as Reason3 } from '../assets/images/reason3.svg';
import { ReactComponent as Reason4 } from '../assets/images/reason4.svg';

import TwoPeople from '../assets/images/two_people.png';
import P1 from '../assets/icons/partner1.svg';
import P2 from '../assets/icons/partner2.svg';
import P3 from '../assets/icons/partner3.svg';
import P4 from '../assets/icons/partner4.svg';
import P5 from '../assets/icons/partner5.svg';
import hl1 from '../assets/images/highlight1.svg';
import hl2 from '../assets/images/highlight2.svg';
import hl3 from '../assets/images/highlight3.svg';
import hl4 from '../assets/images/highlight4.svg';

export default function NewBusiness() {
  let navigate = useNavigate();
  const handleClick = () => {
    navigate(`/locations`);
  };
  return (
    <div className='home'>
      <div className='layout'>
        <div className='container-md'>
          <section>
            <div className='row'>
              <div className='col-lg-5 d-flex justify-content-center align-items-center mb-4'>
                <div>
                  <h2 className='fw-bold'>
                    ĐẶT CHỖ LÀM VIỆC BẤT CỨ ĐÂU,
                    BẤT CỨ KHI NÀO BẠN CẦN.
                  </h2>
                  <p>
                  WorkNow là nền tảng tiên phong tại Việt Nam kết nối nhu cầu tìm kiếm không gian làm việc với mạng lưới địa điểm thuận tiện và nhiều loại hình không gian đa dạng.
                  </p>
                  {/* <button
                    onClick={handleClick}
                    className='btn btn-warning fw-bold rounded-pill d-flex justify-content-center'
                  >
                    TÌM HIỂU VỀ WORKNOW <BsPlayCircle className='ms-3 icon' fill='dark' size={25} />
                  </button> */}
                </div>
              </div>
              <div className='col-lg-7'>
                <img src={TwoPeople} className='w-100' alt='image' />
              </div>
            </div>
          </section>
        </div>
      </div>
      <div className='container-md'>
        <h3 className='d-flex justify-content-center align-items center pt-5 my-5 fw-bold'>TẠI SAO NÊN LÀ WORKNOW</h3>
        <div className='row'>
          <div className='col-lg-3'>
            <div className='d-flex justify-content-center align-items center'><Reason1 height={170} /></div>
            <h5 className='d-flex justify-content-center align-items center mt-3' >Cải thiện năng suất</h5>
            <p className='px-3 text-justify'>Tối ưu hóa hiệu suất công việc bằng cách khám phá không gian / môi trường tươi mới và sáng tạo cùng Worknow.</p>
          </div>
          <div className='col-lg-3'>
            <div className='d-flex justify-content-center align-items center'><Reason2 height={170} /></div>
            <h5 className='d-flex justify-content-center align-items center mt-3' >Đa dạng vị trí</h5>
            <p className='px-3 text-justify'>Không gian làm việc chung, Cao ốc văn phòng, Trung tâm mua sắm, Quán cà phê, Khách sạn,...</p>
          </div>
          <div className='col-lg-3'>
            <div className='d-flex justify-content-center align-items center'><Reason1 height={170} /></div>
            <h5 className='d-flex justify-content-center align-items center mt-3' >Cho mọi doanh nghiệp</h5>
            <p className='px-3 text-justify'>Giải pháp làm việc từ xa hoặc trực tiếp cho bất kỳ doanh nghiệp ở mọi lĩnh vực kinh doanh.</p>
          </div>
          <div className='col-lg-3'>
            <div className='d-flex justify-content-center align-items center'><Reason2 height={170} /></div>
            <h5 className='d-flex justify-content-center align-items center mt-3' >Tiết kiệm chi phí</h5>
            <p className='px-3 text-justify'>Chi phí phải chăng và phù hợp, bạn sẽ chỉ thanh toán cho những tiện ích mà mình sử dụng.</p>
          </div>
        </div>
      </div>
      <div className='container-md'>
        <div className='row mb-3'>
          <h3 className='pt-5 my-5 fw-bold'>LOẠI HÌNH NỔI BẬT</h3>
          <div className='col-lg-6'>
            <div className='d-flex'>
              <div className='card-hl'>
                <h4 className='text-bottom-1 fw-bold'>BOOTH CÁ NHÂN</h4>
                <p className='text-bottom-2'>Booth riêng có 1 chỗ đến 4 chỗ.</p>
                <Button onClick={handleClick} className='btn-bottom rounded-pill' variant='secondary'>
                  Khám Phá {' '} <BiPaperPlane className='mx-2 mb-1' />
                </Button>
                <img src={hl4} alt='hl-4' className='w-100 image-hl' />
              </div>
            </div>
            <div className='d-flex'>
              <div className='card-hl card-down'>
                <h4 className='text-bottom-1 fw-bold'>GHẾ LINH HOẠT</h4>
                <p className='text-bottom-2'>Tìm bàn làm việc ở bất cứ đâu.</p>
                <Button onClick={handleClick} className='btn-bottom rounded-pill' variant='secondary'>
                  Khám Phá {' '} <BiPaperPlane className='mx-2 mb-1' />
                </Button>
                <img src={hl1} alt='hl-1' className='w-100 image-hl' />
              </div>
            </div>
          </div>
          <div className='col-lg-6 col-right'>
            <div className='d-flex'>
              <div className='card-hl'>
                <h4 className='text-bottom-1 fw-bold'>PHÒNG HỌP</h4>
                <p className='text-bottom-2'>Phòng riêng với tất cả các tiện nghi bạn cần.</p>
                <Button onClick={handleClick} className='btn-bottom rounded-pill' variant='secondary'>
                  Khám Phá {' '} <BiPaperPlane className='mx-2 mb-1' />
                </Button>
                <img src={hl2} alt='hl-2' className='w-100 image-hl' />
              </div>
            </div>
            <div className='d-flex'>
              <div className='card-hl card-down'>
                <h4 className='text-bottom-1 fw-bold'>SẢNH SỰ KIỆN</h4>
                <p className='text-bottom-2'>Tổ chức bài giảng, buổi họp mặt hoặc talkshow</p>
                <p className='text-bottom-3'><br />theo nhu cầu của bạn. </p>
                <Button onClick={handleClick} className='btn-bottom rounded-pill' variant='secondary'>
                  Khám Phá {' '} <BiPaperPlane className='mx-2 mb-1' />
                </Button>
                <img src={hl3} alt='hl-3' className='w-100 image-hl' />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className='container-md'>
        <h3 className='my-5 text-center'>ĐỐI TÁC CỦA CHÚNG TÔI</h3>
        <div className='mb-5 partner-group'>
          <div className='mb-5'>
            <img src={P1} alt='p1' className='image-partner' />
            <img src={P2} alt='P2' className='image-partner' />
            <img src={P3} alt='p1' className='image-partner' />
            <img src={P4} alt='p1' className='image-partner' />
            <img src={P5} alt='p1' className='image-partner image-last' />
          </div>
          <div className='mt-5'>
            <img src={P1} alt='p1' className='image-partner' />
            <img src={P2} alt='P2' className='image-partner' />
            <img src={P3} alt='p1' className='image-partner' />
            <img src={P4} alt='p1' className='image-partner' />
            <img src={P5} alt='p1' className='image-partner image-last' />
          </div>
        </div>
      </div> */}

    </div>
  );
}
