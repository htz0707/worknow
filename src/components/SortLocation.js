import React from 'react';
import { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import '../assets/styles/SortLocation.scss';
import { ReactComponent as SortIcon } from '../assets/icons/sort.svg';
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { returnUrlParams } from '../helpers/helpers';

export default function SortLocation(props) {
  const [urlParams] = useSearchParams();
  let currentParams = returnUrlParams(urlParams.entries());
  const navigate = useNavigate();
  const { sort, setSort } = props;
  const handleSelectSort = (value) => {
    navigate({
      search: createSearchParams({
        ...currentParams,
        sort: value,
      }).toString(),
    });
    setSort(value);
  };
  const handleRenderTitle = (value) => {
    switch (value) {
      case '-name':
        return 'Tên A-Z';
      case 'name':
        return 'Tên Z-A';
      case 'price':
        return 'Giá thấp nhất';
      case '-price':
        return 'Giá cao nhất';
      default:
        return null;
    }
  };
  return (
    <div className='sort-location'>
      <Dropdown className='dropdown'>
        <Dropdown.Toggle id='dropdown-basic'>
          <SortIcon className='sort-icon' />
          {handleRenderTitle(sort) || 'Sắp xếp theo'}
        </Dropdown.Toggle>
        <Dropdown.Menu className='dropdown-menu'>
          <Dropdown.Item
            className={
              sort === '-name' ? 'dropdown-item active' : 'dropdown-item'
            }
            onClick={() => handleSelectSort('-name')}
          >
            Từ A-Z
          </Dropdown.Item>
          <Dropdown.Item
            className={
              sort === 'name' ? 'dropdown-item active' : 'dropdown-item'
            }
            onClick={() => handleSelectSort('name')}
          >
            Từ Z-A
          </Dropdown.Item>
          <Dropdown.Item
            className={
              sort === 'price' ? 'dropdown-item active' : 'dropdown-item'
            }
            onClick={() => handleSelectSort('price')}
          >
            Giá thấp nhất
          </Dropdown.Item>
          <Dropdown.Item
            className={
              sort === '-price' ? 'dropdown-item active' : 'dropdown-item'
            }
            onClick={() => handleSelectSort('-price')}
          >
            Giá cao nhất
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
