import React, { useState } from 'react';
import '../assets/styles/FilterLocation.scss';
import { IoLocationOutline } from 'react-icons/io5';
import { Dropdown, Button } from 'react-bootstrap';
import { ReactComponent as ServiceIcon } from '../assets/icons/dichVu.svg';
import { ReactComponent as DistanceIcon } from '../assets/icons/ganToiNhat.svg';
import { ReactComponent as RoomIcon } from '../assets/icons/loaiVanPhong.svg';
import { ReactComponent as CapacityIcon } from '../assets/icons/sucChua.svg';
import { ReactComponent as PolicyIcon } from '../assets/icons/chinhSach.svg';

export default function FilterLocation(props) {
  // const [sort, setSort] = useState('Vị trí gần nhất');
  // const handleSelectSort = (value) => {
  //   setSort(value);
  // };
  // const [showDistance, setShowDistance] = useState(false);
  // const [distance, setDistance] = useState(null);
  // const [selectedDistance, setSelectedDistance] = useState(null);
  // const handleSelectDistance = (value) => {
  //   setSelectedDistance(value);
  // };
  // const handleClearDistance = () => {
  //   console.log('abced');
  //   setSelectedDistance(null);
  // };
  // const handleApplyDistance = () => {
  //   setShowDistance(false);
  //   console.log('aaa');
  //   setDistance(selectedDistance);
  // };
  const [serviceType, setServiceType] = useState([
    {
      id: 1,
      name: 'Cafe',
    },
    {
      id: 2,
      name: 'Miễn phí đậu xe',
    },
    {
      id: 3,
      name: 'Phòng tập',
    },
    {
      id: 4,
      name: 'Massage tại chỗ',
    },
    {
      id: 5,
      name: 'Bếp, tiệm ăn',
    },
    {
      id: 6,
      name: 'Dọn dẹp',
    },
  ]);
  const [distanceType, setDistanceType] = useState([
    {
      id: 1,
      name: 'Dưới 1km',
    },
    {
      id: 2,
      name: 'Dưới 3km',
    },
    {
      id: 3,
      name: 'Dưới 7km',
    },
    {
      id: 4,
      name: 'Dưới 20km',
    },
  ]);
  const [roomType, setRoomType] = useState([
    {
      id: 1,
      name: 'Bàn làm việc đơn',
    },
    {
      id: 2,
      name: 'Phòng họp',
    },
    {
      id: 3,
      name: 'Văn Phòng riêng',
    },
    {
      id: 4,
      name: 'Văn phòng cafe',
    },
    {
      id: 5,
      name: 'Đại sảnh',
    },
    {
      id: 6,
      name: 'Hội trường',
    },
  ]);
  const [capacityType, setCapacityType] = useState([
    {
      id: 1,
      name: '1 người',
    },
    {
      id: 2,
      name: '2-4 người',
    },
    {
      id: 3,
      name: '5-10 người',
    },
    {
      id: 4,
      name: '10-20 người',
    },
    {
      id: 5,
      name: '+ 20 người',
    },
  ]);
  const [policyType, setPolicyType] = useState([
    {
      id: 1,
      name: 'Xác nhận tức thời',
    },
    {
      id: 2,
      name: 'Miễn phí hủy',
    },
  ]);
  return (
    <div className='filter-location'>
      <div className='filter-location_card'>
        <div className='filter-location_card_title'>
          <ServiceIcon className='icon' /> Dịch vụ
        </div>
        <div className='filter-location_card_list'>
          {serviceType.map((item, index) => {
            return (
              <div className='item form-check' key={index}>
                <input
                  className='form-check-input'
                  type='checkbox'
                  value=''
                  id={'service' + item.id}
                />
                <label className='form-check-label' for={'service' + item.id}>
                  {item.name}
                </label>
              </div>
            );
          })}
        </div>
      </div>
      <div className='filter-location_card'>
        <div className='filter-location_card_title'>
          <DistanceIcon className='icon' /> Gần tôi nhất
        </div>
        <div className='filter-location_card_list'>
          {distanceType.map((item, index) => {
            return (
              <div className='item form-check' key={index}>
                <input
                  className='form-check-input'
                  type='checkbox'
                  value=''
                  id={'service' + item.id}
                />
                <label className='form-check-label' for={'service' + item.id}>
                  {item.name}
                </label>
              </div>
            );
          })}
        </div>
      </div>
      <div className='filter-location_card'>
        <div className='filter-location_card_title'>
          <RoomIcon className='icon' /> Loại văn phòng
        </div>
        <div className='filter-location_card_list'>
          {roomType.map((item, index) => {
            return (
              <div className='item form-check' key={index}>
                <input
                  className='form-check-input'
                  type='checkbox'
                  value=''
                  id={'service' + item.id}
                />
                <label className='form-check-label' for={'service' + item.id}>
                  {item.name}
                </label>
              </div>
            );
          })}
        </div>
      </div>
      <div className='filter-location_card'>
        <div className='filter-location_card_title'>
          <CapacityIcon className='icon' /> Sức chứa
        </div>
        <div className='filter-location_card_list'>
          {capacityType.map((item, index) => {
            return (
              <div className='item form-check' key={index}>
                <input
                  className='form-check-input'
                  type='checkbox'
                  value=''
                  id={'service' + item.id}
                />
                <label className='form-check-label' for={'service' + item.id}>
                  {item.name}
                </label>
              </div>
            );
          })}
        </div>
      </div>
      <div className='filter-location_card'>
        <div className='filter-location_card_title'>
          <PolicyIcon className='icon' /> chính sách
        </div>
        <div className='filter-location_card_list'>
          {policyType.map((item, index) => {
            return (
              <div className='item form-check' key={index}>
                <input
                  className='form-check-input'
                  type='checkbox'
                  value=''
                  id={'service' + item.id}
                />
                <label className='form-check-label' for={'service' + item.id}>
                  {item.name}
                </label>
              </div>
            );
          })}
        </div>
      </div>
      {/* <div className='select-sort'>
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
      </div> */}
    </div>
  );
}
