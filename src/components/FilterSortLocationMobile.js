import React, { useState } from 'react';
import '../assets/styles/FilterSortLocationMobile.scss';
import { ReactComponent as SortIcon } from '../assets/icons/sort.svg';
import { ReactComponent as FilterIcon } from '../assets/icons/filter.svg';
import { ReactComponent as CloseIcon } from '../assets/icons/close.svg';
import { ReactComponent as ServiceIcon } from '../assets/icons/tienichtoanha.svg';
import { ReactComponent as OfficeIcon } from '../assets/icons/tienichvanphong.svg';
import { ReactComponent as CapacityIcon } from '../assets/icons/sucChua.svg';
import { ReactComponent as RoomIcon } from '../assets/icons/loaiVanPhong.svg';
import { Offcanvas } from 'react-bootstrap';
import { gql, useLazyQuery } from '@apollo/client';
import { useEffect } from 'react';
import ShowMore from './ShowMore';
import { Badge } from 'antd';
import SortLocation from './SortLocation';
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { returnUrlParams } from '../helpers/helpers';

export default function FilterSortLocationMobile(props) {
  const {
    filterLocations,
    setFilterLocations,
    result,
    sort,
    setSort,
    allowFilter,
    allowSort,
  } = props;
  const [urlParams] = useSearchParams();
  let currentParams = returnUrlParams(urlParams.entries());
  const path = useLocation();
  const navigate = useNavigate();
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
  //
  const [roomType, setRoomType] = useState([
    {
      id: 'flexible_desk',
      name: 'Bàn làm việc linh hoạt',
    },
    {
      id: 'fixed_desk',
      name: 'Bàn làm việc cố định',
    },
    {
      id: 'private_room',
      name: 'Phòng làm việc riêng',
    },
    {
      id: 'meeting_room',
      name: 'Phòng họp',
    },
    {
      id: 'convience_room',
      name: 'Phòng hội nghị',
    },
    {
      id: 'event',
      name: 'Sảnh sự kiện',
    },
    {
      id: 'booth',
      name: 'Phone booth',
    },
  ]);
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
      navigate({
        search: createSearchParams({
          ...currentParams,
          amenitiesLocationIds: filter_arr.toString(),
        }).toString(),
      });
    } else {
      copy.push(id);
      setFilterLocations({
        ...filterLocations,
        amenitiesLocationIds: copy,
      });
      navigate({
        search: createSearchParams({
          ...currentParams,
          amenitiesLocationIds: copy.toString(),
        }).toString(),
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
      navigate({
        search: createSearchParams({
          ...currentParams,
          amenitiesWorkingSpaceIds: filter_arr.toString(),
        }).toString(),
      });
    } else {
      copy.push(id);
      setFilterLocations({
        ...filterLocations,
        amenitiesWorkingSpaceIds: copy,
      });
      navigate({
        search: createSearchParams({
          ...currentParams,
          amenitiesWorkingSpaceIds: copy.toString(),
        }).toString(),
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
      navigate({
        search: createSearchParams({
          ...currentParams,
          capacityIds: filter_arr.toString(),
        }).toString(),
      });
    } else {
      copy.push(id);
      setFilterLocations({
        ...filterLocations,
        capacityIds: copy,
      });
      navigate({
        search: createSearchParams({
          ...currentParams,
          capacityIds: copy.toString(),
        }).toString(),
      });
    }
  };
  // handle filter by room type
  const onClickRoomType = (id) => {
    let copy = [...filterLocations.workingSpaceTypes];
    if (copy.includes(id)) {
      let filter_arr = copy.filter((item) => item !== id);
      setFilterLocations({
        ...filterLocations,
        workingSpaceTypes: filter_arr,
      });
      navigate({
        search: createSearchParams({
          ...currentParams,
          workingSpaceTypes: filter_arr.toString(),
        }).toString(),
      });
    } else {
      copy.push(id);
      setFilterLocations({
        ...filterLocations,
        workingSpaceTypes: copy,
      });
      navigate({
        search: createSearchParams({
          ...currentParams,
          workingSpaceTypes: copy.toString(),
        }).toString(),
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
      amenitiesLocationIds: [],
      amenitiesWorkingSpaceIds: [],
      capacityIds: [],
      workingSpaceTypes: [],
    });
    if (currentParams.sort) {
      navigate({
        search: createSearchParams({
          sort: currentParams.sort,
        }).toString(),
      });
    } else {
      navigate(path.pathname);
    }
  };
  const handleCheckFilter = () => {
    if (
      filterLocations?.amenitiesLocationIds?.length > 0 ||
      filterLocations?.amenitiesWorkingSpaceIds?.length > 0 ||
      filterLocations?.capacityIds?.length > 0 ||
      filterLocations?.workingSpaceTypes?.length > 0
    ) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <div className='filter-sort-location-mobile'>
      {allowSort && (
        <div className='sort'>
          <SortLocation sort={sort} setSort={setSort} />
        </div>
      )}
      {allowFilter && (
        <div className='filter' onClick={() => setShowFilterModal(true)}>
          <div>
            <Badge dot={handleCheckFilter()} size='default'>
              <FilterIcon className='icon' />
            </Badge>
            Lọc
          </div>
        </div>
      )}
      <Offcanvas
        show={showFilterModal}
        placement='end'
        className='filter-location-modal'
      >
        <Offcanvas.Header>
          <div className='filter-location-modal_header'>
            <CloseIcon
              className='icon'
              onClick={() => setShowFilterModal(false)}
            />
            <div className='main-title'>Lọc</div>
            <div className='clear-title' onClick={handleClearFilter}>
              {handleCheckFilter() && <>Xóa hết</>}
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
                            checked={filterLocations.amenitiesWorkingSpaceIds?.includes(
                              item.id
                            )}
                            onChange={() =>
                              onClickAmenitiesWorkingSpace(item.id)
                            }
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
                        id={'service' + item.id}
                        checked={filterLocations.workingSpaceTypes?.includes(
                          item.id
                        )}
                        onChange={() => onClickRoomType(item.id)}
                      />
                      <label
                        className='form-check-label'
                        for={'service' + item.id}
                      >
                        {item.name}
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
