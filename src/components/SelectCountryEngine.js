import React from 'react';
import '../assets/styles/SelectCountryEngine.scss';
import { IoLocationOutline } from 'react-icons/io5';

export default function SelectCountryEngine() {
  return (
    <div className='select-country-engine'>
      <div className='dropdown'>
        <button
          className='btn dropdown-toggle'
          type='button'
          id='dropdownMenuButton1'
          data-bs-toggle='dropdown'
          aria-expanded='false'
        >
          <IoLocationOutline size={20} /> Vietnam
        </button>
        <ul className='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
          <li>
            <a className='dropdown-item active' href='#'>
              Vietnam
            </a>
          </li>
          <li>
            <a className='dropdown-item' href='#'>
              Singapore
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
