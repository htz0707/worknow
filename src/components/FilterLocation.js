import React, { useState } from 'react';
import '../assets/styles/FilterLocation.scss';
import { IoLocationOutline } from 'react-icons/io5';
import { Dropdown, Button } from 'react-bootstrap';

export default function FilterLocation(props) {
  const [sort, setSort] = useState('Nearest Location');
  const handleSelectSort = (value) => {
    setSort(value);
  };
  const [showDistance, setShowDistance] = useState(false);
  const [distance, setDistance] = useState(null);
  const [selectedDistance, setSelectedDistance] = useState(null);
  const handleSelectDistance = (value) => {
    setSelectedDistance(value);
  };
  const handleClearDistance = () => {
    console.log('abced');
    setSelectedDistance(null);
  };
  const handleApplyDistance = () => {
    setShowDistance(false);
    console.log('aaa');
    setDistance(selectedDistance);
  };
  return (
    <div className='filter-location'>
      <div className='select-sort'>
        <Dropdown className='dropdown'>
          <Dropdown.Toggle id='dropdown-basic'>Sort: {sort}</Dropdown.Toggle>
          <Dropdown.Menu className='dropdown-menu'>
            <Dropdown.Item
              className={
                sort === 'Alphabetical'
                  ? 'dropdown-item active'
                  : 'dropdown-item'
              }
              onClick={() => handleSelectSort('Alphabetical')}
            >
              Alphabetical
            </Dropdown.Item>
            <Dropdown.Item
              className={
                sort === 'Nearest Location'
                  ? 'dropdown-item active'
                  : 'dropdown-item'
              }
              onClick={() => handleSelectSort('Nearest Location')}
            >
              Nearest Location
            </Dropdown.Item>
            <Dropdown.Item
              className={
                sort === 'Many Seats First'
                  ? 'dropdown-item active'
                  : 'dropdown-item'
              }
              onClick={() => handleSelectSort('Many Seats First')}
            >
              Many Seats First
            </Dropdown.Item>
            <Dropdown.Item
              className={
                sort === 'Lowest Price First'
                  ? 'dropdown-item active'
                  : 'dropdown-item'
              }
              onClick={() => handleSelectSort('Lowest Price First')}
            >
              Lowest Price First
            </Dropdown.Item>
            <Dropdown.Item
              className={
                sort === 'Highest Price First'
                  ? 'dropdown-item active'
                  : 'dropdown-item'
              }
              onClick={() => handleSelectSort('Highest Price First')}
            >
              Highest Price First
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className='select-distance'>
        <Dropdown
          className={distance !== null ? 'dropdown active' : 'dropdown'}
          show={showDistance}
          onBlur={() => setShowDistance(false)}
        >
          <Dropdown.Toggle
            id='dropdown-basic'
            onClick={() => setShowDistance(true)}
          >
            {distance || 'Distance'}
          </Dropdown.Toggle>
          <Dropdown.Menu
            className='dropdown-menu'
            onMouseDown={(e) => e.preventDefault()}
          >
            <Dropdown.Item
              className={
                selectedDistance === '<500 m(~ 7 min walk)'
                  ? 'dropdown-item active'
                  : 'dropdown-item'
              }
              onClick={() => handleSelectDistance('<500 m(~ 7 min walk)')}
            >
              {'<500 m(~ 7 min walk)'}
            </Dropdown.Item>
            <Dropdown.Item
              className={
                selectedDistance === '<1 km(~ 13 min walk)'
                  ? 'dropdown-item active'
                  : 'dropdown-item'
              }
              onClick={() => handleSelectDistance('<1 km(~ 13 min walk)')}
            >
              {'<1 km(~ 13 min walk)'}
            </Dropdown.Item>
            <Dropdown.Item
              className={
                selectedDistance === '<2 km(~ 18 min walk)'
                  ? 'dropdown-item active'
                  : 'dropdown-item'
              }
              onClick={() => handleSelectDistance('<2 km(~ 18 min walk)')}
            >
              {'<2 km(~ 18 min walk)'}
            </Dropdown.Item>
            <div className='dropdown-item-footer'>
              <Button className='clear' onClick={handleClearDistance}>
                Clear
              </Button>
              <Button className='apply' onClick={handleApplyDistance}>
                Apply
              </Button>
            </div>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
}
