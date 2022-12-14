import React from 'react';
import '../assets/styles/Locations.scss';
import FilterLocation from '../components/FilterLocation';
import LocationCard from '../components/LocationCard';
import { useEffect } from 'react';
import { ReactComponent as SearchIcon } from '../assets/icons/search.svg';
import MapWrapper from '../components/MapWrapper';
import SortLocation from '../components/SortLocation';
import { gql, useLazyQuery } from '@apollo/client';
import { useState } from 'react';
import FilterSortLocationMobile from '../components/FilterSortLocationMobile';
import { Avatar, List, Skeleton, Switch } from 'antd';

export default function Locations() {
  const GET_LOCATIONS = gql`
    query GetLocations(
      $amenitiesLocationIds: [UUID!]
      $workingSpaceCapacityIds: [UUID!]
    ) {
      locations(
        params: {
          amenitiesLocationIds: $amenitiesLocationIds
          workingSpaceCapacityIds: $workingSpaceCapacityIds
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
  const [loading, setLoading] = useState(true);
  const getLocationsList = async () => {
    setLoading(true);
    let res = await getLocation({
      variables: {
        amenitiesLocationIds: filterLocations.amenitiesIds,
        workingSpaceCapacityIds: filterLocations.capacityIds,
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
    amenitiesIds: [],
    capacityIds: [],
  });
  useEffect(() => {
    getLocationsList();
  }, [filterLocations]);
  return (
    <div className='locations'>
      <div className='locations_header'>
        <div className='locations_header_content'>
          <div className='row-1'>
            <div className='page-container'>
              <div className='search-bar'>
                <SearchIcon />
                <input type='text' placeholder='Tìm kiếm địa điểm' />
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
              />
            </div>
          </div>
        </div>
      </div>
      <div className='locations_body page-container'>
        <div className='locations_body_left'>
          <div className='search-on-map'>
            <div>
              <MapWrapper />
            </div>
            <div>Xem trên bản đồ</div>
          </div>
          <FilterLocation
            setFilterLocations={setFilterLocations}
            filterLocations={filterLocations}
          />
        </div>
        <div className='locations_body_right'>
          <div className='header'>
            <div>
              <span className='fw-bold'>
                {locationsAmount} văn phòng làm việc
              </span>{' '}
              tại TP. Hồ Chí Minh
            </div>
            <div className='sort-location'>
              <SortLocation />
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
            {loading
              ? new Array(3).fill(1).map((_, i) => {
                  return <Skeleton loading={loading} active avatar key={i} />;
                })
              : locations.map((item, index) => {
                  return <LocationCard data={item} key={index} />;
                })}
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
