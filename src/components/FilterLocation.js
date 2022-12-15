import React, { useEffect, useState } from 'react';
import '../assets/styles/FilterLocation.scss';
import { IoLocationOutline } from 'react-icons/io5';
import { Dropdown, Button } from 'react-bootstrap';
import { ReactComponent as ServiceIcon } from '../assets/icons/tienichtoanha.svg';
import { ReactComponent as OfficeIcon } from '../assets/icons/tienichvanphong.svg';
import { ReactComponent as DistanceIcon } from '../assets/icons/ganToiNhat.svg';
import { ReactComponent as RoomIcon } from '../assets/icons/loaiVanPhong.svg';
import { ReactComponent as CapacityIcon } from '../assets/icons/sucChua.svg';
import { ReactComponent as PolicyIcon } from '../assets/icons/chinhSach.svg';
import { useQuery, gql, useLazyQuery } from '@apollo/client';
import ShowMore from './ShowMore';

export default function FilterLocation(props) {
  const { filterLocations, setFilterLocations } = props;
  // const [serviceType, setServiceType] = useState([
  //   {
  //     id: 1,
  //     name: 'Cafe',
  //   },
  //   {
  //     id: 2,
  //     name: 'Miễn phí đậu xe',
  //   },
  //   {
  //     id: 3,
  //     name: 'Phòng tập',
  //   },
  //   {
  //     id: 4,
  //     name: 'Massage tại chỗ',
  //   },
  //   {
  //     id: 5,
  //     name: 'Bếp, tiệm ăn',
  //   },
  //   {
  //     id: 6,
  //     name: 'Dọn dẹp',
  //   },
  // ]);
  // const [distanceType, setDistanceType] = useState([
  //   {
  //     id: 1,
  //     name: 'Dưới 1km',
  //   },
  //   {
  //     id: 2,
  //     name: 'Dưới 3km',
  //   },
  //   {
  //     id: 3,
  //     name: 'Dưới 7km',
  //   },
  //   {
  //     id: 4,
  //     name: 'Dưới 20km',
  //   },
  // ]);
  // const [roomType, setRoomType] = useState([
  //   {
  //     id: 1,
  //     name: 'Bàn làm việc đơn',
  //   },
  //   {
  //     id: 2,
  //     name: 'Phòng họp',
  //   },
  //   {
  //     id: 3,
  //     name: 'Văn Phòng riêng',
  //   },
  //   {
  //     id: 4,
  //     name: 'Văn phòng cafe',
  //   },
  //   {
  //     id: 5,
  //     name: 'Đại sảnh',
  //   },
  //   {
  //     id: 6,
  //     name: 'Hội trường',
  //   },
  // ]);
  // const [capacityType, setCapacityType] = useState([
  //   {
  //     id: 1,
  //     name: '1 người',
  //   },
  //   {
  //     id: 2,
  //     name: '2-4 người',
  //   },
  //   {
  //     id: 3,
  //     name: '5-10 người',
  //   },
  //   {
  //     id: 4,
  //     name: '10-20 người',
  //   },
  //   {
  //     id: 5,
  //     name: '+ 20 người',
  //   },
  // ]);
  // const [policyType, setPolicyType] = useState([
  //   {
  //     id: 1,
  //     name: 'Xác nhận tức thời',
  //   },
  //   {
  //     id: 2,
  //     name: 'Miễn phí hủy',
  //   },
  // ]);
  // handle get list amenity location
  const GET_AMENITIES = gql`
    query GetAmenities($type: AmenityType) {
      amenities(params: { type: $type }) {
        id
        name
      }
    }
  `;
  const [getAmenities] = useLazyQuery(GET_AMENITIES);
  const [amenitiesLocations, setAmenitiesLocations] = useState([]);
  const handleGetAmenitiesLocations = async () => {
    let res = await getAmenities({
      variables: {
        type: 'location',
      },
    });
    if (res.data) {
      setAmenitiesLocations(res.data.amenities);
    }
  };
  // handle get list amenity working space
  const [amenitiesWorkingSpace, setAmenitiesWorkingSpace] = useState([]);
  const handleGetAmenitiesWorkingSpace = async () => {
    let res = await getAmenities({
      variables: {
        type: 'working_space',
      },
    });
    if (res.data) {
      setAmenitiesWorkingSpace(res.data.amenities);
    }
  };
  // handle get list capacity
  const GET_CAPACITY = gql`
    query GetCapacity {
      capacity {
        id
        name
      }
    }
  `;
  const [getCapacity] = useLazyQuery(GET_CAPACITY);
  const [capacity, setCapacity] = useState([]);
  const handleGetCapacity = async () => {
    let res = await getCapacity();
    if (res.data) {
      setCapacity(res.data.capacity);
    }
  };
  // function get all data
  const handleGetData = async () => {
    await handleGetAmenitiesLocations();
    await handleGetAmenitiesWorkingSpace();
    await handleGetCapacity();
  };
  useEffect(() => {
    handleGetData();
  }, []);
  // handle filter by amenity
  const onClickAmenitiesLocation = (id) => {
    let copy = [...filterLocations.amenitiesLocationIds];
    if (copy.includes(id)) {
      let filter_arr = copy.filter((item) => item !== id);
      setFilterLocations({
        ...filterLocations,
        amenitiesLocationIds: filter_arr,
      });
    } else {
      copy.push(id);
      setFilterLocations({
        ...filterLocations,
        amenitiesLocationIds: copy,
      });
    }
  };
  // handle filter by amenity
  const onClickAmenitiesWorkingSpace = (id) => {
    let copy = [...filterLocations.amenitiesWorkingSpaceIds];
    if (copy.includes(id)) {
      let filter_arr = copy.filter((item) => item !== id);
      setFilterLocations({
        ...filterLocations,
        amenitiesWorkingSpaceIds: filter_arr,
      });
    } else {
      copy.push(id);
      setFilterLocations({
        ...filterLocations,
        amenitiesWorkingSpaceIds: copy,
      });
    }
  };
  // handle filter by capacity
  const onClickCapacity = (id) => {
    let copy = [...filterLocations.capacityIds];
    if (copy.includes(id)) {
      let filter_arr = copy.filter((item) => item !== id);
      setFilterLocations({
        ...filterLocations,
        capacityIds: filter_arr,
      });
    } else {
      copy.push(id);
      setFilterLocations({
        ...filterLocations,
        capacityIds: copy,
      });
    }
  };
  const [showMoreAmenitiesLocation, setShowMoreAmenitiesLocation] =
    useState(false);
  const [showMoreAmenitiesWorkingSpace, setShowMoreAmenitiesWorkingSpace] =
    useState(false);
  return (
    <div className='filter-location'>
      <div className='filter-location_card'>
        <div className='filter-location_card_title'>
          <ServiceIcon className='icon' /> Tiện Ích Tòa Nhà
        </div>
        <div className='filter-location_card_list'>
          {amenitiesLocations.map((item, index) => {
            if (showMoreAmenitiesLocation) {
              return (
                <div className='item form-check' key={index}>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    id={'service' + item.id}
                    checked={filterLocations.amenitiesLocationIds?.includes(
                      item.id
                    )}
                    onChange={() => onClickAmenitiesLocation(item.id)}
                  />
                  <label className='form-check-label' for={'service' + item.id}>
                    {item.name}
                  </label>
                </div>
              );
            } else {
              if (index < 5) {
                return (
                  <div className='item form-check' key={index}>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      id={'service' + item.id}
                      checked={filterLocations.amenitiesLocationIds?.includes(
                        item.id
                      )}
                      onChange={() => onClickAmenitiesLocation(item.id)}
                    />
                    <label
                      className='form-check-label'
                      for={'service' + item.id}
                    >
                      {item.name}
                    </label>
                  </div>
                );
              }
            }
          })}
        </div>
        {amenitiesLocations?.length > 5 && (
          <ShowMore
            show={showMoreAmenitiesLocation}
            setShow={setShowMoreAmenitiesLocation}
          />
        )}
      </div>
      <div className='filter-location_card'>
        <div className='filter-location_card_title'>
          <OfficeIcon className='icon' /> Tiện Ích Văn Phòng
        </div>
        <div className='filter-location_card_list'>
          {amenitiesWorkingSpace.map((item, index) => {
            if (showMoreAmenitiesWorkingSpace) {
              return (
                <div className='item form-check' key={index}>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    id={'service' + item.id}
                    checked={filterLocations.amenitiesWorkingSpaceIds?.includes(
                      item.id
                    )}
                    onChange={() => onClickAmenitiesWorkingSpace(item.id)}
                  />
                  <label className='form-check-label' for={'service' + item.id}>
                    {item.name}
                  </label>
                </div>
              );
            } else {
              if (index < 5) {
                return (
                  <div className='item form-check' key={index}>
                    <input
                      className='form-check-input'
                      type='checkbox'
                      id={'service' + item.id}
                      checked={filterLocations.amenitiesWorkingSpaceIds?.includes(
                        item.id
                      )}
                      onChange={() => onClickAmenitiesWorkingSpace(item.id)}
                    />
                    <label
                      className='form-check-label'
                      for={'service' + item.id}
                    >
                      {item.name}
                    </label>
                  </div>
                );
              }
            }
          })}
        </div>
        {amenitiesWorkingSpace?.length > 5 && (
          <ShowMore
            show={showMoreAmenitiesWorkingSpace}
            setShow={setShowMoreAmenitiesWorkingSpace}
          />
        )}
      </div>
      <div className='filter-location_card'>
        <div className='filter-location_card_title'>
          <CapacityIcon className='icon' /> Sức chứa
        </div>
        <div className='filter-location_card_list'>
          {capacity.map((item, index) => {
            return (
              <div className='item form-check' key={index}>
                <input
                  className='form-check-input'
                  type='checkbox'
                  id={'service' + item.id}
                  checked={filterLocations.capacityIds?.includes(item.id)}
                  onChange={() => onClickCapacity(item.id)}
                />
                <label className='form-check-label' for={'service' + item.id}>
                  {item.name} người
                </label>
              </div>
            );
          })}
        </div>
      </div>
      {/* <div className='filter-location_card'>
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
      </div> */}
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
