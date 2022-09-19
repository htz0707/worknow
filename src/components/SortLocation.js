import React from 'react';
import { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import '../assets/styles/SortLocation.scss';
import { ReactComponent as SortIcon } from '../assets/icons/sort.svg';

export default function SortLocation() {
  const [sort, setSort] = useState('Vị trí gần nhất');
  const handleSelectSort = (value) => {
    setSort(value);
  };
  return (
    <div className='sort-location'>
      <Dropdown className='dropdown'>
        <Dropdown.Toggle id='dropdown-basic'>
          <SortIcon className='sort-icon' />
          Sắp xếp: {sort}
        </Dropdown.Toggle>
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
              sort === 'Giá cao nhất' ? 'dropdown-item active' : 'dropdown-item'
            }
            onClick={() => handleSelectSort('Giá cao nhất')}
          >
            Giá cao nhất
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
