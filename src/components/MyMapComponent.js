import { useEffect, useRef, useState } from 'react';

function MyMapComponent() {
  const ref = useRef(null);
  const [map, setMap] = useState();
  const [center, setCenter] = useState({
    lat: 10.788159959003151,
    lng: 106.70259701063593,
  });

  /**
   * Because google.maps.Map requires an Element as a constructor parameter,
   * useRef is needed to maintain a mutable object
   * that will persist for the lifetime of the component.
   */
  useEffect(() => {
    if (ref.current && !map) {
      setMap(new window.google.maps.Map(ref.current, {}));
    }
  }, [ref, map]);

  // Add marker
  useEffect(() => {
    if (map) {
      map.setOptions({ center, zoom: 15 });
    }
    new window.google.maps.Marker({
      position: center,
      map,
    });
  }, [map, center]);

  return (
    <>
      <div ref={ref} style={{ width: '100%', height: '100%' }} />
    </>
  );
}

export default MyMapComponent;
