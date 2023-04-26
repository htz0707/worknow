import React, { useEffect } from 'react';
import '../assets/styles/SearchLocation.scss';
import { ReactComponent as SearchIcon } from '../assets/icons/search.svg';
import { ReactComponent as RightArrowIcon } from '../assets/icons/rightArrow.svg';
import { ReactComponent as BackArrowIcon } from '../assets/icons/backArrow.svg';
import { ReactComponent as FlexDeskIcon } from '../assets/icons/flexDesk.svg';
import { ReactComponent as EventHallIcon } from '../assets/icons/eventHall.svg';
import { ReactComponent as ConvienceRoomIcon } from '../assets/icons/convienceRoom.svg';
import { ReactComponent as FixedDeskIcon } from '../assets/icons/fixedDesk.svg';
import { ReactComponent as PrivateRoomIcon } from '../assets/icons/privateRoom.svg';
import { ReactComponent as PhoneBoothIcon } from '../assets/icons/phoneBooth.svg';
import { ReactComponent as MeetingRoomIcon } from '../assets/icons/meetingRoom.svg';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Dropdown, Offcanvas } from 'react-bootstrap';
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import { returnUrlParams } from '../helpers/helpers';

export default function SearchLocation(props) {
  const { t } = useTranslation();
  const { filterLocations, setFilterLocations, searchData, handleTypeSearch } =
    props;
  const [urlParams] = useSearchParams();
  let currentParams = returnUrlParams(urlParams.entries());
  const navigate = useNavigate();
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
  const [showSelect, setShowSelect] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const handleApplySearch = () => {
    let value = document.getElementById('search-value')?.value;
    handleTypeSearch(value);
    setShowSearch(false);
  };
  return (
    <div className='search-location'>
      <div className='search-location-container webview'>
        <div className='search-section'>
          <div className='title'>{t('search')}</div>
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
        <div className='select-section'>
          <div className='title'>{t('type')}</div>
          <Dropdown className='dropdown-section'>
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
        </div>
      </div>
      <div className='search-location-container mobileview'>
        <div className='search-section'>
          <div className='search-container' onClick={() => setShowSearch(true)}>
            <SearchIcon className='search-icon' />
            {searchData ? searchData : t('search')}
          </div>
        </div>
        <div className='select-section'>
          <div className='select-container' onClick={() => setShowSelect(true)}>
            <span>{selectedType.name}</span>
            <RightArrowIcon className='arrow-icon' />
          </div>
        </div>
      </div>
      <Offcanvas
        show={showSelect}
        placement='end'
        className='select-type-modal'
      >
        <Offcanvas.Header>
          <div className='select-type-modal_header'>
            <BackArrowIcon
              className='back-icon'
              onClick={() => setShowSelect(false)}
            />
            {t('type')}
          </div>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className='select-type-modal_body'>
            {roomType.map((item, index) => {
              return (
                <div
                  className={
                    selectedType.id === item.id
                      ? 'type-item selected'
                      : 'type-item'
                  }
                  onClick={() => {
                    handleSelectType(item);
                    setShowSelect(false);
                  }}
                >
                  {item.icon}
                  {item.name}
                </div>
              );
            })}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
      <Offcanvas show={showSearch} placement='end' className='search-modal'>
        <Offcanvas.Header>
          <div className='search-modal_header'>
            <BackArrowIcon
              className='back-icon'
              onClick={() => setShowSearch(false)}
            />
            {t('search')}
            <span className='btn-apply' onClick={handleApplySearch}>
              {t('apply')}
            </span>
          </div>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className='search-modal_body'>
            <div className='search-container'>
              <SearchIcon className='search-icon' />
              <input
                id='search-value'
                className='search-input'
                placeholder={t('search_for_locations')}
                defaultValue={searchData}
                spellCheck={false}
              />
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}
