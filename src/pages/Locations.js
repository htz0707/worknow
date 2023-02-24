import React from 'react';
import '../assets/styles/Locations.scss';
import FilterLocation from '../components/FilterLocation';
import LocationCard from '../components/LocationCard';
import { useEffect } from 'react';
import { ReactComponent as SearchIcon } from '../assets/icons/search.svg';
import SortLocation from '../components/SortLocation';
import { gql, useLazyQuery } from '@apollo/client';
import { useState } from 'react';
import FilterSortLocationMobile from '../components/FilterSortLocationMobile';
import { Skeleton } from 'antd';
import NoData from '../components/NoData';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { returnUrlParams } from '../helpers/helpers';
import { Trans, useTranslation, withTranslation } from 'react-i18next';

function Locations() {
  const { t } = useTranslation();
  const path = useLocation();
  const navigate = useNavigate();
  const [urlParams] = useSearchParams();
  let currentParams = returnUrlParams(urlParams.entries());
  const handleInitFilterSort = (obj) => {
    if (obj.sort) {
      setSortLocation(obj.sort);
    } else {
      setSortLocation('-is_verified');
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
          isVerified: $isVerified
          keyword: $keyword
          sort: $sort
        }
      ) {
        edges {
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
          isVerified
          priceByDay
          priceByHour
          images {
            publicUrl
          }
          amenities {
            name
          }
          category {
            id
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
    let paramsData = {
      amenitiesLocationIds: filterLocations.amenitiesLocationIds,
      amenitiesWorkingSpaceIds: filterLocations.amenitiesWorkingSpaceIds,
      workingSpaceCapacityIds: filterLocations.capacityIds,
      workingSpaceTypes: filterLocations.workingSpaceTypes,
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
    setTimeout(() => {
      setLoading(false);
    }, 300);
  };
  const [filterLocations, setFilterLocations] = useState({
    amenitiesLocationIds: [],
    amenitiesWorkingSpaceIds: [],
    capacityIds: [],
    workingSpaceTypes: [],
    isVerified: '',
  });
  const [sortLocation, setSortLocation] = useState('-is_verified');
  useEffect(() => {
    getLocationsList();
  }, [filterLocations, searchData, sortLocation]);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [filterLocations, searchData]);
  return (
    <div className='locations'>
      <div className='locations_header'>
        <div className='locations_header_content'>
          <div className='row-1'>
            <div className='page-container'>
              <div className='search-bar'>
                <SearchIcon />
                <input
                  type='text'
                  placeholder={t('search_for_locations')}
                  onChange={(e) => handleTypeSearch(e.target.value)}
                />
              </div>
              <div className='calendar-bar'></div>
            </div>
          </div>
          <div className='row-2'>
            <div className='page-container'>
              <FilterSortLocationMobile
                setFilterLocations={setFilterLocations}
                filterLocations={filterLocations}
                result={locationsAmount}
                sort={sortLocation}
                setSort={setSortLocation}
                allowFilter
                allowSort
              />
            </div>
          </div>
        </div>
      </div>
      <div className='locations_body page-container'>
        <div className='locations_body_left'>
          <div className='search-on-map'>
            <div
              onClick={() =>
                navigate({
                  pathname: '/locations/map',
                  search: path.search,
                })
              }
            >
              {t('view_on_map')}
            </div>
          </div>
          {/* <div className='search-on-map'>
            <div>
              <MapWrapper />
            </div>
            <div
              onClick={() =>
                navigate({
                  pathname: '/locations/map',
                  search: path.search,
                })
              }
            >
              Xem trên bản đồ
            </div>
          </div> */}
          <FilterLocation
            setFilterLocations={setFilterLocations}
            filterLocations={filterLocations}
          />
        </div>
        <div className='locations_body_right'>
          <div className='header'>
            <div>
              <Trans i18nKey='locations_amount_at_hcm' count={locationsAmount}>
                <strong>{{ locationsAmount }} văn phòng làm việc</strong> tại
                TP.Hồ Chí Minh
              </Trans>
            </div>
            <div className='sort-location'>
              <SortLocation sort={sortLocation} setSort={setSortLocation} />
            </div>
          </div>
          <div className='content'>
            {/* <List
              itemLayout='vertical'
              size='large'
              dataSource={locations}
              renderItem={(item) => (
                <List.Item key={item.id}>
                  <Skeleton loading={loading} active avatar>
                    <LocationCard data={item} />
                  </Skeleton>
                </List.Item>
              )}
            /> */}
            {loading ? (
              new Array(3).fill(1).map((_, i) => {
                return <Skeleton loading={loading} active avatar key={i} />;
              })
            ) : (
              <>
                {locations.length ? (
                  locations.map((item, index) => {
                    return <LocationCard data={item} key={index} />;
                  })
                ) : (
                  <NoData />
                )}
              </>
            )}
            {/* {locations.map((item, index) => {
              return <LocationCard data={item} key={index} />;
            })} */}
          </div>
        </div>
      </div>
      {/* <div className='header'>
        <h5 className='title'>Địa điểm</h5>
        <div className='action'>
          <SelectCountryEngine />
        </div>
      </div> */}
      {/* <div id='body_location' className='body'>
        <div className='left'>
          <SelectBookingType />
        </div>
        <div className='right'>
          <div className='header'>
            <FilterLocation />
          </div>
          <div className='body'>
            <LocationCard />
            <LocationCard />
            <LocationCard />
            <LocationCard />
            <LocationCard />
            <LocationCard />
            <LocationCard />
            <LocationCard />
          </div>
        </div>
      </div> */}
    </div>
  );
}
export default withTranslation()(Locations);
