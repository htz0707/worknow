import React from 'react';
import { Container, Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import '../assets/styles/Topbar.scss';
import '../assets/styles/BusinessRegister.scss'
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { Tabs } from 'antd';
import SignUpForm from '../components/SignUpForm';
import i18n from '../translation/i18n';
import ThreePeople from '../assets/images/three_people.svg';
import hex1 from '../assets/images/hex1.svg';
import hex2 from '../assets/images/hex2.svg';
import hex3 from '../assets/images/hex3.svg';
import hex4 from '../assets/images/hex4.svg';
import hex5 from '../assets/images/hex5.svg';
import circle1 from '../assets/images/smallcircle.svg';
import circle2 from '../assets/images/normalcircle.svg';
import circle3 from '../assets/images/largecircle.svg';
import { useNavigate } from 'react-router-dom';

import { BsPlayCircle } from 'react-icons/bs';

export default function BusinessRegister() {
  let navigate = useNavigate();
  const handleClick = () => {
    navigate(`/business`);
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
              <div className='col-lg-5'>
                <div className='content'>
                  <h2>
                    SIGN UP A BUSINESS ACCOUNT AND GET UP TO $450 TODAY!
                  </h2>
                  <p className='description'>
                    Happy Employees At A Discount! Sign Up For Switch For Business Today And Get Vouchers Worth Up To $450!
                  </p>
                  <button className='btn btn-warning fw-bold' onClick={handleClick}>
                    TÌM HIỂU VỀ WORKNOW <BsPlayCircle className='ms-3 icon' fill='dark' size={25} />
                  </button>
                </div>
              </div>
              <div className='col-lg-7 picture-group'>
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
              <h2>Ready to get started?</h2>
              <div className='sign-up-form'>
                <Tabs
                  defaultActiveKey='1'
                  // onChange={onChange}
                  className='sign-up-tabs'
                  type='card'
                  items={[
                    {
                      label: 'Sign Up For Free',
                      key: '1',
                      children: <SignUpForm free={true} />,
                    },
                    {
                      label: 'Get In Touch',
                      key: '2',
                      children: <SignUpForm free={false} />,
                    }
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </div >
      {/* <div>abcd</div> */}
    </div >
  );
}
