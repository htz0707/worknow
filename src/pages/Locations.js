import React from 'react';
import '../assets/styles/Locations.scss';
import SelectBookingType from '../components/SelectBookingType';
import SelectCountryEngine from '../components/SelectCountryEngine';
import FilterLocation from '../components/FilterLocation';
import LocationCard from '../components/LocationCard';
import { useEffect } from 'react';

export default function Locations() {
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
    <div className='locations container-md'>
      <div className='header'>
        <h5 className='title'>Locations</h5>
        <div className='action'>
          <SelectCountryEngine />
        </div>
      </div>
      <div id='body_location' className='body'>
        <div className='left'>
          <SelectBookingType />
        </div>
        <div className='right'>
          <div className='header'>
            <FilterLocation />
          </div>
          <div className='body'>
            <LocationCard />
            <LocationCard />
            <LocationCard />
            <LocationCard />
            <LocationCard />
            <LocationCard />
            <LocationCard />
            <LocationCard />
          </div>
        </div>
      </div>
    </div>
  );
}
