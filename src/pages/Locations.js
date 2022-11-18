import React from 'react';
import '../assets/styles/Locations.scss';
import FilterLocation from '../components/FilterLocation';
import LocationCard from '../components/LocationCard';
import { useEffect } from 'react';
import { ReactComponent as SearchIcon } from '../assets/icons/search.svg';
import MapWrapper from '../components/MapWrapper';
import SortLocation from '../components/SortLocation';

export default function Locations() {
  return (
    <div className='locations'>
      <div className='locations_header page-container'>
        <div className='locations_header_content'>
          <div className='search-bar'>
            <SearchIcon />
            <input type='text' placeholder='Tìm kiếm địa điểm' />
          </div>
          <div className='calendar-bar'></div>
        </div>
      </div>
      <div className='locations_body page-container'>
        <div className='locations_body_left'>
          <div className='search-on-map'>
            <div>
              <MapWrapper />
            </div>
            <div>Xem trên bản đồ</div>
          </div>
          <FilterLocation />
        </div>
        <div className='locations_body_right'>
          <div className='header'>
            <div>
              <span className='fw-bold'>1.704 văn phòng làm việc</span> tại TP.
              Hồ Chí Minh
            </div>
            <SortLocation />
          </div>
          <div className='content'>
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
      {/* <div className='header'>
        <h5 className='title'>Địa điểm</h5>
        <div className='action'>
          <SelectCountryEngine />
        </div>
      </div> */}
      {/* <div id='body_location' className='body'>
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
      </div> */}
    </div>
  );
}
