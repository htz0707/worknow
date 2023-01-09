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
import { useTranslation } from 'react-i18next';

export default function SortLocation(props) {
  const { t } = useTranslation();
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
      case 'name':
        return t('name_a_z');
      case '-name':
        return t('name_z_a');
      case 'price':
        return t('lowest_price');
      case '-price':
        return t('highest_price');
      default:
        return null;
    }
  };
  return (
    <div className='sort-location'>
      <Dropdown className='dropdown'>
        <Dropdown.Toggle id='dropdown-basic'>
          <SortIcon className='sort-icon' />
          {handleRenderTitle(sort) || t('sort_by')}
        </Dropdown.Toggle>
        <Dropdown.Menu className='dropdown-menu'>
          <Dropdown.Item
            className={
              sort === 'name' ? 'dropdown-item active' : 'dropdown-item'
            }
            onClick={() => handleSelectSort('name')}
          >
            {t('from_a_z')}
          </Dropdown.Item>
          <Dropdown.Item
            className={
              sort === '-name' ? 'dropdown-item active' : 'dropdown-item'
            }
            onClick={() => handleSelectSort('-name')}
          >
            {t('from_z_a')}
          </Dropdown.Item>
          <Dropdown.Item
            className={
              sort === 'price' ? 'dropdown-item active' : 'dropdown-item'
            }
            onClick={() => handleSelectSort('price')}
          >
            {t('lowest_price')}
          </Dropdown.Item>
          <Dropdown.Item
            className={
              sort === '-price' ? 'dropdown-item active' : 'dropdown-item'
            }
            onClick={() => handleSelectSort('-price')}
          >
            {t('highest_price')}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
