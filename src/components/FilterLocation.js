import React, { useState } from 'react';
import '../assets/styles/FilterLocation.scss';
import { IoLocationOutline } from 'react-icons/io5';
import { Dropdown, Button } from 'react-bootstrap';

export default function FilterLocation(props) {
  const [sort, setSort] = useState('Vị trí gần nhất');
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
          <Dropdown.Toggle id='dropdown-basic'>Sắp xếp: {sort}</Dropdown.Toggle>
          <Dropdown.Menu className='dropdown-menu'>
            <Dropdown.Item
              className={
                sort === 'Thứ tự bảng chữ cái'
                  ? 'dropdown-item active'
                  : 'dropdown-item'
              }
              onClick={() => handleSelectSort('Thứ tự bảng chữ cái')}
            >
              Thứ tự bảng chữ cái
            </Dropdown.Item>
            <Dropdown.Item
              className={
                sort === 'Vị trí gần nhất'
                  ? 'dropdown-item active'
                  : 'dropdown-item'
              }
              onClick={() => handleSelectSort('Vị trí gần nhất')}
            >
              Vị trí gần nhất
            </Dropdown.Item>
            <Dropdown.Item
              className={
                sort === 'Nhiều chỗ ngồi'
                  ? 'dropdown-item active'
                  : 'dropdown-item'
              }
              onClick={() => handleSelectSort('Nhiều chỗ ngồi')}
            >
              Nhiều chỗ ngồi
            </Dropdown.Item>
            <Dropdown.Item
              className={
                sort === 'Giá thấp nhất'
                  ? 'dropdown-item active'
                  : 'dropdown-item'
              }
              onClick={() => handleSelectSort('Giá thấp nhất')}
            >
              Giá thấp nhất
            </Dropdown.Item>
            <Dropdown.Item
              className={
                sort === 'Giá cao nhất'
                  ? 'dropdown-item active'
                  : 'dropdown-item'
              }
              onClick={() => handleSelectSort('Giá cao nhất')}
            >
              Giá cao nhất
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
            {distance || 'Khoảng cách'}
          </Dropdown.Toggle>
          <Dropdown.Menu
            className='dropdown-menu'
            onMouseDown={(e) => e.preventDefault()}
          >
            <Dropdown.Item
              className={
                selectedDistance === 'Dưới 500m'
                  ? 'dropdown-item active'
                  : 'dropdown-item'
              }
              onClick={() => handleSelectDistance('Dưới 500m')}
            >
              {'Dưới 500m'}
            </Dropdown.Item>
            <Dropdown.Item
              className={
                selectedDistance === 'Dưới 1km'
                  ? 'dropdown-item active'
                  : 'dropdown-item'
              }
              onClick={() => handleSelectDistance('Dưới 1km')}
            >
              {'Dưới 1km'}
            </Dropdown.Item>
            <Dropdown.Item
              className={
                selectedDistance === 'Dưới 2km'
                  ? 'dropdown-item active'
                  : 'dropdown-item'
              }
              onClick={() => handleSelectDistance('Dưới 2km')}
            >
              {'Dưới 2km'}
            </Dropdown.Item>
            <div className='dropdown-item-footer'>
              <Button className='clear' onClick={handleClearDistance}>
                Xóa
              </Button>
              <Button className='apply' onClick={handleApplyDistance}>
                Áp dụng
              </Button>
            </div>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
}
