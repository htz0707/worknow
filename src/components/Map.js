import React from 'react';
import GoogleMap from 'google-map-react';
import Marker from './Marker';
import { useState } from 'react';

export default function Map({ options, locations }) {
  const [activeLocation, setActiveLocation] = useState({});
  return (
    <div className='map-container'>
      <GoogleMap
        bootstrapURLKeys={{ key: options.APIKey }}
        center={options.center}
        zoom={options.zoom}
        options={{
          clickableIcons: false,
          fullscreenControl: false,
        }}
      >
        {locations?.map((item) => {
          return (
            <Marker
              key={item.id}
              lat={item.lat}
              lng={item.long}
              data={item}
              activeLocation={activeLocation}
              setActiveLocation={setActiveLocation}
            />
          );
        })}
      </GoogleMap>
    </div>
  );
}
