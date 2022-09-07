import React from 'react';
import '../assets/styles/LocationDetails.scss';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { GrMapLocation } from 'react-icons/gr';
import { IoShareOutline } from 'react-icons/io5';
import Tag from '../components/Tag';
import ActionButton from '../components/ActionButton';
import Img1 from '../assets/images/location_img1.png';
import Img2 from '../assets/images/location_img2.jpg';
import Map from '../components/Map';
import SelectBookingType from '../components/SelectBookingType';
import LocationCard from '../components/LocationCard';

export default function LocationDetails() {
  const key = 'AIzaSyAB2XLp4egET-NJES-1OB1AApzuY6K7UoU';
  const showInMapClicked = (your_lat, your_lng) => {
    console.log('aaa');
    window.open('https://maps.google.com?q=' + your_lat + ',' + your_lng);
  };
  return (
    <div className='location-details container-md'>
      <div className='general'>
        <div className='row-1'>
          <MdKeyboardArrowLeft size={25} />
          Locations
        </div>
        <div className='row-2'>Changi Lounge</div>
        <div className='row-3'>Changi Airport Group</div>
        <div className='row-4'>
          <div className='d-flex'>
            <Tag text='Open on Wknds' />
            <Tag text='Late Hours' />
          </div>
          <div className='d-flex'>
            <ActionButton
              icon={<GrMapLocation className='me-2' />}
              text={'View on Map'}
              handleClick={() =>
                showInMapClicked(10.788159959003151, 106.70259701063593)
              }
            />
            <ActionButton
              icon={<IoShareOutline className='me-2' />}
              text={'Share'}
            />
          </div>
        </div>
        <div className='row-5'>
          <div className='location-images'>
            <div className='left'>
              <img src={Img1} />
            </div>
            <div className='right'>
              <div className='right-item'>
                <img src={Img2} />
              </div>
              <div className='right-item'>
                <img src={Img2} />
              </div>
            </div>
          </div>
          <div className='location-map'>
            <Map
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
            />
          </div>
        </div>
      </div>
      <div className='workspace'>
        <div className='header'>Workspaces</div>
        <div className='body'>
          <div className='left'>
            <SelectBookingType />
          </div>
          <div className='right'>
            <div className='header'></div>
            <div className='body'>
              <LocationCard />
              <LocationCard />
              <LocationCard />
              <LocationCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
