import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsPlayCircle } from 'react-icons/bs';

import '../assets/styles/Business.scss';
import { Tabs } from 'antd';

import SignUpForm from '../components/SignFormForBusiness';
import ThreePeople from '../assets/images/three_people.svg';
import hex1 from '../assets/images/hex1.svg';
import hex2 from '../assets/images/hex2.svg';
import hex3 from '../assets/images/hex3.svg';
import hex4 from '../assets/images/hex4.svg';
import hex5 from '../assets/images/hex5.svg';
import circle1 from '../assets/images/smallcircle.svg';
import circle2 from '../assets/images/normalcircle.svg';
import circle3 from '../assets/images/largecircle.svg';

export default function Business() {
  let navigate = useNavigate();
  const handleClick = () => {
    navigate(`/business/register`);
  };
  const listener = (e) => {
    var body_location = document.getElementById('body_location');
    var sticky = body_location.offsetTop;
    if (window.pageYOffset > sticky - 80) {
      body_location.classList.add('sticky');
    } else {
      body_location.classList.remove('sticky');
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', listener);
    return () => {
      window.removeEventListener('scroll', listener);
    };
  });
  return (
    <div className='business-register' >
      <div className='layout'>
        <section className='section-about'>
          <div className='container-md'>
            <div className='row'>
              <div className='col-5'>
                <div className='content'>
                  <h2>
                    TRỞ THÀNH KHÁCH HÀNG<br />DOANH NGHIỆP CỦA<br />WORKNOW VÀ TẬN HƯỞNG NHIỀU ƯU ĐÃI HƠN.
                  </h2>
                  <p className='description'>
                    Đăng Ký Với Chúng Tôi Để Nhận Ưu Đãi Ngay.
                  </p>
                  <button className='btn btn-warning fw-bold' onClick={handleClick}>
                    ĐĂNG KÝ KH DOANH NGHIỆP <BsPlayCircle className='ms-3 icon' fill='dark' size={25} />
                  </button>
                </div>
              </div>
              <div className='col-7 picture-group'>
                <img src={hex1} alt='hex-1' className='hex-1' />
                <img src={hex5} alt='hex-5' className='hex-5' />
                <img src={hex2} alt='hex-2' className='hex-2' />
                <img src={hex4} alt='hex-4' className='hex-4' />
                <img src={hex3} alt='hex-3' className='hex-3' />
                <img src={circle1} alt='circle1' className='circle-1' />
                <img src={circle2} alt='circle2' className='circle-2' />
                <img src={circle3} alt='cricle3' className='circle-3' />
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className='container-md'>
        <div className='row'>
          <div className='col-md-6'>
            <img src={ThreePeople} alt='three-peole' className='layout-2' />
          </div>
          <div className='col-md-6'>
            <div className='sign-up-block'>
              <h2>Trải Nghiệm Ngay!</h2>
              <div className='sign-up-form'>
                <Tabs
                  defaultActiveKey='1'
                  // onChange={onChange}
                  className='sign-up-tabs'
                  type='card'
                  items={[
                    {
                      label: 'Đăng Ký Miễn Phí',
                      key: '1',
                      children: <SignUpForm free={true} />,
                    }
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </div >
    </div >
  );
}
