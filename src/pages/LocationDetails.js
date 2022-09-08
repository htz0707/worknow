import React from 'react';
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
import LocationCard from '../components/LocationCard';
import { Accordion } from 'react-bootstrap';
import MapWrapper from '../components/MapWrapper';
import WorkSpaceCard from '../components/WorkSpaceCard';

export default function LocationDetails() {
  const key = 'AIzaSyAB2XLp4egET-NJES-1OB1AApzuY6K7UoU';
  const showInMapClicked = (your_lat, your_lng) => {
    console.log('aaa');
    window.open('https://maps.google.com?q=' + your_lat + ',' + your_lng);
  };
  const defaultProps = {
    center: {
      lat: 10.788159959003151,
      lng: 106.70259701063593,
    },
    zoom: 15,
  };
  const GOOGLE_MAP_DEFAULT_PROPS = {
    defaultCenter: {
      lat: 10.788159959003151,
      lng: 106.70259701063593,
    },
    defaultZoom: 15,
    bootstrapURLKeys: {
      libraries: 'drawing',
      key: 'AIzaSyDq38-QJCuQZk8-QoTeuLO-diT-HCPohCA',
    },
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
            <div className='map'>
              {' '}
              <MapWrapper />
            </div>
            <div className='address'>
              <div>
                <span>78 Airport Blvd., Singapore 819666</span>
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
      <div className='workspace'>
        <div className='header'>Workspaces</div>
        <div className='body'>
          <div className='left'>
            <SelectBookingType />
          </div>
          <div className='right'>
            <div className='header'></div>
            <div className='body'>
              <WorkSpaceCard />
              <WorkSpaceCard />
              <WorkSpaceCard />
              <WorkSpaceCard />
            </div>
          </div>
        </div>
      </div>
      <div className='location-hours'>
        <div className='header'>Location Hours</div>
        <div className='body'>
          <Accordion>
            <Accordion.Item eventKey='0'>
              <Accordion.Header>
                <div className='accordion-header'>
                  <span>Today</span>
                  <span>9:00 AM - 9:00 PM</span>
                </div>
              </Accordion.Header>
              <Accordion.Body>
                <div className='accordion-body'>
                  <div>
                    <GiExitDoor size={25} />
                  </div>
                  <div className='info'>
                    <div>Location Opening Hours</div>
                    <div>Mon - Sun, 9:00 AM to 9:00 PM</div>
                  </div>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
      <div className='amenities'>
        <div className='header'>Amenities</div>
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
      <div className='transportation'>
        <div className='header'>How to Get There</div>
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
        <div className='header'>Parking Info</div>
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
      </div>
      <div className='about-location'>
        <div className='header'>About This Location</div>
        <p className='body'>
          Changi Lounge provides an exclusive and comfortable environment where
          you can rest and relax – with Jewel’s range of exciting attractions
          and lifestyle offerings right at the doorstep for your exploration.
          For those looking for a tranquil environment to work or study, the
          lounge provides high-speed internet connectivity, ample charging and
          power points for devices as well as, meeting rooms with video
          conferencing facilities.
        </p>
      </div>
      <div className='support'>
        <div className='header'>Support</div>
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
  );
}
