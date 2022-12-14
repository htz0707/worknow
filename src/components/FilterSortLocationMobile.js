import React, { useState } from 'react';
import '../assets/styles/FilterSortLocationMobile.scss';
import { ReactComponent as SortIcon } from '../assets/icons/sort.svg';
import { ReactComponent as FilterIcon } from '../assets/icons/filter.svg';
import { ReactComponent as CloseIcon } from '../assets/icons/close.svg';
import { ReactComponent as ServiceIcon } from '../assets/icons/tienich.svg';
import { ReactComponent as CapacityIcon } from '../assets/icons/sucChua.svg';
import { Offcanvas } from 'react-bootstrap';
import { useQuery, gql, useLazyQuery } from '@apollo/client';
import { useEffect } from 'react';
import ShowMore from './ShowMore';
import { Badge } from 'antd';

export default function FilterSortLocationMobile(props) {
  const { filterLocations, setFilterLocations, result } = props;
  const [showFilterModal, setShowFilterModal] = useState(false);
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
  const onClickAmenities = (id) => {
    let copy = [...filterLocations.amenitiesIds];
    if (copy.includes(id)) {
      let filter_arr = copy.filter((item) => item !== id);
      setFilterLocations({
        ...filterLocations,
        amenitiesIds: filter_arr,
      });
    } else {
      copy.push(id);
      setFilterLocations({
        ...filterLocations,
        amenitiesIds: copy,
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
  //
  const handleClearFilter = () => {
    setFilterLocations({
      amenitiesIds: [],
      capacityIds: [],
    });
  };
  const handleCheckFilter = () => {
    if (
      filterLocations?.amenitiesIds?.length > 0 ||
      filterLocations?.capacityIds?.length > 0
    ) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <div className='filter-sort-location-mobile'>
      <div className='filter' onClick={() => setShowFilterModal(true)}>
        <Badge dot={handleCheckFilter()} size='default'>
          <FilterIcon className='icon' />
        </Badge>
        Lọc
      </div>
      <div className='sort'>
        <SortIcon className='icon' />
        Sắp xếp theo
      </div>
      <Offcanvas
        show={showFilterModal}
        placement='start'
        className='filter-location-modal w-100'
      >
        <Offcanvas.Header>
          <div className='filter-location-modal_header'>
            <CloseIcon
              className='icon'
              onClick={() => setShowFilterModal(false)}
            />
            <div className='main-title'>Lọc</div>
            <div className='clear-title' onClick={handleClearFilter}>
              Xóa hết
            </div>
          </div>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className='filter-location-modal_body'>
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
                          checked={filterLocations.amenitiesIds?.includes(
                            item.id
                          )}
                          onChange={() => onClickAmenities(item.id)}
                        />
                        <label
                          className='form-check-label'
                          for={'service' + item.id}
                        >
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
                            checked={filterLocations.amenitiesIds?.includes(
                              item.id
                            )}
                            onChange={() => onClickAmenities(item.id)}
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
                <ServiceIcon className='icon' /> Tiện Ích Văn Phòng
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
                          checked={filterLocations.amenitiesIds?.includes(
                            item.id
                          )}
                          onChange={() => onClickAmenities(item.id)}
                        />
                        <label
                          className='form-check-label'
                          for={'service' + item.id}
                        >
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
                            checked={filterLocations.amenitiesIds?.includes(
                              item.id
                            )}
                            onChange={() => onClickAmenities(item.id)}
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
                      <label
                        className='form-check-label'
                        for={'service' + item.id}
                      >
                        {item.name} người
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className='filter-location-modal_footer'>
            <div className='text'>Tổng cộng {result} kết quả</div>
            <button
              className='btn-show'
              onClick={() => setShowFilterModal(false)}
            >
              Hiển thị kết quả
            </button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}
