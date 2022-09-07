import React from 'react';
import { withGoogleMap, withScriptjs, GoogleMap } from 'react-google-maps';

const Map = () => {
  return (
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: 10.788159959003151, lng: 106.70259701063593 }}
      options={(map) => ({ mapTypeId: map.MapTypeId.SATELLITE })}
    ></GoogleMap>
  );
};

export default withScriptjs(withGoogleMap(Map));
