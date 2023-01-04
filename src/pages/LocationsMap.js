import React, { useEffect, useState } from 'react';
import '../assets/styles/LocationsMap.scss';
import Map from '../components/Map';
import { gql, useLazyQuery } from '@apollo/client';
import { ReactComponent as BackIcon } from '../assets/icons/backArrow.svg';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import FilterSortLocationMobile from '../components/FilterSortLocationMobile';
import { returnUrlParams } from '../helpers/helpers';
import { useTranslation } from 'react-i18next';
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
    setFilterLocations({
      ...filterLocations,
      ...filter_location,
    });
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
      $keyword: String!
      $sort: String!
    ) {
      locations(
        params: {
          amenitiesLocationIds: $amenitiesLocationIds
          amenitiesWorkingSpaceIds: $amenitiesWorkingSpaceIds
          workingSpaceCapacityIds: $workingSpaceCapacityIds
          workingSpaceTypes: $workingSpaceTypes
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
    }, 300);
  };
  const [loading, setLoading] = useState(true);
  const getLocationsList = async () => {
    setLoading(true);
    let res = await getLocation({
      variables: {
        amenitiesLocationIds: filterLocations.amenitiesLocationIds,
        amenitiesWorkingSpaceIds: filterLocations.amenitiesWorkingSpaceIds,
        workingSpaceCapacityIds: filterLocations.capacityIds,
        workingSpaceTypes: filterLocations.workingSpaceTypes,
        keyword: searchData,
        sort: sortLocation,
      },
    });
    if (res.data) {
      setLocations(res.data?.locations?.edges);
      setLocationAmount(res.data?.locations?.pageInfo?.count);
    }
    setTimeout(() => {
      setLoading(false);
    }, 300);
  };
  const [filterLocations, setFilterLocations] = useState({
    amenitiesLocationIds: [],
    amenitiesWorkingSpaceIds: [],
    capacityIds: [],
    workingSpaceTypes: [],
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
        <Map options={mapOptions} locations={locations} />
      </div>
    </div>
  );
}
