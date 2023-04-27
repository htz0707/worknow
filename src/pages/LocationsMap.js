import React, { useEffect, useState } from 'react';
import '../assets/styles/LocationsMap.scss';
import Map from '../components/Map';
import { gql, useLazyQuery } from '@apollo/client';
import { ReactComponent as BackIcon } from '../assets/icons/backArrow.svg';
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import FilterSortLocationMobile from '../components/FilterSortLocationMobile';
import { returnUrlParams } from '../helpers/helpers';
import { useTranslation } from 'react-i18next';
import { ReactComponent as FlexDeskIcon } from '../assets/icons/flexDesk.svg';
import { ReactComponent as EventHallIcon } from '../assets/icons/eventHall.svg';
import { ReactComponent as ConvienceRoomIcon } from '../assets/icons/convienceRoom.svg';
import { ReactComponent as FixedDeskIcon } from '../assets/icons/fixedDesk.svg';
import { ReactComponent as PrivateRoomIcon } from '../assets/icons/privateRoom.svg';
import { ReactComponent as PhoneBoothIcon } from '../assets/icons/phoneBooth.svg';
import { ReactComponent as MeetingRoomIcon } from '../assets/icons/meetingRoom.svg';
import { ReactComponent as SearchIcon } from '../assets/icons/search.svg';
import { Dropdown } from 'react-bootstrap';

export default function LocationsMap() {
  const { t } = useTranslation();
  const path = useLocation();
  const navigate = useNavigate();
  const [urlParams] = useSearchParams();
  let currentParams = returnUrlParams(urlParams.entries());
  const handleInitFilterSort = (obj) => {
    if (obj.sort) {
      setSortLocation(obj.sort);
    } else {
      setSortLocation('');
    }
    let filter_location = {};
    if (obj.amenitiesLocationIds) {
      filter_location.amenitiesLocationIds =
        obj.amenitiesLocationIds.split(',');
    } else {
      filter_location.amenitiesLocationIds = [];
    }
    if (obj.amenitiesWorkingSpaceIds) {
      filter_location.amenitiesWorkingSpaceIds =
        obj.amenitiesWorkingSpaceIds.split(',');
    } else {
      filter_location.amenitiesWorkingSpaceIds = [];
    }
    if (obj.capacityIds) {
      filter_location.capacityIds = obj.capacityIds.split(',');
    } else {
      filter_location.capacityIds = [];
    }
    if (obj.workingSpaceTypes) {
      filter_location.workingSpaceTypes = obj.workingSpaceTypes.split(',');
    } else {
      filter_location.workingSpaceTypes = [];
    }
    if (obj.isVerified) {
      if (obj.isVerified === 'true') {
        filter_location.isVerified = true;
      } else {
        filter_location.isVerified = '';
      }
    } else {
      filter_location.isVerified = '';
    }
    if (obj.rangePrice) {
      filter_location.rangePrice = [
        parseInt(obj.rangePrice.split(',')[0]),
        parseInt(obj.rangePrice.split(',')[1]),
      ];
    } else {
      filter_location.rangePrice = [0, 10000000];
    }
    setFilterLocations({
      ...filterLocations,
      ...filter_location,
    });
    if (obj.keyword) {
      setSearchData(obj.keyword);
    } else {
      setSearchData('');
    }
  };
  useEffect(() => {
    handleInitFilterSort(currentParams);
  }, [path]);
  const GET_LOCATIONS = gql`
    query GetLocations(
      $amenitiesLocationIds: [UUID!]
      $amenitiesWorkingSpaceIds: [UUID!]
      $workingSpaceCapacityIds: [UUID!]
      $workingSpaceTypes: [WorkingSpaceType!]
      $rangePrice: [Float!]
      $isVerified: Boolean
      $keyword: String!
      $sort: String!
    ) {
      locations(
        params: {
          amenitiesLocationIds: $amenitiesLocationIds
          amenitiesWorkingSpaceIds: $amenitiesWorkingSpaceIds
          workingSpaceCapacityIds: $workingSpaceCapacityIds
          workingSpaceTypes: $workingSpaceTypes
          rangePrice: $rangePrice
          isVerified: $isVerified
          keyword: $keyword
          sort: $sort
        }
      ) {
        edges {
          lat
          long
          address
          city {
            name
          }
          country {
            name
          }
          description
          district {
            name
          }
          name
          ward {
            name
          }
          id
          priceByDay
          priceByHour
          images {
            publicUrl
          }
          amenities {
            name
          }
        }
        pageInfo {
          count
        }
      }
    }
  `;

  const [getLocation] = useLazyQuery(GET_LOCATIONS, {
    fetchPolicy: 'no-cache',
  });
  const [locationsAmount, setLocationAmount] = useState(0);
  const [locations, setLocations] = useState([]);
  const [searchData, setSearchData] = useState('');
  let timeout = null;
  const handleTypeSearch = (value) => {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      setSearchData(value);
      navigate({
        search: createSearchParams({
          ...currentParams,
          keyword: value,
        }).toString(),
      });
    }, 300);
  };
  const [loading, setLoading] = useState(true);
  const getLocationsList = async () => {
    setLoading(true);
    let paramsData = {
      amenitiesLocationIds: filterLocations.amenitiesLocationIds,
      amenitiesWorkingSpaceIds: filterLocations.amenitiesWorkingSpaceIds,
      workingSpaceCapacityIds: filterLocations.capacityIds,
      workingSpaceTypes: filterLocations.workingSpaceTypes,
      rangePrice: filterLocations.rangePrice,
      keyword: searchData,
      sort: sortLocation,
    };
    if (filterLocations.isVerified !== '') {
      paramsData.isVerified = filterLocations.isVerified;
    }
    let res = await getLocation({
      variables: paramsData,
    });
    if (res.data) {
      setLocations(res.data?.locations?.edges);
      setLocationAmount(res.data?.locations?.pageInfo?.count);
    }
    setLoading(false);
    // setTimeout(() => {
    //   setLoading(false);
    // }, 300);
  };
  const [filterLocations, setFilterLocations] = useState({
    amenitiesLocationIds: [],
    amenitiesWorkingSpaceIds: [],
    capacityIds: [],
    workingSpaceTypes: [],
    isVerified: '',
    rangePrice: [0, 10000000],
  });
  const [sortLocation, setSortLocation] = useState('');
  useEffect(() => {
    getLocationsList();
  }, [filterLocations, searchData, sortLocation]);
  const mapOptions = {
    APIKey: process.env.REACT_APP_MAP_API_KEY,
    center: {
      lat: 10.788159959003151,
      lng: 106.70259701063593,
    },
    zoom: 12,
  };
  const [roomType, setRoomType] = useState([
    {
      id: 'all',
      name: t('all_types'),
    },
    {
      id: 'flexible_desk',
      name: t('flexible_desk'),
      icon: <FlexDeskIcon className='type-icon' />,
    },
    {
      id: 'fixed_desk',
      name: t('fixed_desk'),
      icon: <FixedDeskIcon className='type-icon' />,
    },
    {
      id: 'private_room',
      name: t('private_room'),
      icon: <PrivateRoomIcon className='type-icon' />,
    },
    {
      id: 'meeting_room',
      name: t('meeting_room'),
      icon: <MeetingRoomIcon className='type-icon' />,
    },
    {
      id: 'convience_room',
      name: t('convience_room'),
      icon: <ConvienceRoomIcon className='type-icon' />,
    },
    {
      id: 'event',
      name: t('event_hall'),
      icon: <EventHallIcon className='type-icon' />,
    },
    {
      id: 'booth',
      name: t('phone_booth'),
      icon: <PhoneBoothIcon className='type-icon' />,
    },
  ]);
  const [selectedType, setSelectedType] = useState({});
  useEffect(() => {
    if (filterLocations?.workingSpaceTypes?.length) {
      let id = filterLocations.workingSpaceTypes[0];
      let find = roomType.find((item) => item.id === id);
      if (find) {
        setSelectedType(find);
      } else {
        setSelectedType({
          id: 'all',
          name: t('all_types'),
        });
      }
    } else {
      setSelectedType({
        id: 'all',
        name: t('all_types'),
      });
    }
  }, [filterLocations]);
  const handleSelectType = (item) => {
    if (item.id === 'all') {
      setFilterLocations({
        ...filterLocations,
        workingSpaceTypes: [],
      });
      navigate({
        search: createSearchParams({
          ...currentParams,
          workingSpaceTypes: [].toString(),
        }).toString(),
      });
    } else {
      let copy = [item.id];
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
  return (
    <div className='locations-map'>
      <div class='locations-map-container'>
        <div className='locations-map-container_header'>
          <div
            className='btn-back'
            onClick={() =>
              navigate({
                pathname: '/locations',
                search: path.search,
              })
            }
          >
            <BackIcon className='icon' />
            <span className='text'>{t('back_to_list')}</span>
          </div>
          <div className='filter-section'>
            <Dropdown className='select-type'>
              <Dropdown.Toggle id='dropdown-basic'>
                {selectedType.name}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {roomType.map((item, index) => {
                  return (
                    <Dropdown.Item
                      key={index}
                      as='button'
                      onClick={() => handleSelectType(item)}
                      className={selectedType.id === item.id ? 'selected' : ''}
                    >
                      {item.icon} {item.name}
                    </Dropdown.Item>
                  );
                })}
              </Dropdown.Menu>
            </Dropdown>
            <div className='filter'>
              <FilterSortLocationMobile
                setFilterLocations={setFilterLocations}
                filterLocations={filterLocations}
                result={locationsAmount}
                sort={sortLocation}
                setSort={setSortLocation}
                allowFilter
              />
            </div>
          </div>
        </div>
        <div className='locations-map-container_search'>
          <div className='search-container'>
            <SearchIcon className='search-icon' />
            <input
              className='search-input'
              placeholder={t('search_for_locations')}
              defaultValue={searchData}
              onChange={(e) => handleTypeSearch(e.target.value)}
              spellCheck={false}
            />
          </div>
        </div>
        <Map options={mapOptions} locations={locations} />
      </div>
    </div>
  );
}
