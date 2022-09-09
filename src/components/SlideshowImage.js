import React from 'react';
import '../assets/styles/SlideshowImage.scss';
import { Zoom } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import Img1 from '../assets/images/location_img1.png';
import Img2 from '../assets/images/location_img2.jpg';
import { Slide } from 'react-slideshow-image';
import { AiOutlineClose } from 'react-icons/ai';
export default function SlideshowImage(props) {
  const { show, handleClose } = props;
  const zoomOutProperties = {
    duration: 5000,
    transitionDuration: 500,
    autoplay: false,
    infinite: true,
    indicators: true,
    scale: 0.4,
    arrows: true,
  };
  const images = [
    Img1,
    Img2,
    Img1,
    Img2,
    Img1,
    'https://www.cgv.vn/media/catalog/product/cache/3/image/c5f0a1eff4c394a251036189ccddaacd/r/s/rsz_conan_movie_2022-_vnese_poster_1_.jpg',
  ];
  return (
    <>
      {show && (
        <div className='slideshow-image'>
          <div className='slide-header'>
            <button onClick={handleClose}>
              <AiOutlineClose />
            </button>
          </div>
          <div className='slide-container'>
            <Slide
              easing='ease'
              {...zoomOutProperties}
              indicators={(index) => (
                <div className='indicator'>
                  <img key={index} src={images[index]} />
                </div>
              )}
            >
              {images.map((slide, index) => {
                return (
                  <div className='each-slide-effect' key={index}>
                    <div>
                      {' '}
                      <img key={index} src={slide} />
                    </div>
                  </div>
                );
              })}
            </Slide>
          </div>
        </div>
      )}
    </>
  );
}
