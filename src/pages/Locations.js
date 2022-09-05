import React from 'react';
import '../assets/styles/Locations.scss';
import SelectBookingType from '../components/SelectBookingType';
import SelectCountryEngine from '../components/SelectCountryEngine';
import FilterLocation from '../components/FilterLocation';
import LocationCard from '../components/LocationCard';

export default function Locations() {
  return (
    <div className='locations container-md'>
      <div className='header'>
        <h5 className='title'>Locations</h5>
        <div className='action'>
          <SelectCountryEngine />
        </div>
      </div>
      <div className='body'>
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
          </div>
        </div>
      </div>
    </div>
  );
}
