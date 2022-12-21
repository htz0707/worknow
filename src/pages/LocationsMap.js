import React, { useEffect, useState } from 'react';
import '../assets/styles/LocationsMap.scss';
import Map from '../components/Map';
import { gql, useLazyQuery } from '@apollo/client';
import { ReactComponent as BackIcon } from '../assets/icons/backArrow.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import FilterSortLocationMobile from '../components/FilterSortLocationMobile';
export default function LocationsMap() {
  const path = useLocation();
  const navigate = useNavigate();
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
            <span className='text'>Trở về danh sách</span>
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
